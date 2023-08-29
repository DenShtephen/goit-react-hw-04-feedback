import { useState } from 'react';
import { Section } from './Section/Section';
import { Statistics } from './Points/Statistics';
import { FeedbackOptions } from './Points/Feedback';
import '../index.css';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const leavePoints = point => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [point]: prevFeedback[point] + 1,
    }));
  };

  const totalFeedback = Object.values(feedback).reduce(
    (total, value) => total + value,
    0
  );

  const positivePercentage =
    totalFeedback > 0 ? ((feedback.good / totalFeedback) * 100).toFixed(0) : 0;

  return (
    <div className="container">
      <Section title="Please leave feedback" className="section">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={leavePoints}
        />
      </Section>
      <Section title="Statistics" className="section">
        {totalFeedback > 0 ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback}
            positivePercentage={parseFloat(feedback.positivePercentage)}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
