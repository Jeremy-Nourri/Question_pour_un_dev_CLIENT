// import npm
import { GiTimeBomb } from "react-icons/gi";

import '../style.scss';

export default function Countdown ({ countdown }) {
  return (
    <div className="questions-page__countdown">

    <GiTimeBomb className="questions-page__countdown-icon" />
    <p className="questions-page__countdown-time">{countdown} s</p>
  </div>
  );
}

