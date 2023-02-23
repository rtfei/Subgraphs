import {Bytes, log} from "@graphprotocol/graph-ts";
import {
  ProposalCreated,
  ProposalCanceled,
  ProposalQueued,
  ProposalExecuted,
  VoteCast
} from "../generated/Governor/Governor";

import{
  fetchDelegate,
  getGovernanceEntity,
  fetchProposal,
  getVote
} 
from "./fetchData"
import {
  BIGINT_ONE,
  BIGINT_ZERO,
  STATUS_ACTIVE,
  STATUS_QUEUED,
  STATUS_PENDING,
  STATUS_EXECUTED,
  STATUS_CANCELLED
} from "./utils/constants";
import { toDecimal } from "./utils/decimals";

// - event: ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)
//   handler: handleProposalCreated

export function handleProposalCreated(event: ProposalCreated): void {
  let proposal = fetchProposal(event.params.id.toString());
  let proposer = fetchDelegate(event.params.proposer,false);

  // checking if the proposer was a delegate already accounted for, if not we should log an error
  // since it shouldn't be possible for a delegate to propose anything without first being "created"
  if (proposer == null) {
    log.error("Delegate {} not found on ProposalCreated. tx_hash: {}", [
      event.params.proposer.toHexString(),
      event.transaction.hash.toHexString()
    ]);
  }

  // Creating it anyway since we will want to account for this event data, even though it should've never happened
  proposer = fetchDelegate(event.params.proposer);

  proposal.proposer = proposer.id;
  proposal.targets = changetype<Bytes[]>(event.params.targets);
  proposal.values = event.params.values;
  proposal.signatures = event.params.signatures;
  proposal.calldatas = event.params.calldatas;
  proposal.creationBlock = event.block.number;
  proposal.creationTime = event.block.timestamp;
  proposal.startBlock = event.params.startBlock;
  proposal.endBlock = event.params.endBlock;
  proposal.description = event.params.description;
  proposal.status =
    event.block.number >= proposal.startBlock ? STATUS_ACTIVE : STATUS_PENDING;
  const receipt = event.receipt;
  proposal.gasUsed = receipt ? receipt.gasUsed : BIGINT_ZERO;
  proposal.gasLimit = event.transaction.gasLimit;
  proposal.gasPrice = event.transaction.gasPrice;
  proposal.save();
}

// - event: ProposalCanceled(uint256)
//   handler: handleProposalCanceled

export function handleProposalCanceled(event: ProposalCanceled): void {
  let proposal =  fetchProposal(event.params.id.toString());
  proposal.status = STATUS_CANCELLED;
  proposal.cancellationBlock = event.block.number;
  proposal.cancellationTime = event.block.timestamp;

  proposal.save();
}

// - event: ProposalQueued(uint256,uint256)
//   handler: handleProposalQueued

export function handleProposalQueued(event: ProposalQueued): void {
  let governance = getGovernanceEntity();
  let proposal =  fetchProposal(event.params.id.toString());

  proposal.status = STATUS_QUEUED;
  proposal.executionETA = event.params.eta;
  proposal.save();

  governance.proposalsQueued = governance.proposalsQueued.plus(BIGINT_ONE);
  governance.save();
}

// - event: ProposalExecuted(uint256)
//   handler: handleProposalExecuted

export function handleProposalExecuted(event: ProposalExecuted): void {
  let governance = getGovernanceEntity();
  let proposal =  fetchProposal(event.params.id.toString());

  proposal.status = STATUS_EXECUTED;
  proposal.executionETA = null;
  proposal.executionBlock = event.block.number;
  proposal.executionTime = event.block.timestamp;
  
  proposal.save();

  governance.proposalsQueued = governance.proposalsQueued.minus(BIGINT_ONE);
  governance.save();
}




// - event: VoteCastBravo(address,uint256,uint8,uint256)
//   handler: handleVoteCastBravo

export function handleVoteCast(event: VoteCast): void {
  let proposal =  fetchProposal(event.params.proposalId.toString());
  let voteId = event.params.voter
    .toHexString()
    .concat("-")
    .concat(event.params.proposalId.toString());
  let vote = getVote(voteId);
  let voter = fetchDelegate(event.params.voter, false);
  const receipt = event.receipt;
  vote.gasUsed = receipt ? receipt.gasUsed : BIGINT_ZERO;
  vote.gasLimit = event.transaction.gasLimit;
  vote.gasPrice = event.transaction.gasPrice;

  // check if voter is a a delegate
  if (voter == null) {
    log.error("Delegate {} not found. Vote: tx_hash: {}", [
      event.params.voter.toHexString(),
      event.transaction.hash.toHexString()
    ]);
  }

  voter = fetchDelegate(event.params.voter);

  vote.proposal = proposal.id;
  vote.voter = voter.id;
  vote.votesRaw = event.params.votes;
  vote.votes = toDecimal(event.params.votes);
  vote.support = event.params.support === 1;
  vote.blockNumber = event.block.number;
  vote.transactionHash = event.transaction.hash;
  vote.timestamp = event.block.timestamp;
  vote.save();

  if (proposal.status == STATUS_PENDING) {
    proposal.status = STATUS_ACTIVE;
    proposal.save();
  }
}
