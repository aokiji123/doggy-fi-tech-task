import { useState, useEffect } from "react";
import { getAddress } from "@/app/utils/getAddress";

export function useMetaMaskConnection() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = (await window.ethereum.request({
          method: "eth_accounts",
        })) as string[];
        if (accounts?.length > 0) {
          const address = await getAddress(0);
          setWalletAddress(address);
        }
      } catch (error) {
        console.error("Error checking MetaMask connection:", error);
      }
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
        "MetaMask extension is not installed. Please install it to use this app."
      );
    }
  };

  return { walletAddress, connectToMetaMask };
}
