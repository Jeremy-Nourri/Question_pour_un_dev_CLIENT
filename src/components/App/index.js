// == Import npm
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// == Import features
import { selectIsLogged } from '../../features/loginSlice';
// == Import components
import Header from '../Header';
import NavMobile from '../NavMobile';
import NavBar from '../NavBar';
import HomePage from '../HomePage';
import QuizTopic from '../QuizTopic';
import Questions from '../Questions';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Dashboard from '../Dashboard';
import Error404 from '../Error404';
import Footer from '../Footer';
// == Import styles
import './styles.scss';

// == Composant
function App() {

  const isLogged = useSelector(selectIsLogged);

  return (
    <div className="app">
      <Header />
      <NavBar />
      <NavMobile />
      <Routes>
        <Route
          path="/"
          element={(
            <HomePage />
          )}
        />
        <Route
          path="/quiz/:topic"
          element={(
            <QuizTopic />
          )}
        />
        <Route
          path="/question/:quizId/:difficultyId"
          element={(
            <Questions />
          )}
        />
        <Route
          path="/signup"
          element={(
            <SignUp />
          )}
        />
        <Route
          path="/login" 
          element={(
            <SignIn />
          )}
        />
        <Route
          path="/dashboard"
          element={(
            isLogged === true ? <Dashboard /> : <SignIn />
          )}
        />
        <Route
          path="*"
          element={(
            <Error404 />
          )}
        />
      </Routes>
      <Footer />
    </div>
  );
}

// == Export
export default App;
