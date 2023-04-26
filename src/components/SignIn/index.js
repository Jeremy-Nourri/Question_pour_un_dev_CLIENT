// import npm
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TbFaceIdError } from "react-icons/tb";
// import features
import { usePostLoginMutation } from '../../features/API/apiSlice';
import { login } from '../../features/loginSlice';
// import components
import Loader from '../Loader';

import './style.scss';

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.login.isLogged);

  const [postLogin, { data: user, isSuccess, isError, isLoading }] = usePostLoginMutation();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
      postLogin({ email, password });
      dispatch(login(user));
      setEmail('');
      setPassword('');
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(login(user));
      navigate('/dashboard');
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <Loader />
    );
  }
  if (isLogged === false) {
    return (
      <main className="login">
        <h1 className="login__title">Connexion</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__form-label" htmlFor="email">Email</label>
          <input
            className="login__form-input"
            type="email"
            id="email"
            name="email"
            value={email}
            autoComplete="email"
            required
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}

          />
          <label className="login__form-label" htmlFor="password">Mot de passe</label>
          <input
            className="login__form-input"
            type="password"
            id="password"
            name="password"
            value={password}
            autoComplete="current-password"
            required
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}

          />
          <button className="login__form-button" type="submit">Se connecter</button>
        </form>

        {isError && (
          <div className="login__error">
            <TbFaceIdError className="login__error-icon" />
            <p className="login__error-text">Email ou mot de passe incorrect</p>
          </div>
        )}

      </main>
    );
 }
}
