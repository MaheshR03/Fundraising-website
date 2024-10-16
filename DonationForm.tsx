import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const DonationForm: React.FC = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState<number | "">("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !transactionId) {
      setError("Please enter both amount and transaction ID.");
      return;
    }

    // Call your donation API here
    const donationData = {
      name: user?.name,
      email: user?.email,
      amount,
      transactionId,
      referralCode: user?.referralCode || null,
    };

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        // Reset the form
        setAmount("");
        setTransactionId("");
      } else {
        throw new Error(result.message);
      }
    } catch {
      setError("Failed to process the donation. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium">Donation Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          placeholder="Enter amount"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Transaction ID</label>
        <input
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          placeholder="Enter transaction ID"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition duration-300"
      >
        Complete Donation
      </button>
    </form>
  );
};

export default DonationForm;
