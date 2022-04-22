import React, { useState } from "react";

function InputForm(props) {
	const [city, setCity] = useState("");

	function handleSubmit(event) {
		props.onSubmit(city);
		setCity("");
		event.preventDefault();
	}
	return (
		<div className="d-flex justify-content-center">
			<div className="searchbar search">
				<input
					className="search_input"
					type="text"
					placeholder="Enter Location"
					value={city}
					name="city"
					onChange={(event) => setCity(event.target.value)}
				></input>
				<button className="search_icon" onClick={handleSubmit}>
					<i className="fas fa-search"></i>
				</button>
			</div>
		</div>
	);
}

export default InputForm;
