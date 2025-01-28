import React, { useEffect } from "react";
import { useGetTransactions } from "@/app/hooks/useTransactions";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";

export default function Transactions() {
  const { transactions, isLoading, error, _getTransactions } =
    useGetTransactions();

  useEffect(() => {
    const fetchTransactions = async () => {
      await _getTransactions({ addressIndex: 0 });
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center gap-[20px] justify-center">
          <p>Loading transactions history </p>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <h3 className="mb-[20px]">Transactions History (last 5) :</h3>
          {error && <p className="text-red-500">Error: {error}</p>}
          <ol className="list-decimal">
            {transactions.map((tx, index) => (
              <li key={index}>
                <p>Transaction Id: {tx.txid}</p>
                <p>Transaction Hash: {tx.blockhash}</p>
                <a
                  className="text-blue-500"
                  href={`https://wonky-ord.dogeord.io/tx/${tx.txid}`}
                  target="_blank"
                >{`https://wonky-ord.dogeord.io/tx/${tx.txid}`}</a>
                <hr className="my-[20px]" />
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
