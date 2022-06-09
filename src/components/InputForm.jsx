import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function InputForm(props) {
	const [city, setCity] = useState("");

	function handleSubmit(event) {
		props.onSubmit(city);
		setCity("");
		event.preventDefault();
	}
	return (
		<div className="search">
			<input
				className="input"
				type="text"
				name="city"
				placeholder="Enter Location"
				value={city}
				onChange={(event) => setCity(event.target.value)}
			/>

			<SearchIcon className="search_icon" onClick={handleSubmit} />
		</div>
	);
}

export default InputForm;
