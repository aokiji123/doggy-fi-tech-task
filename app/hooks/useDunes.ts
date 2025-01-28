import { useState } from "react";
import { snapRpcRequest } from "@/app/utils/snapRpsRequest";

export const useMintDunes = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastTxId, setLastTxId] = useState<string | null>(null);

  const _mintDune = async (data: FormData) => {
    setError(null);
    setLoading(true);
    const addressIndex = data.get("addressIndex");
    const id = data.get("id");
    const amount = data.get("amount");
    const receiver = data.get("receiver");

    const params = {
      addressIndex: Number(addressIndex),
      toAddress: String(addressIndex),
      id: String(id),
      amount: String(amount),
      receiver: String(receiver),
    };

    try {
      const response = await mintDune(params);
      setLastTxId(response);
    } catch (e) {
      setError((e as Error).message);
    }
    setLoading(false);
  };

  return {
    error,
    isLoading,
    lastTxId,
    _mintDune,
  };
};

export const mintDune = async ({
  addressIndex,
  toAddress,
  id,
  amount,
  receiver,
}: {
  addressIndex: number;
  toAddress: string;
  id: string;
  amount: string;
  receiver: string;
}) => {
  return snapRpcRequest({
    snapRpcMethod: "mintDune",
    params: {
      addressIndex,
      toAddress,
      id,
      amount,
      receiver,
    },
  });
};
