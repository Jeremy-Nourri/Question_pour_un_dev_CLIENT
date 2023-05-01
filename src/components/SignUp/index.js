/* eslint-disable jsx-a11y/label-has-associated-control */
// import npm
import { useState, useEffect } from 'react';
import { CgDanger } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
// import features
import { usePostSignupMutation } from '../../features/API/apiSlice';
import { login } from '../../features/loginSlice';
// import components
import Loader from '../Loader';
import Avatar from './Avatar';

import './style.scss';

export default function SignUp() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const [postSignup, { data: user, isSuccess, isLoading }] = usePostSignupMutation();

  console.log(user);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (email === emailConfirm && password === passwordConfirm) {
      postSignup({
        email, password, nickname, passwordConfirm,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(login(user));
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (isSuccess) {
    return (
      <main>
        <Avatar />
      </main>
    );
  }

  return (
    <main className="signup">

      <h1 className="signup__title">Inscription</h1>

      <form className="signup__form" onSubmit={handleSubmit}>
        <label className="signup__form-label" htmlFor="nickname">Pseudo</label>
        <input
          className="signup__form-input"
          type="text"
          id="nickname"
          name="nickname"
          autoComplete="nickname"
          value={nickname}
          required
          onChange={(evt) => {
            setNickname(evt.target.value);
          }}
        />
        <label className="signup__form-label" htmlFor="email">Email</label>
        <input
          className="signup__form-input"
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
        <label className="signup__form-label" htmlFor="emailConfirm">Confirmer l'email</label>
        <input
          className="signup__form-input"
          type="emailConfirm"
          id="emailConfirm"
          name="email"
          value={emailConfirm}
          autoComplete="email"
          required
          onChange={(evt) => {
            setEmailConfirm(evt.target.value);
          }}
        />
        <label className="signup__form-label" htmlFor="password">Mot de passe</label>
        <input
          className="signup__form-input"
          type="password"
          id="password"
          name="password"
          value={password}
          autoComplete="new-password"
          required
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
        />
        <label className="signup__form-label" htmlFor="passwordConfirm">Confirmer le mot de passe</label>
        <input
          className="signup__form-input"
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          value={passwordConfirm}
          autoComplete="new-password"
          required
          onChange={(evt) => {
            setPasswordConfirm(evt.target.value);
          }}
        />
        {email === emailConfirm && password === passwordConfirm
          && <input className="signup__form-button" type="submit" value="S'inscrire" />}

      </form>

      {email !== emailConfirm
        && (
          <div className="signup__error">
            <CgDanger className="signup__error-icon" />
            <p className="signup__error-text">Les emails ne sont pas identiques</p>
          </div>
        )}
      {password !== passwordConfirm
        && (
          <div className="signup__error">
            <CgDanger className="signup__error-icon" />
            <p className="signup__error-text">Les mots de passe ne sont pas identiques</p>
          </div>
        )}

    </main>

  );
}
