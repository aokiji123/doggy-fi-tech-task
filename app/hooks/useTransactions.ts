import { useState } from "react";
import { snapRpcRequest } from "@/app/utils/snapRpsRequest";
import { TransactionInfo } from "../types/transaction.types";

export type getTransactionsParams = {
  addressIndex: number;
};

export const useGetTransactions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<TransactionInfo[]>([]);

  const _getTransactions = async (params: getTransactionsParams) => {
    setIsLoading(true);
    setError(null);

    const { addressIndex } = params;

    try {
      const response = await getLastFiveTransactionsRequest({ addressIndex });
      console.log(response);
      setTransactions(response);
    } catch (e) {
      setError((e as Error).message);
    }

    setIsLoading(false);
  };

  return {
    error,
    isLoading,
    transactions,
    _getTransactions,
  };
};

export const getLastFiveTransactionsRequest = async ({
  addressIndex,
}: getTransactionsParams) => {
  const transactions = await snapRpcRequest({
    snapRpcMethod: "getTransactions",
    params: { addressIndex },
  });

  // last five transactions
  return transactions.reverse().slice(0, 5);
};
