import { useState } from "react";

const ArrayStateTest = () => {
	const [arr, setArr] = useState(["Test A", "Test B"]);
	const [value, setValue] = useState("");

	let isEmptyOrSpaces = (str) => {
		return str === null || str.match(/^ *$/) !== null;
	}

	let onClickAdd = () => {
		//let additionValue = document.getElementById("input-addition").value;
		if (isEmptyOrSpaces(value)) {
			alert("Must not be empty/whitespaced");
			return;
		}
		if (arr.includes(value)) {
			alert("Already exists.")
			return;
		}

		setArr(arr => [...arr, value]);
	}

	return (
		<div>
			<p></p>
			<h4>-- Component: ArrayStateTest</h4>
			<div>
				<div>Name:</div>
				<input id="input-addition" onChange={(e) => setValue(e.target.value)}></input>
				<button onClick={(e) => onClickAdd()}>Add</button>
				<p></p>
				Additions:
				<div>
					{arr.map((object, i) => <div key={i}>{object}</div>)}
				</div>
			</div>
		</div>
	);
}

export default ArrayStateTest;