import './App.css';
import CustomerConsole from './components/CustomerConsole';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';

function App() {
  return (
      // <div className={classes.root}>
      <>
        <CssBaseline />

        <Routes>
          <Route path='/login' element={<LoginPage />}></Route> {/* REPLACE WITH LOGIN PAGE */}
          <Route path='/customerConsole' element={<CustomerConsole />}></Route>
        </Routes>
        {/* <Navigate to='/login' /> */}
      </>
      // </div>
  );
}

export default App;
