import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import Togglable from '../Util/Togglable';

const ParentComponent = () => {
  const [variable, setVariable] = useState('');
  const [user] = useContext(UserContext);

  useEffect(() => {
    console.log('Render ParentComponent');
  }, []);

  useEffect(() => {
    console.log('User Is');
    console.log(user);
  }, [user]);

  return (
    <Togglable buttonLabel="Toggle">
      <div id="parent">
        <ChildTypeA>
          <SomeInput />
          <SomeInputStateless
            variable={variable}
            onVariableChange={({ target }) => setVariable(target.value)} />
        </ChildTypeA>
      </div>
    </Togglable>
  );
};

const ChildTypeA = (props) => {
  useEffect(() => {
    console.log('Render Child Type A');
  }, []);

  return (
    <div id="child-type-a">
      {props.children}
    </div>
  );
};

const SomeInput = () => {
  const [variable, setVariable] = useState('');

  useEffect(() => {
    console.log('Render SomeInput');
  }, []);

  return (
    <div>
      Some Input
      <input value={variable} onChange={({ target }) => setVariable(target.value)}></input>
    </div>
  );
};

const SomeInputStateless = ({ variable, onVariableChange }) => {

  useEffect(() => {
    console.log('Render SomeInput Stateless');
  }, []);

  return (
    <div>
      Some Input Stateless
      <input value={variable} onChange={onVariableChange}></input>
    </div>
  );
};

export default ParentComponent;