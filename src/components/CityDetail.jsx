import React from "react";

function CityDetail({ data: { name, feels_like, humidity, speed } }) {
	return (
		<>
			{name !== undefined && (
				<div className="bottom">
					<div className="feels">
						{name && <p className="bold">{feels_like.toFixed()}°C</p>}
						<p>Feels Like</p>
					</div>
					<div className="humidity">
						{humidity && <p className="bold">{humidity}%</p>}
						<p>Humidity</p>
					</div>
					<div className="wind">
						{speed && <p className="bold">{speed}km/h</p>}
						<p>Wind Speed</p>
					</div>
				</div>
			)}
		</>
	);
}

export default CityDetail;
