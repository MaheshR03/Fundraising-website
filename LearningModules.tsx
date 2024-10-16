import React from "react";

const LearningModules: React.FC = () => {
  const modules = [
    {
      title: "Fundraising Basics",
      description:
        "Learn the fundamentals of effective fundraising strategies.",
    },
    {
      title: "Digital Marketing for NGOs",
      description: "Discover how to leverage digital platforms for your cause.",
    },
  ];

  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Learning Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">{module.title}</h2>
            <p className="text-muted-foreground mb-4">{module.description}</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition duration-300">
              Start Module
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningModules;
