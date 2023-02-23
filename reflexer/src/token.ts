import { log,BigInt,Bytes } from "@graphprotocol/graph-ts";

import {
  DelegateChanged,
  DelegateVotesChanged,
  Transfer
} from "../generated/Token/Token";
import {
  ZERO_ADDRESS,
  BIGINT_ONE,
  BIGINT_ZERO
} from "./utils/constants";

import {
  fetchHolder,
  fetchDelegate,
  getGovernanceEntity,
  getTransfer,
  getDelegation
} from "./fetchData"
import { DEFAULT_DECIMALS,toDecimal} from "./utils/decimals";


// - event: DelegateChanged(indexed address,indexed address,indexed address)
//   handler: handleDelegateChanged

export function handleDelegateChanged(event: DelegateChanged): void {
  let tokenHolder = fetchHolder(event.params.delegator);
  let previousDelegate = fetchDelegate(event.params.fromDelegate);
  let newDelegate = fetchDelegate(event.params.toDelegate);
  let governance = getGovernanceEntity();

  //Assuming that the holder only can delegate to one delegate an always delegates all votes.

  let delegation = getDelegation(event.transaction.hash);
  delegation.from = event.params.delegator
  delegation.to = event.params.toDelegate
  delegation.blockNumber = event.block.number;
  delegation.oldDelegate = event.params.fromDelegate;
  delegation.timestamp = event.block.timestamp;
  const receipt = event.receipt;
  delegation.gasUsed = receipt ? receipt.gasUsed : BIGINT_ZERO;
  delegation.gasLimit = event.transaction.gasLimit;
  delegation.gasPrice = event.transaction.gasPrice;
  
   //save topic of all events of current transaction
  if(receipt){
    if(receipt.logs){
      let result: Bytes[] = [];
      for (let i=0; i < receipt.logs.length; i+=1) {
          if(receipt.logs[i]){
            if(receipt.logs[i].topics.length >  0){
              result.push(receipt.logs[i].topics[0]);
            }
          }
      }
      delegation.log = result;
    }
  }
  delegation.save();
  governance.delegations = governance.delegations.plus(BIGINT_ONE);
  governance.save();

  tokenHolder.delegate = newDelegate.id;
  tokenHolder.save();

  previousDelegate.tokenHoldersRepresentedAmount =
    previousDelegate.tokenHoldersRepresentedAmount - 1;
  newDelegate.tokenHoldersRepresentedAmount =
    newDelegate.tokenHoldersRepresentedAmount + 1;
  previousDelegate.save();
  newDelegate.save();
}

// - event: DelegateVotesChanged(indexed address,uint256,uint256)
//   handler: handleDelegateVotesChanged

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let governance = getGovernanceEntity();
  let delegate = fetchDelegate(event.params.delegate);
  let votesDifference = event.params.newBalance.minus(event.params.previousBalance);

  delegate.delegatedVotesRaw = event.params.newBalance;
  delegate.delegatedVotes = toDecimal(event.params.newBalance, DEFAULT_DECIMALS);
  delegate.save();


  let delegation = getDelegation(event.transaction.hash,false);

  // check if DelegateVotesChanged happened after DelegateChanged event
  if (delegation.blockNumber != BIGINT_ONE){
    if (delegation.to == event.params.delegate ){
      delegation.amount = votesDifference
    }
    delegation.save();
  }
  

  if (
    event.params.previousBalance == BIGINT_ZERO &&
    event.params.newBalance > BIGINT_ZERO
  ) {
    governance.currentDelegates = governance.currentDelegates.plus(BIGINT_ONE);
  }
  if (event.params.newBalance == BIGINT_ZERO) {
    governance.currentDelegates = governance.currentDelegates.minus(BIGINT_ONE);
  }
  governance.delegatedVotesRaw = governance.delegatedVotesRaw.plus(votesDifference);
  governance.delegatedVotes = toDecimal(governance.delegatedVotesRaw, DEFAULT_DECIMALS);
  governance.save();
}

// - event: Transfer(indexed address,indexed address,uint256)
//   handler: handleTransfer

export function handleTransfer(event: Transfer): void {
  let fromHolder = fetchHolder(event.params.from);
  let toHolder = fetchHolder(event.params.to);
  let governance = getGovernanceEntity();
  let transfer = getTransfer(event.transaction.hash.concatI32(event.logIndex.toI32()));
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.amount = event.params.value;
  transfer.blockNumber = event.block.number;
  transfer.timestamp = event.block.timestamp;
  const receipt = event.receipt;
  transfer.gasUsed = receipt ? receipt.gasUsed : BIGINT_ZERO;
  transfer.gasLimit = event.transaction.gasLimit;
  transfer.gasPrice = event.transaction.gasPrice;
  transfer.save();



  if (event.params.from != event.params.to) {
    // fromHolder
    if (event.params.from != ZERO_ADDRESS) {
      let fromHolderPreviousBalance = fromHolder.tokenBalanceRaw;
      fromHolder.tokenBalanceRaw =
        fromHolder.tokenBalanceRaw.minus(event.params.value);
      fromHolder.tokenBalance = toDecimal(fromHolder.tokenBalanceRaw, DEFAULT_DECIMALS);

      if (fromHolder.tokenBalanceRaw < BIGINT_ZERO) {
        log.error("Negative balance on holder {} with balance {}", [
          fromHolder.id.toString(),
          fromHolder.tokenBalanceRaw.toString()
        ]);
      }

      if (
        fromHolder.tokenBalanceRaw == BIGINT_ZERO &&
        fromHolderPreviousBalance > BIGINT_ZERO
      ) {
        governance.currentTokenHolders =
          governance.currentTokenHolders.minus(BIGINT_ONE);
        governance.save();
      } else if (
        fromHolder.tokenBalanceRaw > BIGINT_ZERO &&
        fromHolderPreviousBalance == BIGINT_ZERO
      ) {
        governance.currentTokenHolders =
          governance.currentTokenHolders.plus(BIGINT_ONE);
        governance.save();
      }

      fromHolder.save();
    }

    // toHolder
    let toHolderPreviousBalance = toHolder.tokenBalanceRaw;
    toHolder.tokenBalanceRaw = toHolder.tokenBalanceRaw.plus(event.params.value);
    toHolder.tokenBalance = toDecimal(toHolder.tokenBalanceRaw, DEFAULT_DECIMALS);
    toHolder.totalTokensHeldRaw =
      toHolder.totalTokensHeldRaw.plus(event.params.value);
    toHolder.totalTokensHeld = toDecimal(toHolder.totalTokensHeldRaw, DEFAULT_DECIMALS);

    if (
      toHolder.tokenBalanceRaw == BIGINT_ZERO &&
      toHolderPreviousBalance > BIGINT_ZERO
    ) {
      governance.currentTokenHolders =
        governance.currentTokenHolders.minus(BIGINT_ONE);
      governance.save();
    } else if (
      toHolder.tokenBalanceRaw > BIGINT_ZERO &&
      toHolderPreviousBalance == BIGINT_ZERO
    ) {
      governance.currentTokenHolders =
        governance.currentTokenHolders.plus(BIGINT_ONE);
      governance.save();
    }
    toHolder.save();
  }
  governance.transfers = governance.transfers.plus(BIGINT_ONE);
  governance.save();
}
