import React from "react";

function WeatherTop(props) {
	var objToday = new Date(),
		weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		dayOfWeek = weekday[objToday.getDay()],
		dayOfMonth = objToday.getDate(),
		months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		curMonth = months[objToday.getMonth()],
		curHour =
			objToday.getHours() > 12
				? objToday.getHours() - 12
				: objToday.getHours() < 10
				? "0" + objToday.getHours()
				: objToday.getHours(),
		curMinute =
			objToday.getMinutes() < 10
				? "0" + objToday.getMinutes()
				: objToday.getMinutes(),
		curMeridiem = objToday.getHours() > 12 ? "pm" : "am";
	var today =
		curHour +
		":" +
		curMinute +
		curMeridiem +
		", " +
		dayOfWeek +
		" " +
		dayOfMonth +
		curMonth;

	return (
		<div className="top">
			<div className="left-side">
				<div className="location">
					<p>{props.data.name}</p>
				</div>
				<div className="temperature">
					{props.data.main && <h1>{props.data.main.temp_max.toFixed()}°C</h1>}
				</div>
				{props.data.main && (
					<div className="min-max-temp row">
						<p className="col">H:{props.data.main.temp_max.toFixed()}°C</p>
						<p className="col">L:{props.data.main.temp_min.toFixed()}°C</p>
					</div>
				)}
				<div>{props.data.main && <p>{today}</p>}</div>
			</div>

			<div className="right-side">
				{props.data.weather && (
					<figure>
						<img
							src={
								"http://openweathermap.org/img/wn/" +
								props.data.weather[0].icon +
								"@2x.png"
							}
							alt=""
						/>
						<figcaption className="description">
							{props.data.weather && <p>{props.data.weather[0].main}</p>}
						</figcaption>
					</figure>
				)}
			</div>
		</div>
	);
}

export default WeatherTop;
