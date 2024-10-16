import React, { useState } from "react";

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    console.log("Feedback submitted:", feedback);
    setFeedback("");
  };

  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="feedback"
          className="block text-sm font-medium text-muted-foreground mb-2"
        >
          Your Feedback
        </label>
        <textarea
          id="feedback"
          className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
        ></textarea>
        <button
          type="submit"
          className="mt-4 w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition duration-300"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
