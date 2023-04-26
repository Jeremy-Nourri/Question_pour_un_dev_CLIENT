// Import npm
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TbBrandCss3, TbBrandHtml5 } from "react-icons/tb";
// Import features
// Import components
// Import styles
import './style.scss';

export default function HomePage() {

  useEffect(() => {
    window.scrollTo(0,0)
  },[])

    return (
      <main className="home-page">

        <h1 className="home-page__title">Bienvenue à question pour un Dév !</h1>
        <p className="home-page__text">Teste tes connaissances sur les technologies de développement web front-end : HTML, CSS.</p>
        <p className="home-page__text">Deux niveaux te sont proposés: débutant et confirmé</p>
        <p className="home-page__text">Le quiz JavaScript est en construction, encore un peu de patience !</p>

        <div className="home-page__container">

          <NavLink className='home-page__link' to="/quiz/HTML" >
            <button className="home-page__button" type="button" aria-label="HTML">
              <TbBrandHtml5 className="home-page__button-icon" aria-hidden="true" />
              <span className='home-page__button-text' >HTML</span>
            </button>
          </NavLink>

          <NavLink className='home-page__link' to="/quiz/CSS" >
            <button className="home-page__button" type="button" aria-label="CSS">
              <TbBrandCss3 className="home-page__button-icon" aria-hidden="true" />
              <span className='home-page__button-text' >CSS</span>
            </button>
          </NavLink>

        </div>

      </main>
    );
}

