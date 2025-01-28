// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type RpcMethods = typeof any;
type InferArgs<M extends keyof RpcMethods> = RpcMethods[M] extends (
  ...args: infer A
) => unknown
  ? A[0]
  : never;

type RpcMethodTypes = {
  [Method in keyof RpcMethods]: {
    input: InferArgs<Method>;
    output: ReturnType<RpcMethods[Method]>;
  };
};

export const snapRpcRequest = async <M extends keyof RpcMethodTypes>(args: {
  snapRpcMethod: string;
  params: {
    amount?: string | number;
    receiver?: string;
    addressIndex?: number;
    id?: string;
    toAddress?: string;
    ticker?: string;
    data?: string;
    contentType?: string;
  };
}) => {
  const result = await window.ethereum?.request({
    method: "wallet_invokeSnap",
    params: {
      snapId: "npm:@doggyfi-official/kobosu",
      request: {
        method: `doge_${args.snapRpcMethod}`,
        params: "params" in args ? args.params : undefined,
      },
    },
  });

  return result as unknown as RpcMethodTypes[M]["output"];
};
