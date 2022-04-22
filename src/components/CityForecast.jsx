import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import datas from "../assets/ForecastTestData";
import axios from "axios";

function CityForecast(props) {
	const [data, setData] = useState(datas);
	const [width, setWidth] = useState(0);
	const carousel = useRef();
	useEffect(() => {
		const url = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
		axios
			.get(url)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {});
		setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
	}, []);
	const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let date;
	let day = "";
	let hour;
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
				<motion.div
					ref={carousel}
					className="carousel"
					whileTap={{ cursor: "grabbing" }}
				>
					<motion.div
						drag="x"
						dragConstraints={{ right: 0, left: -width }}
						className="inner-carousel"
					>
						{data.list.map((item, index) => {
							return (
								<motion.div className="item" key={index}>
									{(() => {
										setAndGetDateTime(item.dt_txt);
									})()}
									<p>
										{date}
										{day}
									</p>

									<p>
										{hour}
										{indicator}
									</p>
									<img
										src={
											"https://openweathermap.org/img/wn/" +
											item.weather[0].icon +
											".png"
										}
										alt=""
									/>
									<p>{item.main.temp.toFixed()}°C</p>
								</motion.div>
							);
						})}
					</motion.div>
				</motion.div>
			)}
		</>
	);
}

export default CityForecast;
