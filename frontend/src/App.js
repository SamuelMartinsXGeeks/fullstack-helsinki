import './App.css';
import Notes from './Notes/Notes';
import Login from './Login/Login';
import UserProvider from './Contexts/UserContext';
import { StrictMode } from 'react';
import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
    <StrictMode>
      <div>
        <ToastContainer />
        <UserProvider>
          <div>
            <Login />
            <Notes />
          </div>
        </UserProvider>
      </div>
    </StrictMode>
  );
};

export default App;
