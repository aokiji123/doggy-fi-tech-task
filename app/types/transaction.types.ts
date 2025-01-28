export type TransactionInfo = {
  txid: string;
  hex: string;
  size: number;
  vsize: number;
  vin: Vin[];
  vout: Vout[];
  blockhash: string;
  confirmations: number;
  time: number;
  blocktime: number;
};

type Vin = {
  txid: string;
  vout: number;
  scriptSig: ScriptSig;
  sequence: number;
};

type Vout = {
  value: number;
  n: number;
  scriptPubKey: ScriptPubKey;
};

type ScriptSig = {
  asm: string;
  hex: string;
};

type ScriptPubKey = {
  asm: string;
  hex: string;
  type: string;
  addresses: string[];
};
