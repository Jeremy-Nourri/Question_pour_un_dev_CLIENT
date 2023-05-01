// import npm
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

import '../style.scss';

export default function Answers({ answer, handleChange }) {
  const answersUser = useSelector((state) => state.userAnswers);

  return (
    <div className="questions-page__answer">
      <input
        className="questions-page__answer-input"
        type="checkbox"
        name={answer.questionId}
        id={answer.id}
        value={answer.id}
        onChange={handleChange}
      />

      <label
        className={answersUser.includes((answer.id).toString()) ? 'questions-page__answer-label--checked' : 'questions-page__answer-label'}
        key={answer.id}
        htmlFor={answer.id}
      >
        {answer.content}
      </label>
    </div>
  );
}

Answers.propTypes = {
  answer: propTypes.shape({
    id: propTypes.number.isRequired,
    content: propTypes.string.isRequired,
    correct: propTypes.bool.isRequired,
    questionId: propTypes.number.isRequired,
  }).isRequired,
  handleChange: propTypes.func.isRequired,
};
