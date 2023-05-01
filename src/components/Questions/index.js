/* eslint-disable react/jsx-no-bind */
// import npm
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import features
import { useGetQuestionsQuery, useGetTrueAnswersQuery, usePostScoreMutation } from '../../features/API/apiSlice';
import { answers, removeAnswerId } from '../../features/userAnswersSlice';
import { questionsAnswered, removeQuestionId } from '../../features/userQuestionsAnsweredSlice';
import { selectCurrentUser, selectIsLogged } from '../../features/loginSlice';
import { openModal, selectIsOpen } from '../../features/modalSlice';
// import components
import Answers from './Answers';
import Countdown from './Countdown';
import Modal from '../Modal';
import Rules from './Rules';
// import style
import './style.scss';

export default function Questions() {
  const dispatch = useDispatch();

  const answersUser = useSelector((state) => state.userAnswers);
  const questionsUser = useSelector((state) => state.userQuestionsAnswered);

  const modalStatus = useSelector(selectIsOpen);

  const isLogged = useSelector(selectIsLogged);
  const user = useSelector(selectCurrentUser);
  const userId = user.id;

  const [goodAnswers, setGoodAnswers] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [displayQuiz, setDisplayQuiz] = useState(false);

  // i use useParams to get the quizId and difficultyId from the url
  const { quizId, difficultyId } = useParams();

  // i use rtk-query to get the questions and the true answers
  const { data: questions, isSuccess } = useGetQuestionsQuery({ quizId, difficultyId });
  const { data: trueAnswers } = useGetTrueAnswersQuery();
  // i use rtk-query to post the score
  const [postScore] = usePostScoreMutation();

  // i want to start the countdown when the user click on the button
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (displayQuiz) {
      const interval = countdown > 0 && setInterval(() => {
        // eslint-disable-next-line no-shadow
        setCountdown((countdown) => countdown - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [displayQuiz, countdown]);

  function handleOnClickDisplayQuiz() {
    setDisplayQuiz(true);
    window.scrollTo(0, 0);
  }

  function countGoodAnswer() {
    let count = 0;
    // i compare the user answers with the true answers
    trueAnswers.forEach((answer) => {
      // if the user answer is in the array of the true answers, i add 1 to the count
      if (answersUser.includes(answer.id.toString())) {
        count += 1;
      }
    });
    setGoodAnswers(count);
  }

  function handleSubmit() {
    countGoodAnswer();
    setIsSubmitted(true);
    dispatch(openModal());
    window.scrollTo(0, 0);
  }

  function handleChange(event) {
    // i get the name and id of the input
    const { name, id } = event.target;
    // if the user answer is in the store, i remove it ///////////////
    if (answersUser.includes(id)) {
      dispatch(removeAnswerId(id));
      dispatch(removeQuestionId(name));
    }
    // if the user answer is not in the store, i add it
    if (!questionsUser.includes(name) && !answersUser.includes(id)) {
      dispatch(questionsAnswered(name));
      dispatch(answers(id));
    }
  }

  // i want to submit the score when the countdown is over
  useEffect(() => {
    if (countdown === 0) {
      handleSubmit();
    }
  }, [countdown]);

  if (isSuccess && displayQuiz === false) {
    return (
      <Rules handleOnClickDisplayQuiz={handleOnClickDisplayQuiz} />
    );
  }

  if (isSubmitted === false && displayQuiz === true) {
    return (

      <main className="questions-page">

        <Countdown countdown={countdown} />

        <form className="questions-page__form" onSubmit={handleSubmit}>
          { questions
            && questions.map((item) => (
              <div className="questions-page__item" key={item.id}>
                <p className="questions-page__item-question">{item.content}</p>

                {((item.answers.map((answer) => (
                  <Answers
                    key={answer.id}
                    answer={answer}
                    handleChange={handleChange}
                  />
                ))))}

              </div>
            ))}
        </form>
      </main>
    );
  }

  if (modalStatus === true && isSubmitted === true) {
    return (
      <Modal text="Temps écoulé !" />
    );
  }

  if (isSubmitted === true) {
    return (

      <main className="questions-page">

        <p className="questions-page__score">{`Tu as ${goodAnswers} bonne(s) réponse(s) sur 10 !`}</p>
        {
          questions.map((item) => (
            <div className="questions-page__item" key={item.id}>
              <p className="questions-page__item-question">{item.content}</p>
              <div className="questions-page__answer">
                {
                item.answers.map((answer) => (
                  (answer.correct === true)
                    && <p className="questions-page__answer-label" key={answer.id}>{answer.content}</p>
                ))
              }
                {
                item.answers.map((answer) => (
                  (answersUser.includes(answer.id.toString()) && answer.correct === false)
                    && <p className="questions-page__answer-label--false" key={answer.id}>{answer.content}</p>
                ))
              }
                {
                item.answers.map((answer) => (
                  (answersUser.includes(answer.id.toString()) && answer.correct === true)
                    && (
                      <p className="questions-page__answer-label--true" key={answer.id}>
                        {answer.content}
                      </p>
                    )
                ))
              }
              </div>
            </div>
          ))
        }
        {
          isLogged
            ? (
              <button
                className="questions-page__submit"
                type="button"
                onClick={() => {
                  postScore({
                    score: goodAnswers,
                    quizId: Number(quizId),
                    difficultyId: Number(difficultyId),
                    userId,
                  });
                  setIsSubmitted(false);
                }}
              >
                Enregistrer mon score
              </button>
            )
            : (
              <p className="questions-page__text-bottom">
                Tu dois être connecté pour enregistrer ton score
              </p>
            )
}
        <Link to="/">
          <button className="questions-page__submit" type="button">Retour à l'accueil</button>
        </Link>
        <p className="questions-page__text-bottom">Tu peux retrouver plus de quiz sur le site d'<Link to="https://www.alsacreations.com/quiz/" target="_blank">alsa créations</Link></p>
      </main>
    );
  }
}
