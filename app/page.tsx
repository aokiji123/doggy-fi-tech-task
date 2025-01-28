"use client";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { useInscribeData } from "@/app/hooks/useInscribeData";
import { useMintDunes } from "@/app/hooks/useDunes";
import { useMintDRC20 } from "@/app/hooks/useDRC20";
import Transactions from "@/app/components/Transactions";
import { MintDuneForm } from "@/app/components/MintDuneForm";
import { MintDRC20Form } from "@/app/components/MintDrc20Form";
import { getAddress } from "@/app/utils/getAddress";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [value, setValue] = useState("");
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

  const handleMintDune: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("addressIndex", 0);
    try {
      await _mintDune(formData);
    } catch (error) {
      console.error("Minting dune failed:", error);
    }
  };

  const handleMintDRC20: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("addressIndex", 0);
    try {
      await _mintDrc20(formData);
    } catch (error) {
      console.error("Minting DRC20 failed:", error);
    }
  };

  const handleInscribeData = async (e: FormEvent) => {
    e.preventDefault();

    if (!walletAddress) {
      alert("Connect to MetaMask first.");
      return;
    }

    const inscribeDataParams = {
      addressIndex: 0,
      toAddress: walletAddress,
      data: value,
      contentType: "text/plain",
    };

    try {
      await _inscribeData(inscribeDataParams);
    } catch (err) {
      console.error("Inscribe data failed:", err);
    }
  };

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_requestSnaps",
          params: {
            "npm:@doggyfi-official/kobosu": {},
          },
        });

        const address = await getAddress(0);
        setWalletAddress(address);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Failed to connect to MetaMask. Please try again.");
      }
    } else {
      alert(
        "MetaMask extension is not installed. Please install it to use this app.",
      );
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
          <input
            onChange={handleChange}
            value={value}
            placeholder="Enter data to inscribe"
            className="border-[1px] border-black p-2 rounded-[10px] w-80"
          />
          <button
            onClick={handleInscribeData}
            className={`bg-gray-500 p-2 text-white rounded-[10px] ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Inscribing..." : "Inscribe"}
          </button>
          {error && <p className="text-red-500">Error: {error}</p>}

          <MintDuneForm
            onSubmit={handleMintDune}
            error={duneError}
            isLoading={isDuneLoading}
          />

          <MintDRC20Form
            onSubmit={handleMintDRC20}
            isLoading={isDrc20Loading}
            error={drc20Error}
          />

          <Transactions />
        </>
      )}
    </div>
  );
}
