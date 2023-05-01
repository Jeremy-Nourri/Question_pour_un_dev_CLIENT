// import npm
import propTypes from 'prop-types';

import '../style.scss';

export default function Rules({ handleOnClickDisplayQuiz }) {
  return (
    <main className="questions-page">

      <h2 className="questions-page__title">Règle du jeu</h2>
      <p className="questions-page__intro questions-page__intro--rules">Tu as 1 minute et 30 secondes pour répondre à 10 questions.</p>
      <p className="questions-page__intro questions-page__intro--rules">Lors de chaque question, plusieurs réponses te seront proposées. Une seule d'entre elles est vrai. À toi de choisir la bonne !</p>
      <p className="questions-page__intro questions-page__intro--rules">Une fois le temps écoulé, tes réponses seront vérifiées et ton score calculé.</p>
      <p className="questions-page__intro questions-page__intro--rules">Si tu souhaites enregistrer ton score, connectes toi avant de commencer le quiz.</p>

      <button
        className="questions-page__submit"
        type="button"
        aria-label="Lancer le quiz"
        onClick={handleOnClickDisplayQuiz}
      >
        Lancer le quiz
      </button>

    </main>
  );
}

Rules.propTypes = {
  handleOnClickDisplayQuiz: propTypes.func.isRequired,
};
