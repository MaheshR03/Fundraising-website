import React from "react";

const Rewards: React.FC = () => {
  const rewards = [
    {
      title: "Star Fundraiser",
      description: "Raise ₹5,000 to unlock this badge and special perks!",
      icon: "⭐",
    },
    {
      title: "Ninja Fundraiser",
      description: "Raise ₹10,000 to become a fundraising ninja!",
      icon: "🥷",
    },
  ];

  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Rewards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map((reward, index) => (
          <div
            key={index}
            className="border border-border rounded-lg p-4 flex items-center"
          >
            <div className="text-4xl mr-4">{reward.icon}</div>
            <div>
              <h2 className="text-lg font-semibold mb-2">{reward.title}</h2>
              <p className="text-muted-foreground">{reward.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
