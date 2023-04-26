/* eslint-disable linebreak-style */
// == Import : npm
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

// == Import : local
import { store } from 'src/store';
// Composants
import App from 'src/components/App';

// == Render
const rootReactElement = (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>
);

const root = createRoot(document.getElementById('root'));

root.render(rootReactElement);
