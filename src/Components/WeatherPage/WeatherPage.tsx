import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type WeatherType = {
    name: string;
    main: string;
    datetime: Date;
    description: string;
    sunrise: Date;
    sunset: Date;
}
const Container = styled.div``;
const WeatherContainer = styled.div``;
const TextInput = styled.input``;

function Weather() {
    const [apiData, setApiData] = useState<WeatherType>({
        name: '',
        main: '',
        datetime: new Date(),
        description: '',
        sunrise: new Date(),
        sunset: new Date()
    });
    const [stateLoc, setStateLoc] = useState('');
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    
    const onChangeText = (value: string) => setStateLoc(value);
    const getWeatherState = () => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${stateLoc}&appid=${apiKey}`;
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => setApiData({
            name: data.name,
            main: data.weather[0].main,
            datetime: new Date(data.dt),
            description: data.weather[0].description,
            sunrise: new Date(data.sys.sunrise),
            sunset: new Date(data.sys.sunset)
          }));
    };

    const onPressSubmit = () => getWeatherState();
    console.log({ apiData });
    return (
        <Container className='h-screen'>
            <h1 className='text-3xl font-bold underline'>WEATHER PAGE</h1>
            <TextInput
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={(env) => onChangeText(env.target.value) }
                value={stateLoc}
            />
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={onPressSubmit}
            >Submit</button>
            <h3>{apiData?.name}</h3>
            <h3>{apiData?.main}</h3>
            <h3>{apiData?.description}</h3>
            <h3>{apiData?.datetime.toString()}</h3>
            <h3>{apiData?.sunrise.toString()}</h3>
            <h3>{apiData?.sunset.toString()}</h3>
        </Container>
    )
}

export default Weather;