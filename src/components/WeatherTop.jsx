import React from "react";
import { formatToLocalTime } from "../services/weatherServices";

function WeatherTop({
	data: { name, dt, details, icon, temp, temp_min, temp_max, timezone },
}) {
	return (
		<div className="top">
			<div className="left-side">
				<div className="location">
					<p>{name}</p>
				</div>
				<div className="temperature">{temp && <h1>{temp.toFixed()}°C</h1>}</div>
				{temp_max && (
					<div className="min-max-temp row">
						<p className="col">H:{temp_max.toFixed()}°C</p>
						<p className="col">L:{temp_min.toFixed()}°C</p>
					</div>
				)}
				<div>{dt && <p>{formatToLocalTime(dt, timezone)}</p>}</div>
			</div>

			<div className="right-side">
				{icon && (
					<figure>
						<img
							src={"http://openweathermap.org/img/wn/" + icon + "@2x.png"}
							alt=""
						/>
						<figcaption className="description">
							{details && <p>{details}</p>}
						</figcaption>
					</figure>
				)}
			</div>
		</div>
	);
}

export default WeatherTop;
