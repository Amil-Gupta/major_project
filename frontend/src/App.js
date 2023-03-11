import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from 'context/AuthProvider';
// import { CircularProgress } from '@mui/material';
import FallBackScreen from 'components/FallBackScreen';
import LoadingOverlay from 'components/LoadingOverlay';

const RootPage = React.lazy(()=>import('components/RootPage'));
const LoginPage = React.lazy(()=>import('components/LoginPage'));
const SignUpPage = React.lazy(()=>import('components/SignUpPage'));
const AdminConsole = React.lazy(()=>import('components/AdminConsole'));
const CustomerConsole = React.lazy(
  // TO TEST FALLBACK SCREEN
  // ()=>{
  // return Promise.all([
  //   import('components/CustomerConsole'),
  //   new Promise(resolve => setTimeout(resolve, 1000))
  // ]
  // ).then(([moduleExports]) => moduleExports)
  // }
  
  //NORMAL IMPORT
  ()=>import('components/CustomerConsole')
);
// import RootPage from 'components/RootPage';
// import LoginPage from './components/LoginPage';
// import SignUpPage from 'components/SignUpPage';
// import AdminConsole from 'components/AdminConsole';
// import CustomerConsole from './components/CustomerConsole';

function App() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingColor, setLoadingColor] = useState('blue');

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

        <LoadingOverlay show={loading} color={loadingColor} />

        <Routes>
          <Route path='/' element={
            <React.Suspense fallback={<FallBackScreen />}>
              <RootPage setLoading={setLoading} setLoadingColor={setLoadingColor} />
            </React.Suspense>
          } />
          <Route path='/login' element={
            <React.Suspense fallback={<FallBackScreen />}>
              <LoginPage setLoading={setLoading} setLoadingColor={setLoadingColor} />
            </React.Suspense>
          } />
          <Route path='/signup' element={
            <React.Suspense fallback={<FallBackScreen />}>
              <SignUpPage setLoading={setLoading} setLoadingColor={setLoadingColor} />
            </React.Suspense>
          } />
          <Route path='/customerConsole/*' element={
            <React.Suspense fallback={<FallBackScreen />}>
              <CustomerConsole setLoading={setLoading} setLoadingColor={setLoadingColor} />
            </React.Suspense>
          } />
          <Route path='/adminConsole/*' element={
            <React.Suspense fallback={<FallBackScreen />}>
              <AdminConsole setLoading={setLoading} setLoadingColor={setLoadingColor} />
            </React.Suspense>
          } />
        </Routes>

        {/* <Navigate to='/login' /> */}
      </>
      // </div>
  );
}

export default App;
