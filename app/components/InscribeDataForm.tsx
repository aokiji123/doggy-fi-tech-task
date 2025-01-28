import React from "react";

type InscribeDataFormProps = {
  handleInscribeInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inscribeValue: string;
  handleSubmitInscribeData: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  error: string | null;
};

export const InscribeDataForm = ({
  handleInscribeInputChange,
  inscribeValue,
  handleSubmitInscribeData,
  isLoading,
  error,
}: InscribeDataFormProps) => {
  return (
    <>
      <input
        onChange={handleInscribeInputChange}
        value={inscribeValue}
        placeholder="Enter data to inscribe"
        className="border-[1px] border-black p-2 rounded-[10px] w-80"
      />
      <button
        onClick={handleSubmitInscribeData}
        className={`bg-gray-500 p-2 text-white rounded-[10px] ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Inscribing..." : "Inscribe"}
      </button>
      {error && <p className="text-red-500">Error: {error}</p>}
    </>
  );
};
