// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ProposalCanceled extends ethereum.Event {
  get params(): ProposalCanceled__Params {
    return new ProposalCanceled__Params(this);
  }
}

export class ProposalCanceled__Params {
  _event: ProposalCanceled;

  constructor(event: ProposalCanceled) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class ProposalCreated extends ethereum.Event {
  get params(): ProposalCreated__Params {
    return new ProposalCreated__Params(this);
  }
}

export class ProposalCreated__Params {
  _event: ProposalCreated;

  constructor(event: ProposalCreated) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get proposer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get targets(): Array<Address> {
    return this._event.parameters[2].value.toAddressArray();
  }

  get values(): Array<BigInt> {
    return this._event.parameters[3].value.toBigIntArray();
  }

  get signatures(): Array<string> {
    return this._event.parameters[4].value.toStringArray();
  }

  get calldatas(): Array<Bytes> {
    return this._event.parameters[5].value.toBytesArray();
  }

  get startBlock(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get endBlock(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }

  get description(): string {
    return this._event.parameters[8].value.toString();
  }
}

export class ProposalExecuted extends ethereum.Event {
  get params(): ProposalExecuted__Params {
    return new ProposalExecuted__Params(this);
  }
}

export class ProposalExecuted__Params {
  _event: ProposalExecuted;

  constructor(event: ProposalExecuted) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class ProposalQueued extends ethereum.Event {
  get params(): ProposalQueued__Params {
    return new ProposalQueued__Params(this);
  }
}

export class ProposalQueued__Params {
  _event: ProposalQueued;

  constructor(event: ProposalQueued) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get eta(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class TimelockChange extends ethereum.Event {
  get params(): TimelockChange__Params {
    return new TimelockChange__Params(this);
  }
}

export class TimelockChange__Params {
  _event: TimelockChange;

  constructor(event: TimelockChange) {
    this._event = event;
  }

  get oldTimelock(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newTimelock(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class VoteCast extends ethereum.Event {
  get params(): VoteCast__Params {
    return new VoteCast__Params(this);
  }
}

export class VoteCast__Params {
  _event: VoteCast;

  constructor(event: VoteCast) {
    this._event = event;
  }

  get voter(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get proposalId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get support(): i32 {
    return this._event.parameters[2].value.toI32();
  }

  get weight(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get reason(): string {
    return this._event.parameters[4].value.toString();
  }
}

export class Governor__getActionsResult {
  value0: Array<Address>;
  value1: Array<BigInt>;
  value2: Array<string>;
  value3: Array<Bytes>;

  constructor(
    value0: Array<Address>,
    value1: Array<BigInt>,
    value2: Array<string>,
    value3: Array<Bytes>
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddressArray(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigIntArray(this.value1));
    map.set("value2", ethereum.Value.fromStringArray(this.value2));
    map.set("value3", ethereum.Value.fromBytesArray(this.value3));
    return map;
  }

  getTargets(): Array<Address> {
    return this.value0;
  }

  getValues(): Array<BigInt> {
    return this.value1;
  }

  getSignatures(): Array<string> {
    return this.value2;
  }

  getCalldatas(): Array<Bytes> {
    return this.value3;
  }
}

export class Governor__getReceiptResultValue0Struct extends ethereum.Tuple {
  get hasVoted(): boolean {
    return this[0].toBoolean();
  }

  get support(): i32 {
    return this[1].toI32();
  }

  get votes(): BigInt {
    return this[2].toBigInt();
  }
}

export class Governor__proposalsResult {
  value0: BigInt;
  value1: Address;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;
  value6: BigInt;
  value7: BigInt;
  value8: boolean;
  value9: boolean;

  constructor(
    value0: BigInt,
    value1: Address,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt,
    value6: BigInt,
    value7: BigInt,
    value8: boolean,
    value9: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    map.set("value8", ethereum.Value.fromBoolean(this.value8));
    map.set("value9", ethereum.Value.fromBoolean(this.value9));
    return map;
  }

  getId(): BigInt {
    return this.value0;
  }

  getProposer(): Address {
    return this.value1;
  }

  getEta(): BigInt {
    return this.value2;
  }

  getStartBlock(): BigInt {
    return this.value3;
  }

  getEndBlock(): BigInt {
    return this.value4;
  }

  getForVotes(): BigInt {
    return this.value5;
  }

  getAgainstVotes(): BigInt {
    return this.value6;
  }

  getAbstainVotes(): BigInt {
    return this.value7;
  }

  getCanceled(): boolean {
    return this.value8;
  }

  getExecuted(): boolean {
    return this.value9;
  }
}

export class Governor extends ethereum.SmartContract {
  static bind(address: Address): Governor {
    return new Governor("Governor", address);
  }

  BALLOT_TYPEHASH(): Bytes {
    let result = super.call(
      "BALLOT_TYPEHASH",
      "BALLOT_TYPEHASH():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_BALLOT_TYPEHASH(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "BALLOT_TYPEHASH",
      "BALLOT_TYPEHASH():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  COUNTING_MODE(): string {
    let result = super.call("COUNTING_MODE", "COUNTING_MODE():(string)", []);

    return result[0].toString();
  }

  try_COUNTING_MODE(): ethereum.CallResult<string> {
    let result = super.tryCall("COUNTING_MODE", "COUNTING_MODE():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  castVote(proposalId: BigInt, support: i32): BigInt {
    let result = super.call("castVote", "castVote(uint256,uint8):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(proposalId),
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(support))
    ]);

    return result[0].toBigInt();
  }

  try_castVote(proposalId: BigInt, support: i32): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "castVote",
      "castVote(uint256,uint8):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(support))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  castVoteBySig(
    proposalId: BigInt,
    support: i32,
    v: i32,
    r: Bytes,
    s: Bytes
  ): BigInt {
    let result = super.call(
      "castVoteBySig",
      "castVoteBySig(uint256,uint8,uint8,bytes32,bytes32):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(support)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(v)),
        ethereum.Value.fromFixedBytes(r),
        ethereum.Value.fromFixedBytes(s)
      ]
    );

    return result[0].toBigInt();
  }

  try_castVoteBySig(
    proposalId: BigInt,
    support: i32,
    v: i32,
    r: Bytes,
    s: Bytes
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "castVoteBySig",
      "castVoteBySig(uint256,uint8,uint8,bytes32,bytes32):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(support)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(v)),
        ethereum.Value.fromFixedBytes(r),
        ethereum.Value.fromFixedBytes(s)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  castVoteWithReason(proposalId: BigInt, support: i32, reason: string): BigInt {
    let result = super.call(
      "castVoteWithReason",
      "castVoteWithReason(uint256,uint8,string):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(support)),
        ethereum.Value.fromString(reason)
      ]
    );

    return result[0].toBigInt();
  }

  try_castVoteWithReason(
    proposalId: BigInt,
    support: i32,
    reason: string
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "castVoteWithReason",
      "castVoteWithReason(uint256,uint8,string):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(support)),
        ethereum.Value.fromString(reason)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getActions(proposalId: BigInt): Governor__getActionsResult {
    let result = super.call(
      "getActions",
      "getActions(uint256):(address[],uint256[],string[],bytes[])",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );

    return new Governor__getActionsResult(
      result[0].toAddressArray(),
      result[1].toBigIntArray(),
      result[2].toStringArray(),
      result[3].toBytesArray()
    );
  }

  try_getActions(
    proposalId: BigInt
  ): ethereum.CallResult<Governor__getActionsResult> {
    let result = super.tryCall(
      "getActions",
      "getActions(uint256):(address[],uint256[],string[],bytes[])",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Governor__getActionsResult(
        value[0].toAddressArray(),
        value[1].toBigIntArray(),
        value[2].toStringArray(),
        value[3].toBytesArray()
      )
    );
  }

  getReceipt(
    proposalId: BigInt,
    voter: Address
  ): Governor__getReceiptResultValue0Struct {
    let result = super.call(
      "getReceipt",
      "getReceipt(uint256,address):((bool,uint8,uint96))",
      [
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddress(voter)
      ]
    );

    return changetype<Governor__getReceiptResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getReceipt(
    proposalId: BigInt,
    voter: Address
  ): ethereum.CallResult<Governor__getReceiptResultValue0Struct> {
    let result = super.tryCall(
      "getReceipt",
      "getReceipt(uint256,address):((bool,uint8,uint96))",
      [
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddress(voter)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Governor__getReceiptResultValue0Struct>(value[0].toTuple())
    );
  }

  getVotes(account: Address, blockNumber: BigInt): BigInt {
    let result = super.call("getVotes", "getVotes(address,uint256):(uint256)", [
      ethereum.Value.fromAddress(account),
      ethereum.Value.fromUnsignedBigInt(blockNumber)
    ]);

    return result[0].toBigInt();
  }

  try_getVotes(
    account: Address,
    blockNumber: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getVotes",
      "getVotes(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(account),
        ethereum.Value.fromUnsignedBigInt(blockNumber)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hasVoted(proposalId: BigInt, account: Address): boolean {
    let result = super.call("hasVoted", "hasVoted(uint256,address):(bool)", [
      ethereum.Value.fromUnsignedBigInt(proposalId),
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBoolean();
  }

  try_hasVoted(
    proposalId: BigInt,
    account: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall("hasVoted", "hasVoted(uint256,address):(bool)", [
      ethereum.Value.fromUnsignedBigInt(proposalId),
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  hashProposal(
    targets: Array<Address>,
    values: Array<BigInt>,
    calldatas: Array<Bytes>,
    descriptionHash: Bytes
  ): BigInt {
    let result = super.call(
      "hashProposal",
      "hashProposal(address[],uint256[],bytes[],bytes32):(uint256)",
      [
        ethereum.Value.fromAddressArray(targets),
        ethereum.Value.fromUnsignedBigIntArray(values),
        ethereum.Value.fromBytesArray(calldatas),
        ethereum.Value.fromFixedBytes(descriptionHash)
      ]
    );

    return result[0].toBigInt();
  }

  try_hashProposal(
    targets: Array<Address>,
    values: Array<BigInt>,
    calldatas: Array<Bytes>,
    descriptionHash: Bytes
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "hashProposal",
      "hashProposal(address[],uint256[],bytes[],bytes32):(uint256)",
      [
        ethereum.Value.fromAddressArray(targets),
        ethereum.Value.fromUnsignedBigIntArray(values),
        ethereum.Value.fromBytesArray(calldatas),
        ethereum.Value.fromFixedBytes(descriptionHash)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  proposalDeadline(proposalId: BigInt): BigInt {
    let result = super.call(
      "proposalDeadline",
      "proposalDeadline(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );

    return result[0].toBigInt();
  }

  try_proposalDeadline(proposalId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "proposalDeadline",
      "proposalDeadline(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  proposalEta(proposalId: BigInt): BigInt {
    let result = super.call("proposalEta", "proposalEta(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(proposalId)
    ]);

    return result[0].toBigInt();
  }

  try_proposalEta(proposalId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "proposalEta",
      "proposalEta(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  proposalSnapshot(proposalId: BigInt): BigInt {
    let result = super.call(
      "proposalSnapshot",
      "proposalSnapshot(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );

    return result[0].toBigInt();
  }

  try_proposalSnapshot(proposalId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "proposalSnapshot",
      "proposalSnapshot(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  proposalThreshold(): BigInt {
    let result = super.call(
      "proposalThreshold",
      "proposalThreshold():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_proposalThreshold(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "proposalThreshold",
      "proposalThreshold():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  proposals(proposalId: BigInt): Governor__proposalsResult {
    let result = super.call(
      "proposals",
      "proposals(uint256):(uint256,address,uint256,uint256,uint256,uint256,uint256,uint256,bool,bool)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );

    return new Governor__proposalsResult(
      result[0].toBigInt(),
      result[1].toAddress(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBigInt(),
      result[7].toBigInt(),
      result[8].toBoolean(),
      result[9].toBoolean()
    );
  }

  try_proposals(
    proposalId: BigInt
  ): ethereum.CallResult<Governor__proposalsResult> {
    let result = super.tryCall(
      "proposals",
      "proposals(uint256):(uint256,address,uint256,uint256,uint256,uint256,uint256,uint256,bool,bool)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Governor__proposalsResult(
        value[0].toBigInt(),
        value[1].toAddress(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt(),
        value[6].toBigInt(),
        value[7].toBigInt(),
        value[8].toBoolean(),
        value[9].toBoolean()
      )
    );
  }

  propose(
    targets: Array<Address>,
    values: Array<BigInt>,
    calldatas: Array<Bytes>,
    description: string
  ): BigInt {
    let result = super.call(
      "propose",
      "propose(address[],uint256[],bytes[],string):(uint256)",
      [
        ethereum.Value.fromAddressArray(targets),
        ethereum.Value.fromUnsignedBigIntArray(values),
        ethereum.Value.fromBytesArray(calldatas),
        ethereum.Value.fromString(description)
      ]
    );

    return result[0].toBigInt();
  }

  try_propose(
    targets: Array<Address>,
    values: Array<BigInt>,
    calldatas: Array<Bytes>,
    description: string
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "propose",
      "propose(address[],uint256[],bytes[],string):(uint256)",
      [
        ethereum.Value.fromAddressArray(targets),
        ethereum.Value.fromUnsignedBigIntArray(values),
        ethereum.Value.fromBytesArray(calldatas),
        ethereum.Value.fromString(description)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  propose1(
    targets: Array<Address>,
    values: Array<BigInt>,
    signatures: Array<string>,
    calldatas: Array<Bytes>,
    description: string
  ): BigInt {
    let result = super.call(
      "propose",
      "propose(address[],uint256[],string[],bytes[],string):(uint256)",
      [
        ethereum.Value.fromAddressArray(targets),
        ethereum.Value.fromUnsignedBigIntArray(values),
        ethereum.Value.fromStringArray(signatures),
        ethereum.Value.fromBytesArray(calldatas),
        ethereum.Value.fromString(description)
      ]
    );

    return result[0].toBigInt();
  }

  try_propose1(
    targets: Array<Address>,
    values: Array<BigInt>,
    signatures: Array<string>,
    calldatas: Array<Bytes>,
    description: string
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "propose",
      "propose(address[],uint256[],string[],bytes[],string):(uint256)",
      [
        ethereum.Value.fromAddressArray(targets),
        ethereum.Value.fromUnsignedBigIntArray(values),
        ethereum.Value.fromStringArray(signatures),
        ethereum.Value.fromBytesArray(calldatas),
        ethereum.Value.fromString(description)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  queue(
    targets: Array<Address>,
    values: Array<BigInt>,
    calldatas: Array<Bytes>,
    descriptionHash: Bytes
  ): BigInt {
    let result = super.call(
      "queue",
      "queue(address[],uint256[],bytes[],bytes32):(uint256)",
      [
        ethereum.Value.fromAddressArray(targets),
        ethereum.Value.fromUnsignedBigIntArray(values),
        ethereum.Value.fromBytesArray(calldatas),
        ethereum.Value.fromFixedBytes(descriptionHash)
      ]
    );

    return result[0].toBigInt();
  }

  try_queue(
    targets: Array<Address>,
    values: Array<BigInt>,
    calldatas: Array<Bytes>,
    descriptionHash: Bytes
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "queue",
      "queue(address[],uint256[],bytes[],bytes32):(uint256)",
      [
        ethereum.Value.fromAddressArray(targets),
        ethereum.Value.fromUnsignedBigIntArray(values),
        ethereum.Value.fromBytesArray(calldatas),
        ethereum.Value.fromFixedBytes(descriptionHash)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  quorum(blockNumber: BigInt): BigInt {
    let result = super.call("quorum", "quorum(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(blockNumber)
    ]);

    return result[0].toBigInt();
  }

  try_quorum(blockNumber: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("quorum", "quorum(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(blockNumber)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  quorumVotes(): BigInt {
    let result = super.call("quorumVotes", "quorumVotes():(uint256)", []);

    return result[0].toBigInt();
  }

  try_quorumVotes(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("quorumVotes", "quorumVotes():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  state(proposalId: BigInt): i32 {
    let result = super.call("state", "state(uint256):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(proposalId)
    ]);

    return result[0].toI32();
  }

  try_state(proposalId: BigInt): ethereum.CallResult<i32> {
    let result = super.tryCall("state", "state(uint256):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(proposalId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  timelock(): Address {
    let result = super.call("timelock", "timelock():(address)", []);

    return result[0].toAddress();
  }

  try_timelock(): ethereum.CallResult<Address> {
    let result = super.tryCall("timelock", "timelock():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  token(): Address {
    let result = super.call("token", "token():(address)", []);

    return result[0].toAddress();
  }

  try_token(): ethereum.CallResult<Address> {
    let result = super.tryCall("token", "token():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  version(): string {
    let result = super.call("version", "version():(string)", []);

    return result[0].toString();
  }

  try_version(): ethereum.CallResult<string> {
    let result = super.tryCall("version", "version():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  votingDelay(): BigInt {
    let result = super.call("votingDelay", "votingDelay():(uint256)", []);

    return result[0].toBigInt();
  }

  try_votingDelay(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("votingDelay", "votingDelay():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  votingPeriod(): BigInt {
    let result = super.call("votingPeriod", "votingPeriod():(uint256)", []);

    return result[0].toBigInt();
  }

  try_votingPeriod(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("votingPeriod", "votingPeriod():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _timelock(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CancelCall extends ethereum.Call {
  get inputs(): CancelCall__Inputs {
    return new CancelCall__Inputs(this);
  }

  get outputs(): CancelCall__Outputs {
    return new CancelCall__Outputs(this);
  }
}

export class CancelCall__Inputs {
  _call: CancelCall;

  constructor(call: CancelCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CancelCall__Outputs {
  _call: CancelCall;

  constructor(call: CancelCall) {
    this._call = call;
  }
}

export class CastVoteCall extends ethereum.Call {
  get inputs(): CastVoteCall__Inputs {
    return new CastVoteCall__Inputs(this);
  }

  get outputs(): CastVoteCall__Outputs {
    return new CastVoteCall__Outputs(this);
  }
}

export class CastVoteCall__Inputs {
  _call: CastVoteCall;

  constructor(call: CastVoteCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get support(): i32 {
    return this._call.inputValues[1].value.toI32();
  }
}

export class CastVoteCall__Outputs {
  _call: CastVoteCall;

  constructor(call: CastVoteCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class CastVoteBySigCall extends ethereum.Call {
  get inputs(): CastVoteBySigCall__Inputs {
    return new CastVoteBySigCall__Inputs(this);
  }

  get outputs(): CastVoteBySigCall__Outputs {
    return new CastVoteBySigCall__Outputs(this);
  }
}

export class CastVoteBySigCall__Inputs {
  _call: CastVoteBySigCall;

  constructor(call: CastVoteBySigCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get support(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get v(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get r(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get s(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class CastVoteBySigCall__Outputs {
  _call: CastVoteBySigCall;

  constructor(call: CastVoteBySigCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class CastVoteWithReasonCall extends ethereum.Call {
  get inputs(): CastVoteWithReasonCall__Inputs {
    return new CastVoteWithReasonCall__Inputs(this);
  }

  get outputs(): CastVoteWithReasonCall__Outputs {
    return new CastVoteWithReasonCall__Outputs(this);
  }
}

export class CastVoteWithReasonCall__Inputs {
  _call: CastVoteWithReasonCall;

  constructor(call: CastVoteWithReasonCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get support(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get reason(): string {
    return this._call.inputValues[2].value.toString();
  }
}

export class CastVoteWithReasonCall__Outputs {
  _call: CastVoteWithReasonCall;

  constructor(call: CastVoteWithReasonCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class ExecuteCall extends ethereum.Call {
  get inputs(): ExecuteCall__Inputs {
    return new ExecuteCall__Inputs(this);
  }

  get outputs(): ExecuteCall__Outputs {
    return new ExecuteCall__Outputs(this);
  }
}

export class ExecuteCall__Inputs {
  _call: ExecuteCall;

  constructor(call: ExecuteCall) {
    this._call = call;
  }

  get targets(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get values(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get calldatas(): Array<Bytes> {
    return this._call.inputValues[2].value.toBytesArray();
  }

  get descriptionHash(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class ExecuteCall__Outputs {
  _call: ExecuteCall;

  constructor(call: ExecuteCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class Execute1Call extends ethereum.Call {
  get inputs(): Execute1Call__Inputs {
    return new Execute1Call__Inputs(this);
  }

  get outputs(): Execute1Call__Outputs {
    return new Execute1Call__Outputs(this);
  }
}

export class Execute1Call__Inputs {
  _call: Execute1Call;

  constructor(call: Execute1Call) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class Execute1Call__Outputs {
  _call: Execute1Call;

  constructor(call: Execute1Call) {
    this._call = call;
  }
}

export class ProposeCall extends ethereum.Call {
  get inputs(): ProposeCall__Inputs {
    return new ProposeCall__Inputs(this);
  }

  get outputs(): ProposeCall__Outputs {
    return new ProposeCall__Outputs(this);
  }
}

export class ProposeCall__Inputs {
  _call: ProposeCall;

  constructor(call: ProposeCall) {
    this._call = call;
  }

  get targets(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get values(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get calldatas(): Array<Bytes> {
    return this._call.inputValues[2].value.toBytesArray();
  }

  get description(): string {
    return this._call.inputValues[3].value.toString();
  }
}

export class ProposeCall__Outputs {
  _call: ProposeCall;

  constructor(call: ProposeCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class Propose1Call extends ethereum.Call {
  get inputs(): Propose1Call__Inputs {
    return new Propose1Call__Inputs(this);
  }

  get outputs(): Propose1Call__Outputs {
    return new Propose1Call__Outputs(this);
  }
}

export class Propose1Call__Inputs {
  _call: Propose1Call;

  constructor(call: Propose1Call) {
    this._call = call;
  }

  get targets(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get values(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get signatures(): Array<string> {
    return this._call.inputValues[2].value.toStringArray();
  }

  get calldatas(): Array<Bytes> {
    return this._call.inputValues[3].value.toBytesArray();
  }

  get description(): string {
    return this._call.inputValues[4].value.toString();
  }
}

export class Propose1Call__Outputs {
  _call: Propose1Call;

  constructor(call: Propose1Call) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class QueueCall extends ethereum.Call {
  get inputs(): QueueCall__Inputs {
    return new QueueCall__Inputs(this);
  }

  get outputs(): QueueCall__Outputs {
    return new QueueCall__Outputs(this);
  }
}

export class QueueCall__Inputs {
  _call: QueueCall;

  constructor(call: QueueCall) {
    this._call = call;
  }

  get targets(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get values(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get calldatas(): Array<Bytes> {
    return this._call.inputValues[2].value.toBytesArray();
  }

  get descriptionHash(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class QueueCall__Outputs {
  _call: QueueCall;

  constructor(call: QueueCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class Queue1Call extends ethereum.Call {
  get inputs(): Queue1Call__Inputs {
    return new Queue1Call__Inputs(this);
  }

  get outputs(): Queue1Call__Outputs {
    return new Queue1Call__Outputs(this);
  }
}

export class Queue1Call__Inputs {
  _call: Queue1Call;

  constructor(call: Queue1Call) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class Queue1Call__Outputs {
  _call: Queue1Call;

  constructor(call: Queue1Call) {
    this._call = call;
  }
}

export class UpdateTimelockCall extends ethereum.Call {
  get inputs(): UpdateTimelockCall__Inputs {
    return new UpdateTimelockCall__Inputs(this);
  }

  get outputs(): UpdateTimelockCall__Outputs {
    return new UpdateTimelockCall__Outputs(this);
  }
}

export class UpdateTimelockCall__Inputs {
  _call: UpdateTimelockCall;

  constructor(call: UpdateTimelockCall) {
    this._call = call;
  }

  get newTimelock(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateTimelockCall__Outputs {
  _call: UpdateTimelockCall;

  constructor(call: UpdateTimelockCall) {
    this._call = call;
  }
}
