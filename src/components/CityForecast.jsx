import React, { useEffect, useState } from "react";
import axios from "axios";

function CityForecast(props) {
	const [data, setData] = useState({});

	useEffect(() => {
		const url = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
		axios
			.get(url)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {});
		// eslint-disable-next-line
	}, []);
	const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let date = "";
	let day = "";
	let hour = "";
	let indicator = "";

	function setAndGetDateTime(timeStamp) {
		let dt = new Date(timeStamp);
		date = dt.getDate();
		hour = dt.getHours();
		day = weekDay[dt.getDay()];
		if (hour >= 12) {
			hour -= 12;
			if (hour === 0) {
				hour = 12;
			}
			indicator = "pm";
		} else {
			if (hour === 0) {
				hour = 12;
			}
			indicator = "am";
		}
	}

	return (
		<>
			{data.list && (
				<div className="carousel">
					{data.list.map((item, index) => {
						return (
							<div className="item" key={index}>
								{(() => {
									setAndGetDateTime(item.dt_txt);
								})()}
								<span>{date + day}</span>
								<span>{hour + indicator}</span>
								<img
									src={
										"https://openweathermap.org/img/wn/" +
										item.weather[0].icon +
										".png"
									}
									alt=""
								/>
								<span>{item.main.temp.toFixed()}°C</span>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}

export default CityForecast;
