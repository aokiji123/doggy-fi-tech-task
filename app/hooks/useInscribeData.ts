import { useState } from "react";
import { snapRpcRequest } from "@/app/utils/snapRpsRequest";

type inscribeDataParams = {
  addressIndex: number;
  toAddress: string;
  data: string;
  contentType: string;
};

export const useInscribeData = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const _inscribeData = async (data: inscribeDataParams) => {
    setLoading(true);
    setError(null);

    const { addressIndex, toAddress, data: inscribeData, contentType } = data;

    try {
      await inscribeDataRequest({
        addressIndex,
        toAddress,
        data: inscribeData,
        contentType,
      });
    } catch (e) {
      setError((e as Error).message);
    }

    setLoading(false);
  };

  return {
    error,
    isLoading,
    _inscribeData,
  };
};

export const inscribeDataRequest = async ({
  addressIndex,
  toAddress,
  data,
  contentType,
}: inscribeDataParams) => {
  return snapRpcRequest({
    snapRpcMethod: "inscribeData",
    params: {
      addressIndex,
      toAddress,
      data,
      contentType,
    },
  });
};
