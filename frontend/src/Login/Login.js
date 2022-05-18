import { useEffect, useState, useContext } from 'react';
import loginService from '../Services/login';
import Togglable from '../Util/Togglable';
import { UserContext } from '../Contexts/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './LoginForm';

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => { if (user) { return true; } return false; });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const dbUser = await loginService.login({
        username, password,
      });
      setUser(dbUser);
      setUsername('');
      setPassword('');

      toast.success('Login Successfull');
      setIsLoggedIn(true);

      //Store user data.
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(dbUser));

    } catch (exception) {
      toast.error('Login error.');
      console.log(exception);
      setTimeout(() => {
      }, 5000);
    }
  };

  useEffect(() => {
    setIsLoggedIn(() => {
      if (user) {
        return true;
      } return false;
    });
  }, [user]);

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
  };

  return (
    <div>
      <AutoLoginComponent />
      {
        !isLoggedIn
          ?
          <Togglable buttonLabel='Sign In'>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
          : <button onClick={handleLogout}>Sign Out</button>
      }
    </div>
  );
};

const AutoLoginComponent = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      toast.success('Logged in automatically.');
    }
  }, []);
};

export default Login;