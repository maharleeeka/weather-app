import React, { useState } from 'react';
import { Button, Container, CurrentLocation, DateContainer, SearchContainer, SunContainer, SunIcon, Temperature, TextInput, WeatherIcon, WeatherState, WeatherStatus,  } from './Elements';
import moment from 'moment';
import sunrise from '../../assets/sunrise.png';

type WeatherType = {
  name: string;
  main: string;
  datetime: Date;
  description: string;
  sunrise: number;
  sunset: number;
  temp: string;
  icon: string;
};

function Weather() {
  const [apiData, setApiData] = useState<WeatherType>({
    name: '',
    main: '',
    datetime: new Date(),
    description: '',
    sunrise: 0,
    sunset: 0,
    temp: '',
    icon: ''
  });
  const [stateLoc, setStateLoc] = useState('');
  const [inputValue, setInputValue] = useState('');
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const onChangeText = (value: string) => {
    setInputValue(value);
  };
  const getWeatherState = () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setApiData({
          name: data.name,
          main: data.weather[0].main,
          datetime: new Date(data.dt),
          description: data.weather[0].description,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: kelvinToFarenheit(data.main.temp),
          icon: data.weather[0].icon,
        });
        setStateLoc(inputValue);
        setInputValue('');
        }
      );
  };
  const kelvinToFarenheit = (k: number) => {
    return (k - 273.15).toFixed(2);
  };
  const onPressSubmit = () => {
    getWeatherState();
  };

  const renderData = () => {
    return apiData.main !== '' ? (
      <>
        <CurrentLocation
           className='text-5xl text-center p-5 capitalize'
        >
          {stateLoc}
        </CurrentLocation>
        <WeatherStatus
          className='text-2xl text-center'
        >{apiData.main}
        <h4 className='text-sm'>{apiData?.description}</h4>
        <WeatherIcon
          className='m-auto'
          src={`http://openweathermap.org/img/wn/${apiData?.icon}@2x.png`} />
        </WeatherStatus>
        <Temperature
          className='m-auto text-4xl text-center'
        >{apiData?.temp} ºC</Temperature>
        <SunContainer
          className='flex flex-row justify-evenly py-5'
        >
          <div
            className='flex flex-row items-center'
          >
            <img src={require('../../assets/sunrise.png')} alt="" width={30} height={30}/>
            {moment.unix(apiData.sunrise).format('HH:mm').toString()} AM
          </div>
          <div
            className='flex flex-row items-center'
          >
          <img src={require('../../assets/sunset.png')} alt="" width={30} height={30}/>
            {moment.unix(apiData.sunset).format('HH:mm').toString()} PM
          </div>
        </SunContainer>
      </>
    ) : null
  }
  return (
    <Container
      className="h-screen bg-gray-100 py-12"
    >
      <WeatherState
        className="m-auto py-12 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <SearchContainer
          className='flex flex-row justify-evenly w-full py-2'
        >
          <TextInput
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(env) => onChangeText(env.target.value)}
            value={inputValue}
          />
          <Button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onPressSubmit}
          >
            Check
          </Button>
        </SearchContainer>
        <DateContainer
          className='flex flex-row justify-around w-full'
        >
          <div>{moment().format('dddd')}</div>
          <div>{moment().format("MMM Do YY")}</div>
        </DateContainer>
        {renderData()}
      </WeatherState>
    </Container>
  );
}

export default Weather;
