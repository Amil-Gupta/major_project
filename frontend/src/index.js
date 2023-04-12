import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from 'context/AppProvider';
import ErrorBoundaryFunctional from 'error/ErrorBoundaryFunctional';
import ErrorPage from 'error/ErrorPage';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AppProvider>
        <BrowserRouter>
          <ErrorBoundaryFunctional fallback={<ErrorPage />}>
            <App />
          </ErrorBoundaryFunctional>
        </BrowserRouter>
    </AppProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
