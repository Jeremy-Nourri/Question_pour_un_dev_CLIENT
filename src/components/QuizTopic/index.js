// import npm
import { NavLink, useParams } from 'react-router-dom';
import { FaTemperatureLow, FaTemperatureHigh  } from "react-icons/fa";
// import features
import { useGetQuizByTopicQuery } from '../../features/API/apiSlice';
// import components
import Loader from '../Loader';
// import style
import './style.scss';

export default function QuizTopic () {

  const { topic } = useParams();
  // i use useGetQuizQuery to get the quiz from the API
  const { data: quiz, isLoading, isSuccess } = useGetQuizByTopicQuery(topic);

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) {
    return (

      <main className="quiz-topic">
        {quiz && 
          <>
            <h1 className="quiz-topic__title">Quiz {quiz.topic}</h1>
            <img className="quiz-topic__image" src={quiz.image} alt={quiz.topic} />
            <p className="quiz-topic__text">Choisis un niveau de difficulté</p>
            <div className="quiz-topic__container-level">
              <NavLink
                to={`/question/${quiz.id}/1`}
                className="quiz-topic__link"
              >
                <button className="quiz-topic__level quiz-topic__level--low" aria-label="Niveau débutant">
                  <span>Débutant</span>
                  <FaTemperatureLow className="quiz-topic__icon" aria-hidden="true" />
                </button>
              </NavLink><NavLink
                to={`/question/${quiz.id}/2`}
                className="quiz-topic__link"
              >
                <button className="quiz-topic__level quiz-topic__level--high" aria-label="Niveau confirmé">
                  <span>Confirmé</span>
                  <FaTemperatureHigh className="quiz-topic__icon" aria-hidden="true" />
                </button>
              </NavLink>
            </div>
          </>
        }
      </main>
    );
  }
}
