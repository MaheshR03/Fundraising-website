import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const goalAchieved = 10;
  const totalGoal = 30000;

  const copyDonationLink = () => {
    if (user) {
      navigator.clipboard.writeText(
        `https://yourwebsite.com/donate?ref=${user.referralCode}`
      );
      alert("Donation link copied to clipboard!");
    }
  };

  const shareOnWhatsApp = () => {
    if (user) {
      const message = encodeURIComponent(
        `I am volunteering with NayePankh Foundation. Please support me by donating through this link: https://yourwebsite.com/donate?ref=${user.referralCode}`
      );
      window.open(`https://wa.me/?text=${message}`, "_blank");
    }
  };

  return (
    <div>
      <div className="bg-black text-white p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold">
          {user ? `Hello ${user.name},` : "Hello,"}
        </h2>
        <p className="mt-2">
          Initial push is the toughest! Go through the learning modules, or
          reach out to your fundraising manager to level up.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Goal Achieved</h3>
          <span className="text-2xl font-bold text-gray-900">
            ₹{goalAchieved}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-red-600 h-2.5 rounded-full"
            style={{ width: `${(goalAchieved / totalGoal) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">
            Total Goal: ₹{totalGoal}
          </span>
          <span className="text-sm text-gray-500">Level Achieved: Star</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Unlock Ninja Level at ₹5000
        </p>
      </div>

      {user && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Reference Code: {user.referralCode}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={copyDonationLink}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Copy Donation Link
            </button>
            <button
              onClick={shareOnWhatsApp}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Share on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
