"use client";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { useInscribeData } from "@/app/hooks/useInscribeData";
import { useMintDunes } from "@/app/hooks/useDunes";
import { useMintDRC20 } from "@/app/hooks/useDRC20";
import Transactions from "@/app/components/Transactions";
import { MintDuneForm } from "@/app/components/MintDuneForm";
import { MintDRC20Form } from "@/app/components/MintDrc20Form";
import { InscribeDataForm } from "./components/InscribeDataForm";
import { useMetaMaskConnection } from "./hooks/useMetamaskConnection";

export default function Home() {
  const { walletAddress, connectToMetaMask } = useMetaMaskConnection();
  const [inscribeValue, setInscribeValue] = useState("");
  const { error, isLoading, _inscribeData } = useInscribeData();
  const {
    error: duneError,
    isLoading: isDuneLoading,
    _mintDune,
  } = useMintDunes();
  const {
    error: drc20Error,
    isLoading: isDrc20Loading,
    _mintDrc20,
  } = useMintDRC20();

  const handleInscribeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInscribeValue(e.target.value);
  };

  const handleSubmitMintDune: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("addressIndex", "0");
    try {
      await _mintDune(formData);
    } catch (error) {
      console.error("Minting dune failed:", error);
    }
  };

  const handleSubmitMintDRC20: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("addressIndex", "0");
    try {
      await _mintDrc20(formData);
    } catch (error) {
      console.error("Minting DRC20 failed:", error);
    }
  };

  const handleSubmitInscribeData = async (e: FormEvent) => {
    e.preventDefault();

    if (!walletAddress) {
      alert("Connect to MetaMask first.");
      return;
    }

    const inscribeDataParams = {
      addressIndex: 0,
      toAddress: walletAddress,
      data: inscribeValue,
      contentType: "text/plain",
    };

    try {
      await _inscribeData(inscribeDataParams);
    } catch (err) {
      console.error("Inscribe data failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[20px] py-[100px]">
      <h1 className="text-2xl">DoggyFi Tech Task</h1>
      {!walletAddress ? (
        <button
          onClick={connectToMetaMask}
          className="bg-gray-500 p-2 text-white rounded-[10px]"
        >
          Connect to MetaMask
        </button>
      ) : (
        <>
          <h3>Your MetaMask wallet is: {walletAddress}</h3>
          <InscribeDataForm
            handleSubmitInscribeData={handleSubmitInscribeData}
            handleInscribeInputChange={handleInscribeInputChange}
            inscribeValue={inscribeValue}
            isLoading={isLoading}
            error={error}
          />

          <MintDuneForm
            onSubmit={handleSubmitMintDune}
            error={duneError}
            isLoading={isDuneLoading}
          />

          <MintDRC20Form
            onSubmit={handleSubmitMintDRC20}
            isLoading={isDrc20Loading}
            error={drc20Error}
          />

          <Transactions />
        </>
      )}
    </div>
  );
}
