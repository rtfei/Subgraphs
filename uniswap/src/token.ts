import { log,BigInt,Bytes} from "@graphprotocol/graph-ts";

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
  let tokenHolder = fetchHolder(event.params.delegator.toHexString());
  let previousDelegate = fetchDelegate(event.params.fromDelegate.toHexString());
  let newDelegate = fetchDelegate(event.params.toDelegate.toHexString());
  let governance = getGovernanceEntity();

  if(event.params.fromDelegate == event.params.toDelegate){
    governance.uselessDelegations = governance.uselessDelegations.plus(BIGINT_ONE);
  }
  
  //Assuming that the holder only can delegate to one delegate an always delegates all votes.

  let delegation = getDelegation(event.transaction.hash.toHexString());
  delegation.from = event.params.delegator.toHexString()
  delegation.to = event.params.toDelegate.toHexString()
  delegation.oldDelegate = event.params.fromDelegate.toHexString();
  delegation.blockNumber = event.block.number;
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
  let delegate = fetchDelegate(event.params.delegate.toHexString());
  let votesDifference = event.params.newBalance.minus(event.params.previousBalance);

  delegate.delegatedVotesRaw = event.params.newBalance;
  delegate.delegatedVotes = toDecimal(event.params.newBalance, DEFAULT_DECIMALS);
  delegate.save();
  
  let delegation = getDelegation(event.transaction.hash.toHexString(),false);

  // check if DelegateVotesChanged happened after DelegateChanged event
  if (delegation.blockNumber != BIGINT_ONE){
    if (delegation.to == event.params.delegate.toHexString()){
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
  let fromHolder = fetchHolder(event.params.from.toHexString());
  let toHolder = fetchHolder(event.params.to.toHexString());
  let governance = getGovernanceEntity();
  let transfer = getTransfer(event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString());
  transfer.from = fromHolder.id;
  transfer.to = toHolder.id;
  transfer.amount = event.params.amount;
  transfer.blockNumber = event.block.number;
  transfer.timestamp = event.block.timestamp;
  const receipt = event.receipt;
  transfer.gasUsed = receipt ? receipt.gasUsed : BIGINT_ZERO;
  transfer.gasLimit = event.transaction.gasLimit;
  transfer.gasPrice = event.transaction.gasPrice;
  transfer.save();
  if(event.params.amount == BIGINT_ZERO ||  event.params.from == event.params.to){
    governance.uselessTransfers= governance.uselessTransfers.plus(BIGINT_ONE);
  }


  if (event.params.from != event.params.to) {
    // fromHolder
    if (event.params.from.toHexString() != ZERO_ADDRESS) {
      let fromHolderPreviousBalance = fromHolder.tokenBalanceRaw;
      fromHolder.tokenBalanceRaw =
        fromHolder.tokenBalanceRaw.minus(event.params.amount);
      fromHolder.tokenBalance = toDecimal(fromHolder.tokenBalanceRaw, DEFAULT_DECIMALS);

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
    toHolder.tokenBalanceRaw = toHolder.tokenBalanceRaw.plus(event.params.amount);
    toHolder.tokenBalance = toDecimal(toHolder.tokenBalanceRaw, DEFAULT_DECIMALS);
    toHolder.totalTokensHeldRaw =
      toHolder.totalTokensHeldRaw.plus(event.params.amount);
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
