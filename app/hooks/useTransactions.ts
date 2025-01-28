import { useState } from "react";
import { snapRpcRequest } from "@/app/utils/snapRpsRequest";

type getTransactionsParams = {
  addressIndex: number;
};

interface TransactionInfo {
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
}

interface Vin {
  txid: string;
  vout: number;
  scriptSig: ScriptSig;
  sequence: number;
}

interface Vout {
  value: number;
  n: number;
  scriptPubKey: ScriptPubKey;
}

interface ScriptSig {
  asm: string;
  hex: string;
}

interface ScriptPubKey {
  asm: string;
  hex: string;
  type: string;
  addresses: string[];
}

export const useGetTransactions = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<TransactionInfo[]>([]);

  const _getTransactions = async (params: getTransactionsParams) => {
    setLoading(true);
    setError(null);

    const { addressIndex } = params;

    try {
      const response = await getTransactionsRequest({ addressIndex });
      setTransactions(response);
    } catch (e) {
      setError((e as Error).message);
    }

    setLoading(false);
  };

  return {
    error,
    isLoading,
    transactions,
    _getTransactions,
  };
};

export const getTransactionsRequest = async ({
  addressIndex,
}: getTransactionsParams) => {
  return await snapRpcRequest({
    snapRpcMethod: "getTransactions",
    params: { addressIndex },
  });
};
