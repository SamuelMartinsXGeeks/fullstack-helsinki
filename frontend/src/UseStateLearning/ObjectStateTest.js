import { useState } from 'react';

const ObjectStateTest = () => {
  const [myObject, setMyObject] = useState({ name: '', age: 0 });

  let onNameChange = (e) => {
    let updatedObject = myObject;
    updatedObject.name = e.target.value;
    setMyObject(myObject => ({ ...myObject, ...updatedObject }));
  };

  let onAgeChange = (e) => {
    let str = e.target.value;
    if (!str) {
      return;
    }
    let updatedObject = myObject;
    updatedObject.age = +e.target.value;
    setMyObject(myObject => ({ ...myObject, ...updatedObject }));
  };

  return (
    <div>
      <p></p>
      <h4>-- Component: ObjectStateTest</h4>
      <div>
				Name:
        <input value={myObject.name} onChange={(e) => onNameChange(e)}></input>
        <br></br>
				Age:
        <input type="number" value={myObject.age} onChange={(e) => onAgeChange(e)}></input>
      </div>
    </div>
  );
};

export default ObjectStateTest;