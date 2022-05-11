import './App.css';
import ArrayStateTest from './UseStateLearning/ArrayStateTest';
import ObjectStateTest from './UseStateLearning/ObjectStateTest';
import SimpleStateTest from './UseStateLearning/SimpleStateTest';
import Notes from './Notes/Notes';

let counterNumber = 0;

const App = () => {

  return (
    <div>
      <Hello name="Sam" age={24} />
      <SimpleStateTest counter={counterNumber} />
      <ObjectStateTest />
      <ArrayStateTest />
      <Notes />
    </div>
  );
}

const Hello = (props) => {

  return (
    <div>
      <h4>-- Component: Hello</h4>
      <p> Hello {props.name}, you are {props.age} years old.</p>
    </div>
  )
}
export default App;

export { App, Hello };
