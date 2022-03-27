import axios from "axios"
import { useState, useEffect } from "react"


const SingleCountry = ({ country }) => {

    const [weather, setWeather] = useState()
    const api_key = process.env.REACT_APP_WEATHER_API_KEY

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.cca2}&units=metric&appid=${api_key}`)
            .then(res => {
                console.log(res.data)
                setWeather(res.data)
            })
    }, [api_key])

    return (
        <>
            <h2>
                {country.name.common}
            </h2>
            <p>
                capital {country.capital}
            </p>
            <p>
                population {country.population}
            </p>
            <h3>
                languages
            </h3>
            <ul>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt=""></img>
            {weather ? <>
                <h2>
                    Weather in {country.capital}
                </h2>
                <p>
                    temperature {weather.main.temp} Celcius
                </p>

                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="oops"></img>

                <p>
                    wind {weather.wind.speed} m/s
                </p>
            </>
                : ''}
        </>
    )
}


export default SingleCountry