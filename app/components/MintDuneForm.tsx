import { FormEventHandler } from "react";

type MintDuneFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  error: string | null;
};

export const MintDuneForm = ({
  onSubmit,
  isLoading,
  error,
}: MintDuneFormProps) => (
  <>
    <form onSubmit={onSubmit} className="flex flex-col gap-[10px]">
      <h3>Mint Dune</h3>
      <input
        name="id"
        placeholder="Dune ID"
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
        className={`bg-blue-500 p-2 text-white rounded-[10px] ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Minting Dune..." : "Mint Dune"}
      </button>
    </form>
    {error && <p className="text-red-500">Error: {error}</p>}
  </>
);
