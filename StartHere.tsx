// components/StartHere.tsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import DonationForm from "./DonationForm"; // Import the DonationForm

const StartHere: React.FC = () => {
  const { user } = useAuth();
  const [showDonationForm, setShowDonationForm] = useState(false);

  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Start Here</h1>
      <p className="text-muted-foreground">
        Welcome to the fundraising portal. Here&apos;s how to get started:
      </p>
      <ul className="list-disc list-inside mt-4 space-y-2">
        <li>Set up your profile</li>
        <li>Create your fundraising goal</li>
        <li>Share your donation link</li>
        <li>Track your progress</li>
      </ul>
      {user ? (
        <div className="mt-6">
          <button
            onClick={() => setShowDonationForm(!showDonationForm)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition duration-300"
          >
            {showDonationForm ? "Cancel" : "Donate"}
          </button>
          {showDonationForm && <DonationForm />}
        </div>
      ) : (
        <p className="mt-4 text-red-500">Please log in to donate.</p>
      )}
    </div>
  );
};

export default StartHere;
