import React, { useState, useEffect } from "react";
import InputForm from "./InputForm";
import WeatherTop from "./WeatherTop";
import CityDetail from "./CityDetail";
import CityForecast from "./CityForecast";
import getFormattedWeatherData, {
	getFormattedWeatherDataFromLatnLon,
} from "../services/weatherServices";

function App() {
	const [data, setData] = useState({});
	const [forecast, setForecast] = useState(false);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			if (position.coords.latitude) {
				setLoader(true);
			}
		});
		if (!("geolocation" in navigator)) {
			alert("Location is not available! Please turn on location services.");
		} else {
			navigator.geolocation.getCurrentPosition((position) => {
				getFormattedWeatherDataFromLatnLon(
					position.coords.latitude,
					position.coords.longitude
				).then((data) => {
					setLoader(false);
					setData(data);
				});
			});
		}
	}, []);

	function searchLocation(city) {
		setLoader(true);
		getFormattedWeatherData({ q: city }, "metric").then((data) => {
			setLoader(false);
			setData(data);
		});
		setForecast(false);
	}

	return (
		<div className="app">
			<InputForm onSubmit={searchLocation} />
			{loader && <div class="spinner"></div>}
			{data && (
				<div className="container">
					<WeatherTop data={data} />
					<CityDetail data={data} />
					{data.name && (
						<button
							className="forecast-button"
							onClick={(event) => {
								setForecast(true);
							}}
						>
							Weather Forecast
						</button>
					)}
					{forecast && (
						<>
							<CityForecast title="Daily Forecast" items={data.daily} />
							<br />
							<br />
							<CityForecast title="Horly Forecast" items={data.hourly} />
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default App;
