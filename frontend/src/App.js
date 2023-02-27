import './App.css';
import CustomerConsole from './components/CustomerConsole';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import { useContext, useEffect } from 'react';
import AuthContext from 'context/AuthProvider';

function App() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(! auth?.token){
      navigate('/login');
    }
  },[]);

  return (
      // <div className={classes.root}>
      <>
        <CssBaseline />

        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/customerConsole' element={<CustomerConsole />}></Route>
        </Routes>

        {/* <Navigate to='/login' /> */}
      </>
      // </div>
  );
}

export default App;
