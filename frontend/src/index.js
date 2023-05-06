import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from 'context/AppProvider';
import ErrorBoundaryFunctional from 'error/ErrorBoundaryFunctional';
import ErrorPage from 'error/ErrorPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AppProvider>
        <BrowserRouter>
          <ErrorBoundaryFunctional fallback={ErrorPage}>
            <App />
          </ErrorBoundaryFunctional>
        </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
