import { useState } from 'react';
import { FeedbackOptions } from './Feedback/Feedbackoptions';
import { Statistics } from './Statistics/statistics';
import { Section } from './section/section';
import { Notification } from './Notification/notification';

export const App = () => {
  const [good, setAGoodFb] = useState(0);
  const [neutral, setANeutralFb] = useState(0);
  const [bad, setABadFb] = useState(0);

  const updateFeedbackData = e => {
    if (e.target.textContent === 'good') {
      setAGoodFb(prevState => prevState + 1);
    } else if (e.target.textContent === 'neutral') {
      setANeutralFb(prevState => prevState + 1);
    } else {
      setABadFb(prevState => prevState + 1);
    }
    return;
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = e => {
    if (good === 0) {
      return 0;
    }
    const totalData = countTotalFeedback();

    return Math.round((good * 100) / totalData);
  };

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={updateFeedbackData}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
