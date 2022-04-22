import React from "react";

function CityDetail(props) {
	return (
		<>
			{props.data.name !== undefined && (
				<div className="bottom">
					<div className="feels">
						{props.data.name && (
							<p className="bold">{props.data.main.feels_like.toFixed()}°C</p>
						)}
						<p>Feels Like</p>
					</div>
					<div className="humidity">
						{props.data.main && (
							<p className="bold">{props.data.main.humidity}%</p>
						)}
						<p>Humidity</p>
					</div>
					<div className="wind">
						{props.data.wind && (
							<p className="bold">{props.data.wind.speed}km/h</p>
						)}
						<p>Wind Speed</p>
					</div>
				</div>
			)}
		</>
	);
}

export default CityDetail;
