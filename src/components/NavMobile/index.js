// import npm
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GoThreeBars, GoX } from "react-icons/go";
// import features
import { logout } from '../../features/loginSlice';
import { usePostLogoutMutation } from '../../features/API/apiSlice';
import { openModal } from '../../features/modalSlice';
// import components
import Modal from '../Modal';

import './style.scss';

export default function () {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postLogout, { isSuccess }] = usePostLogoutMutation();
  const logged = useSelector((state) => state.login.isLogged);
  const modalStatus = useSelector((state) => state.modal.isOpen);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
      dispatch(openModal());
      setOpenNav(false);
      navigate('/');
    }
  }, [isSuccess]);


  const navClasses = openNav === true ? 'nav-mobile nav-mobile__open' : 'nav-mobile nav-mobile__close';

  if (modalStatus === true) {
    return (
      <Modal text='Tu es déconnecté' />
    );
  }

  return (
    <>
      {openNav === false 
        ? 
          ( <GoThreeBars className='nav-mobile__icon nav-mobile__icon--open' onClick={() => setOpenNav(true)} /> )
        :
          ( <GoX className='nav-mobile__icon' onClick={() => (setOpenNav(false))} /> )
      }

      <nav className={navClasses}>

        <NavLink className='nav-mobile__link' to="/" onClick={() => setOpenNav(false)}>
          Accueil
        </NavLink>
        <NavLink className='nav-mobile__link' to="/quiz/HTML" onClick={() => setOpenNav(false)}>
          HTML
        </NavLink>
        <NavLink className='nav-mobile__link' to="/quiz/CSS" onClick={() => setOpenNav(false)}>
          CSS
        </NavLink>
        {logged === true 
          ? 
            (
              <>
                <NavLink className='nav-mobile__link' to="/dashboard" onClick={() => setOpenNav(false)}>
                  Tableau de bord
                </NavLink>
                <NavLink className='nav-mobile__link' to="/" onClick={() => postLogout()}>
                  Se déconnecter
                </NavLink>
              </>
            ) 
          : 
            (
              <>
                <NavLink className='nav-mobile__link' to="/login" onClick={() => setOpenNav(false)}>
                  Se connecter
                </NavLink>
                <NavLink className='nav-mobile__link' to="/signup" onClick={() => setOpenNav(false)}>
                  S'inscrire
                </NavLink>
              </>
            )
        }

      </nav>
    </>
  );
}


