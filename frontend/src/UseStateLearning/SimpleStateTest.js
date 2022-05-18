import { useState } from 'react';

const SimpleStateTest = () => {

  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p></p>
      <h4>-- Component: SimpleStateTest</h4>
      <div>
        Counter: {counter}
        <div>
          <button onClick={() => setCounter(+counter + 1)}>Increase</button>
        </div>
      </div>
    </div>
  );
};

export default SimpleStateTest;