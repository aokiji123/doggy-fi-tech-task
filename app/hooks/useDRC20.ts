import { useState } from "react";
import { snapRpcRequest } from "@/app/utils/snapRpsRequest";

export const useMintDRC20 = () => {
  const [lastTxId, setLastTxId] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const _mintDrc20 = async (data: FormData) => {
    if (isLoading) {
      return;
    }

    try {
      setError(null);
      setLastTxId(null);
      setIsLoading(true);
      const addressIndex = data.get("addressIndex");
      const toAddress = data.get("toAddress");
      const ticker = data.get("ticker");
      const amount = data.get("amount");

      const response: [string, string] = await mintDrc20({
        addressIndex: Number(addressIndex),
        toAddress: String(toAddress),
        ticker: String(ticker),
        amount: Number(amount),
      });
      setLastTxId(response[1]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { lastTxId, isLoading, error, _mintDrc20 };
};

const mintDrc20 = async ({
  addressIndex,
  toAddress,
  ticker,
  amount,
}: {
  addressIndex: number;
  toAddress: string;
  ticker: string;
  amount: number;
}) => {
  return snapRpcRequest({
    snapRpcMethod: "mintDrc20",
    params: {
      addressIndex,
      toAddress,
      ticker,
      amount,
    },
  });
};
