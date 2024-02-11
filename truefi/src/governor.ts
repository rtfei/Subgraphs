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
} from "./fetchData"
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
  let proposer = fetchDelegate(event.params.proposer.toHexString(),false);

  proposer = fetchDelegate(event.params.proposer.toHexString());

  proposal.proposer = proposer.id;
  proposal.targets = changetype<Bytes[]>(event.params.targets);
  proposal.values = event.params.values;
  proposal.transactionHash = event.transaction.hash;
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
  let governance = getGovernanceEntity();
  let voteId = event.params.voter
    .toHexString()
    .concat("-")
    .concat(event.params.proposalId.toString());
  let vote = getVote(voteId);
  let voter = fetchDelegate(event.params.voter.toHexString(), false);
  const receipt = event.receipt;
  vote.gasUsed = receipt ? receipt.gasUsed : BIGINT_ZERO;
  vote.gasLimit = event.transaction.gasLimit;
  vote.gasPrice = event.transaction.gasPrice;
  governance.votes = governance.votes.plus((BIGINT_ONE));
  voter = fetchDelegate(event.params.voter.toHexString());

  vote.proposal = proposal.id;
  vote.voter = voter.id;
  vote.votesRaw = event.params.votes;
  vote.votes = toDecimal(event.params.votes);
  vote.support = event.params.support;
  vote.blockNumber = event.block.number;
  vote.timestamp = event.block.timestamp;
  vote.transactionHash = event.transaction.hash;
  vote.save();

  if (proposal.status == STATUS_PENDING) {
    proposal.status = STATUS_ACTIVE;
    proposal.save();
  }
  if(event.params.votes == BIGINT_ZERO){
    governance.uselessVotes = governance.uselessVotes.plus(BIGINT_ONE);
  }
  governance.save();
}
