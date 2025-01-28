import { snapRpcRequest } from "@/app/utils/snapRpsRequest";

export const getAddress = async (addressIndex: number) => {
  try {
    return await snapRpcRequest({
      snapRpcMethod: "getAddress",
      params: { addressIndex },
    });
  } catch (err) {
    console.error("Failed to fetch address:", err);
    throw new Error("Unable to retrieve address. Please try again.");
  }
};
