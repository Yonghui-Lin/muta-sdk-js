import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Bytes corresponding hex string. */
  Bytes: string;
  /** 20 bytes of account address */
  Address: string;
  /** Uint64 */
  Uint64: string;
  /** The output digest of Keccak hash function */
  Hash: string;
};

export type Event = {
  service: Scalars['String'];
  data: Scalars['String'];
};


/** The verifier of the block header proved */
export type Proof = {
  height: Scalars['Uint64'];
  round: Scalars['Uint64'];
  blockHash: Scalars['Hash'];
  signature: Scalars['Bytes'];
  bitmap: Scalars['Bytes'];
};

/** Signature of the transaction */
export type InputTransactionEncryption = {
  /** The digest of the transaction */
  txHash: Scalars['Hash'];
  /** The public key of transfer */
  pubkey: Scalars['Bytes'];
  /** The signature of the transaction */
  signature: Scalars['Bytes'];
};



/** Block is a single digital record created within a blockchain. Each block contains a record of the previous Block, and when linked together these become the “chain”.A block is always composed of header and body. */
export type Block = {
  /** The header section of a block */
  header: BlockHeader;
  /** The body section of a block */
  orderedTxHashes: Array<Scalars['Hash']>;
  /** Hash of the block */
  hash: Scalars['Hash'];
};

export type SignedTransaction = {
  chainId: Scalars['Hash'];
  cyclesLimit: Scalars['Uint64'];
  cyclesPrice: Scalars['Uint64'];
  nonce: Scalars['Hash'];
  timeout: Scalars['Uint64'];
  sender: Scalars['Address'];
  serviceName: Scalars['String'];
  method: Scalars['String'];
  payload: Scalars['String'];
  txHash: Scalars['Hash'];
  pubkey: Scalars['Bytes'];
  signature: Scalars['Bytes'];
};

export type Mutation = {
  /** send transaction */
  sendTransaction: Scalars['Hash'];
  /** @deprecated DON'T use it in production! This is just for development. */
  unsafeSendTransaction: Scalars['Hash'];
};


export type MutationSendTransactionArgs = {
  inputRaw: InputRawTransaction;
  inputEncryption: InputTransactionEncryption;
};


export type MutationUnsafeSendTransactionArgs = {
  inputRaw: InputRawTransaction;
  inputPrivkey: Scalars['Bytes'];
};


/** Validator address set */
export type Validator = {
  address: Scalars['Address'];
  proposeWeight: Scalars['Int'];
  voteWeight: Scalars['Int'];
};

/** A block header is like the metadata of a block. */
export type BlockHeader = {
  /** Identifier of a chain in order to prevent replay attacks across channels  */
  chainId: Scalars['Hash'];
  /** block height */
  height: Scalars['Uint64'];
  /** The height to which the block has been executed */
  execHeight: Scalars['Uint64'];
  /** The hash of the serialized previous block */
  prevHash: Scalars['Hash'];
  /** A timestamp that records when the block was created */
  timestamp: Scalars['Uint64'];
  /** The merkle root of ordered transactions */
  orderRoot: Scalars['Hash'];
  /** The hash of ordered signed transactions */
  orderSignedTransactionsHash: Scalars['Hash'];
  /** The merkle roots of all the confirms */
  confirmRoot: Array<Scalars['Hash']>;
  /** The merkle root of state root */
  stateRoot: Scalars['Hash'];
  /** The merkle roots of receipts */
  receiptRoot: Array<Scalars['Hash']>;
  /** The sum of all transactions costs */
  cyclesUsed: Array<Scalars['Uint64']>;
  /** The address descirbed who packed the block */
  proposer: Scalars['Address'];
  proof: Proof;
  /** The version of validator is designed for cross chain */
  validatorVersion: Scalars['Uint64'];
  validators: Array<Validator>;
};

export type Query = {
  /** Get the block */
  getBlock: Block;
  /** Get the transaction by hash */
  getTransaction: SignedTransaction;
  /** Get the receipt by transaction hash */
  getReceipt: Receipt;
  /** query service */
  queryService: ServiceResponse;
};


export type QueryGetBlockArgs = {
  height?: Maybe<Scalars['Uint64']>;
};


export type QueryGetTransactionArgs = {
  txHash: Scalars['Hash'];
};


export type QueryGetReceiptArgs = {
  txHash: Scalars['Hash'];
};


export type QueryQueryServiceArgs = {
  height?: Maybe<Scalars['Uint64']>;
  cyclesLimit?: Maybe<Scalars['Uint64']>;
  cyclesPrice?: Maybe<Scalars['Uint64']>;
  caller: Scalars['Address'];
  serviceName: Scalars['String'];
  method: Scalars['String'];
  payload: Scalars['String'];
};

export type Receipt = {
  stateRoot: Scalars['Hash'];
  height: Scalars['Uint64'];
  txHash: Scalars['Hash'];
  cyclesUsed: Scalars['Uint64'];
  events: Array<Event>;
  response: ReceiptResponse;
};

export type ServiceResponse = {
  code: Scalars['Uint64'];
  succeedData: Scalars['String'];
  errorMessage: Scalars['String'];
};

/** There was many types of transaction in Muta, A transaction often require computing resources or write data to chain,these resources are valuable so we need to pay some token for them.InputRawTransaction describes information above */
export type InputRawTransaction = {
  /** Identifier of the chain. */
  chainId: Scalars['Hash'];
  /** Mostly like the gas limit in Ethereum, describes the fee that you are willing to pay the highest price for the transaction */
  cyclesLimit: Scalars['Uint64'];
  cyclesPrice: Scalars['Uint64'];
  /** Every transaction has its own id, unlike Ethereum's nonce,the nonce in Muta is an hash */
  nonce: Scalars['Hash'];
  /** For security and performance reasons, Muta will only deal with trade request over a period of time,the `timeout` should be `timeout > current_block_height` and `timeout < current_block_height + timeout_gap`,the `timeout_gap` generally equal to 20. */
  timeout: Scalars['Uint64'];
  serviceName: Scalars['String'];
  method: Scalars['String'];
  payload: Scalars['String'];
  sender: Scalars['Address'];
};

export type ReceiptResponse = {
  serviceName: Scalars['String'];
  method: Scalars['String'];
  response: ServiceResponse;
};

export type QueryServiceQueryVariables = Exact<{
  serviceName: Scalars['String'];
  method: Scalars['String'];
  payload: Scalars['String'];
  height?: Maybe<Scalars['Uint64']>;
  caller?: Maybe<Scalars['Address']>;
  cyclePrice?: Maybe<Scalars['Uint64']>;
  cycleLimit?: Maybe<Scalars['Uint64']>;
}>;


export type QueryServiceQuery = { queryService: Pick<ServiceResponse, 'code' | 'errorMessage' | 'succeedData'> };

export type SendTransactionMutationVariables = Exact<{
  inputRaw: InputRawTransaction;
  inputEncryption: InputTransactionEncryption;
}>;


export type SendTransactionMutation = Pick<Mutation, 'sendTransaction'>;

export type ServicePayloadFragment = Pick<SignedTransaction, 'serviceName' | 'method' | 'payload'>;

export type GetTransactionQueryVariables = Exact<{
  txHash: Scalars['Hash'];
}>;


export type GetTransactionQuery = { getTransaction: (
    Pick<SignedTransaction, 'nonce' | 'chainId' | 'cyclesLimit' | 'cyclesPrice' | 'timeout' | 'txHash' | 'pubkey' | 'signature' | 'sender'>
    & ServicePayloadFragment
  ) };

export type GetReceiptQueryVariables = Exact<{
  txHash: Scalars['Hash'];
}>;


export type GetReceiptQuery = { getReceipt: (
    Pick<Receipt, 'txHash' | 'height' | 'cyclesUsed' | 'stateRoot'>
    & { events: Array<Pick<Event, 'data' | 'service'>>, response: (
      Pick<ReceiptResponse, 'serviceName' | 'method'>
      & { response: Pick<ServiceResponse, 'code' | 'errorMessage' | 'succeedData'> }
    ) }
  ) };

export type GetBlockQueryVariables = Exact<{
  height?: Maybe<Scalars['Uint64']>;
}>;


export type GetBlockQuery = { getBlock: (
    Pick<Block, 'orderedTxHashes' | 'hash'>
    & { header: (
      Pick<BlockHeader, 'chainId' | 'confirmRoot' | 'cyclesUsed' | 'execHeight' | 'height' | 'orderRoot' | 'orderSignedTransactionsHash' | 'prevHash' | 'proposer' | 'receiptRoot' | 'stateRoot' | 'timestamp' | 'validatorVersion'>
      & { proof: Pick<Proof, 'bitmap' | 'blockHash' | 'height' | 'round' | 'signature'>, validators: Array<Pick<Validator, 'address' | 'proposeWeight' | 'voteWeight'>> }
    ) }
  ) };

export const ServicePayloadFragmentDoc = gql`
    fragment ServicePayload on SignedTransaction {
  serviceName
  method
  payload
}
    `;
export const QueryServiceDocument = gql`
    query queryService($serviceName: String!, $method: String!, $payload: String!, $height: Uint64, $caller: Address = "0x0000000000000000000000000000000000000000", $cyclePrice: Uint64, $cycleLimit: Uint64) {
  queryService(height: $height, serviceName: $serviceName, method: $method, payload: $payload, caller: $caller, cyclesPrice: $cyclePrice, cyclesLimit: $cycleLimit) {
    code
    errorMessage
    succeedData
  }
}
    `;
export const SendTransactionDocument = gql`
    mutation sendTransaction($inputRaw: InputRawTransaction!, $inputEncryption: InputTransactionEncryption!) {
  sendTransaction(inputRaw: $inputRaw, inputEncryption: $inputEncryption)
}
    `;
export const GetTransactionDocument = gql`
    query getTransaction($txHash: Hash!) {
  getTransaction(txHash: $txHash) {
    ...ServicePayload
    nonce
    chainId
    cyclesLimit
    cyclesPrice
    timeout
    txHash
    pubkey
    signature
    sender
  }
}
    ${ServicePayloadFragmentDoc}`;
export const GetReceiptDocument = gql`
    query getReceipt($txHash: Hash!) {
  getReceipt(txHash: $txHash) {
    txHash
    height
    cyclesUsed
    events {
      data
      service
    }
    stateRoot
    response {
      serviceName
      method
      response {
        code
        errorMessage
        succeedData
      }
    }
  }
}
    `;
export const GetBlockDocument = gql`
    query getBlock($height: Uint64) {
  getBlock(height: $height) {
    header {
      chainId
      confirmRoot
      cyclesUsed
      execHeight
      height
      orderRoot
      orderSignedTransactionsHash
      prevHash
      proof {
        bitmap
        blockHash
        height
        round
        signature
      }
      proposer
      receiptRoot
      stateRoot
      timestamp
      validatorVersion
      validators {
        address
        proposeWeight
        voteWeight
      }
    }
    orderedTxHashes
    hash
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    queryService(variables: QueryServiceQueryVariables): Promise<QueryServiceQuery> {
      return withWrapper(() => client.request<QueryServiceQuery>(print(QueryServiceDocument), variables));
    },
    sendTransaction(variables: SendTransactionMutationVariables): Promise<SendTransactionMutation> {
      return withWrapper(() => client.request<SendTransactionMutation>(print(SendTransactionDocument), variables));
    },
    getTransaction(variables: GetTransactionQueryVariables): Promise<GetTransactionQuery> {
      return withWrapper(() => client.request<GetTransactionQuery>(print(GetTransactionDocument), variables));
    },
    getReceipt(variables: GetReceiptQueryVariables): Promise<GetReceiptQuery> {
      return withWrapper(() => client.request<GetReceiptQuery>(print(GetReceiptDocument), variables));
    },
    getBlock(variables?: GetBlockQueryVariables): Promise<GetBlockQuery> {
      return withWrapper(() => client.request<GetBlockQuery>(print(GetBlockDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;