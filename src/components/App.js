import React, { useState, useEffect } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import WeatherTop from "./WeatherTop";
import CityDetail from "./CityDetail";
import CityForecast from "./CityForecast";

function App() {
	const [data, setData] = useState({});
	const [forecast, setForecast] = useState(false);
	const [location, setLocation] = useState("");
	const [coordinates, setCoordinates] = useState({
		lat: "",
		lon: "",
	});

	useEffect(() => {
		if (!("geolocation" in navigator)) {
			alert("Location is not available! Please turn on location services.");
		} else {
			navigator.geolocation.getCurrentPosition((position) => {
				setCoordinates({
					lat: position.coords.latitude,
					lon: position.coords.longitude,
				});
			});
		}
	}, []);
	useEffect(() => {
		if (coordinates.lat.length && coordinates.lon.length) {
			getWeather();
		}
	}, [coordinates]);

	const urlForLat_long = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.REACT_APP_API_KEY}`;
	const urlWithLat_Long = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

	function getWeather() {
		axios
			.get(urlWithLat_Long)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {});
	}

	function getCoordinatesFromCityName() {
		axios
			.get(urlForLat_long)
			.then((response) => {
				setCoordinates({
					lat: response.data[0].lat,
					lon: response.data[0].lon,
				});
			})
			.catch((error) => {
				alert("City not found");
			});
	}

	function searchLocation(city) {
		setLocation(city);
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
		axios
			.get(url)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				getCoordinatesFromCityName();
			});
		setLocation("");
		setForecast(false);
	}

	return (
		<div className="app">
			<InputForm onSubmit={searchLocation} />
			<div className="container">
				<WeatherTop data={data} />
				<CityDetail data={data} />
				{data.main && (
					<button
						className="forecast-button"
						onClick={(event) => {
							setForecast(true);
						}}
					>
						Weather Forecast
					</button>
				)}
				{forecast && <CityForecast city={data.name} />}
			</div>
		</div>
	);
}

export default App;
