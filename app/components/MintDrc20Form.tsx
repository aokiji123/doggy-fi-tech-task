import { FormEventHandler } from "react";

type MintDrc20FormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  error: string | null;
};

export const MintDRC20Form = ({
  onSubmit,
  isLoading,
  error,
}: MintDrc20FormProps) => (
  <>
    <form onSubmit={onSubmit} className="flex flex-col gap-[10px]">
      <h3>Mint DRC20</h3>
      <input
        name="id"
        placeholder="Token ID"
        className="border-[1px] border-black p-2 rounded-[10px] w-80"
      />
      <input
        name="amount"
        placeholder="Amount"
        className="border-[1px] border-black p-2 rounded-[10px] w-80"
      />
      <input
        name="receiver"
        placeholder="Receiver Address"
        className="border-[1px] border-black p-2 rounded-[10px] w-80"
      />
      <button
        type="submit"
        className={`bg-green-500 p-2 text-white rounded-[10px] ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Minting DRC20..." : "Mint DRC20"}
      </button>
    </form>
    {error && <p className="text-red-500">Error: {error}</p>}
  </>
);
