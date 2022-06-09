import React from "react";
import { iconUrlFromCode } from "../services/weatherServices";

function CityForecast({ items, title }) {
	return (
		<>
			{items && (
				<div className="forecast">
					<p className="forecast_title">{title}</p>
					<hr />
					<div className="carousel">
						{items.map((item, index) => {
							return (
								<div className="item" key={index}>
									<span>{item.day}</span>
									{item.time && <span>{item.time}</span>}
									<img src={iconUrlFromCode(item.icon)} alt="" />
									<span>{item.temp.toFixed()}°C</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
}

export default CityForecast;
