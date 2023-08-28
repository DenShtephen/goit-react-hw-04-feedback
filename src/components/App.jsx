import { Component } from 'react';
import { Section } from './Section/Section';
import { Statistics } from './Points/Statistics';
import { FeedbackOptions } from './Points/Feedback';
import '../index.css';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  leavePoints = point => {
    this.setState(prevState => ({
      [point]: prevState[point] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const totalFeedback = this.countTotalFeedback();
    const { good } = this.state;
    return totalFeedback > 0 ? ((good / totalFeedback) * 100).toFixed(0) : 0;
  };

  render() {
    const totalFeedback = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <div className="container">
        <Section title="Please leave feedback" className="section">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.leavePoints}
          />
        </Section>
        <Section title="Statistics" className="section">
          {totalFeedback > 0 ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={totalFeedback}
              positivePercentage={positivePercentage}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}
