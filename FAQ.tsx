import React from "react";

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What is NayePankh Foundation?",
      answer:
        "NayePankh Foundation is a distinguished NGO based in Noida, Uttar Pradesh, dedicated to uplifting underprivileged children and fostering positive societal change.",
    },
    {
      question: "How can I contribute?",
      answer:
        "You can contribute by making a donation through our secure payment gateway or by volunteering your time and skills to our various programs.",
    },
  ];

  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-border pb-4">
            <h2 className="text-lg font-semibold mb-2">{faq.question}</h2>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
