import './App.css';
import CustomerConsole from './components/CustomerConsole';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import { useContext, useEffect } from 'react';
import AuthContext from 'context/AuthProvider';
import RootPage from 'components/RootPage';

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
          <Route path='/' element={<RootPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/customerConsole' element={<CustomerConsole />}></Route>
        </Routes>

        {/* <Navigate to='/login' /> */}
      </>
      // </div>
  );
}

export default App;
