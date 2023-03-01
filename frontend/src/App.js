import './App.css';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from 'context/AuthProvider';
import { CircularProgress } from '@mui/material';

const RootPage = React.lazy(()=>import('components/RootPage'));
const LoginPage = React.lazy(()=>import('components/LoginPage'));
const SignUpPage = React.lazy(()=>import('components/SignUpPage'));
const AdminConsole = React.lazy(()=>import('components/AdminConsole'));
const CustomerConsole = React.lazy(()=>import('components/CustomerConsole'));
// import RootPage from 'components/RootPage';
// import LoginPage from './components/LoginPage';
// import SignUpPage from 'components/SignUpPage';
// import AdminConsole from 'components/AdminConsole';
// import CustomerConsole from './components/CustomerConsole';

function App() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(! auth?.token){

      //TO TEST THE ROOT PAGE RENDERING
      // const timer = async()=>{
      //   function timeout(delay) {
      //     return new Promise( res => setTimeout(res, delay) );
      //   }
  
      //   await timeout(10000);

      //   navigate('/login', {replace: true});
      // }
      // timer();

      //NORMAL REDIRECT
      navigate('/login', {replace: true});

    }
  },[]);

  return (
      // <div className={classes.root}>
      <>
        <CssBaseline />

        <Routes>
          <Route path='/' element={
            <React.Suspense fallback={<CircularProgress />}>
              <RootPage />
            </React.Suspense>
          } />
          <Route path='/login' element={
            <React.Suspense fallback={<CircularProgress />}>
              <LoginPage />
            </React.Suspense>
          } />
          <Route path='/signup' element={
            <React.Suspense fallback={<CircularProgress />}>
              <SignUpPage />
            </React.Suspense>
          } />
          <Route path='/customerConsole/*' element={
            <React.Suspense fallback={<CircularProgress />}>
              <CustomerConsole />
            </React.Suspense>
          } />
          <Route path='/adminConsole/*' element={
            <React.Suspense fallback={<CircularProgress />}>
              <AdminConsole />
            </React.Suspense>
          } />
        </Routes>

        {/* <Navigate to='/login' /> */}
      </>
      // </div>
  );
}

export default App;
