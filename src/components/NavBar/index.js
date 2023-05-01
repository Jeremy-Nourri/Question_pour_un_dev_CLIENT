// import npm
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import features
import { logout } from '../../features/loginSlice';
import { usePostLogoutMutation } from '../../features/API/apiSlice';
import { openModal } from '../../features/modalSlice';
// import components
import Modal from '../Modal';

import './style.scss';

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postLogout, { isSuccess }] = usePostLogoutMutation();
  const logged = useSelector((state) => state.login.isLogged);
  const modalStatus = useSelector((state) => state.modal.isOpen);

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
      navigate('/');
      dispatch(openModal());
    }
  }, [isSuccess]);

  if (modalStatus === true) {
    return (
      <Modal text="Tu es déconnecté" />
    );
  }

  return (

    <nav className="nav">

      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            to="/"
            className="nav__link nav__link--first"
          >
            Accueil

          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/quiz/HTML"
            className="nav__link"
          >
            HTML
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/quiz/CSS"
            className="nav__link"
          >
            CSS
          </NavLink>
        </li>
        {logged === true
          ? (
            <>
              <li className="nav__item">
                <NavLink
                  to="/dashboard"
                  className="nav__link"
                >
                  Mon compte
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/"
                  className="nav__link nav__link--last"
                  onClick={() => dispatch(postLogout())}
                >
                  Déconnexion
                </NavLink>
              </li>
            </>
          )
          : (
            <>
              <li className="nav__item">
                <NavLink
                  to="/login"
                  className="nav__link"
                >
                  Connexion
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/signup"
                  className="nav__link nav__link--last"
                >
                  Inscription
                </NavLink>
              </li>
            </>
          )}
      </ul>

    </nav>
  );
}
