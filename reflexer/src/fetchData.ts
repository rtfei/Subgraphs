import { Bytes } from "@graphprotocol/graph-ts";
import {
    TokenHolder,
    Delegate,
    Proposal,
    Governance,
    Transfer,
    Vote,
    Delegation
  } from "../generated/schema";

  import {
    ZERO_ADDRESS,
    BIGINT_ZERO,
    BIGINT_ONE,
    BIGDECIMAL_ZERO
  } from "./utils/constants";
  
  export function fetchHolder(
    id: Bytes,
    createIfNotFound: boolean = true,
    save: boolean = true
  ): TokenHolder {
    let tokenHolder = TokenHolder.load(id);
  
    if (tokenHolder == null && createIfNotFound) {
      tokenHolder = new TokenHolder(id);
      tokenHolder.tokenBalanceRaw = BIGINT_ZERO;
      tokenHolder.tokenBalance = BIGDECIMAL_ZERO;
      tokenHolder.totalTokensHeldRaw = BIGINT_ZERO;
      tokenHolder.totalTokensHeld = BIGDECIMAL_ZERO;
  
      if (id != ZERO_ADDRESS) {
        let governance = getGovernanceEntity();
        governance.totalTokenHolders = governance.totalTokenHolders.plus(BIGINT_ONE);
        governance.save();
      }
  
      if (save) {
        tokenHolder.save();
      }
    }
  
    return tokenHolder as TokenHolder;
  }
  
  export function fetchDelegate(
    id: Bytes,
    createIfNotFound: boolean = true,
    save: boolean = true
  ): Delegate {
    let delegate = Delegate.load(id);
  
    if (delegate == null && createIfNotFound) {
      delegate = new Delegate(id);
      delegate.delegatedVotesRaw = BIGINT_ZERO;
      delegate.delegatedVotes = BIGDECIMAL_ZERO;
      delegate.numberVotes = 0;
      delegate.tokenHoldersRepresentedAmount = 0;
  
      if (id != ZERO_ADDRESS) {
        let governance = getGovernanceEntity();
        governance.totalDelegates = governance.totalDelegates.plus(BIGINT_ONE);
        governance.save();
      }
  
      if (save) {
        delegate.save();
      }
    }
  
    return  changetype<Delegate>(delegate);
  }
  
  export function getGovernanceEntity(): Governance {
    let governance = Governance.load("GOVERNANCE");
  
    if (governance == null) {
      governance = new Governance("GOVERNANCE");
      governance.proposals = BIGINT_ZERO;
      governance.totalTokenHolders = BIGINT_ZERO;
      governance.currentTokenHolders = BIGINT_ZERO;
      governance.currentDelegates = BIGINT_ZERO;
      governance.totalDelegates = BIGINT_ZERO;
      governance.delegatedVotesRaw = BIGINT_ZERO;
      governance.delegatedVotes = BIGDECIMAL_ZERO;
      governance.proposalsQueued = BIGINT_ZERO;
      governance.transfers = BIGINT_ZERO;
      governance.delegations = BIGINT_ZERO;
    }
  
    return governance as Governance;
  }
  

  export function getTransfer(id: Bytes): Transfer {
    let transfer = new Transfer(id)
    return transfer as Transfer;
  }

  export function getDelegation(id: Bytes,createIfNotFound: boolean = true,): Delegation {
    let delegation = Delegation.load(id)
    if( delegation == null  && createIfNotFound ){
      delegation = new Delegation(id)
      delegation.amount = BIGINT_ZERO;
    }

    if( delegation == null && !createIfNotFound ){
      delegation = new Delegation(id)
      delegation.blockNumber = BIGINT_ONE;
    }
    return delegation as Delegation;
  }


  export function getVote(
    id: String,
    createIfNotFound: boolean = true,
    save: boolean = false
  ): Vote {
    let vote = Vote.load(id);
    if (vote == null && createIfNotFound) {
      vote = new Vote(id);
  
      if (save) {
        vote.save();
      }
    }
  
    return vote as Vote;
  }

  export function fetchProposal(
    id: String,
    createIfNotFound: boolean = true,
    save: boolean = false
  ): Proposal {
    let proposal = Proposal.load(id);
    if (proposal == null && createIfNotFound) {
      proposal = new Proposal(id);
      let governance = getGovernanceEntity();
      governance.proposals = governance.proposals + BIGINT_ONE;
      governance.save();
      if (save) {
        proposal.save();
      }
    }
    return proposal as Proposal;
  }

