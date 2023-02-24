import './App.css';
import CustomerConsole from './components/CustomerConsole';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
      <div className="root">
        <CssBaseline />
        {/* <Navigate to='/customerConsole' /> */}

        <Routes>
          <Route path='/' element={<CustomerConsole />}></Route> {/* REPLACE WITH LOGIN PAGE */}
          <Route path='/customerConsole' element={<CustomerConsole />}></Route>
        </Routes>
      </div>
  );
}

export default App;
