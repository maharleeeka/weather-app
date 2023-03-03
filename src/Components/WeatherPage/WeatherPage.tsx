import React, { useState } from 'react';
import {
  Button,
  Container,
  CurrentLocation,
  DateContainer,
  SearchContainer,
  SunContainer,
  Temperature,
  TextInput,
  WeatherIcon,
  WeatherState,
  WeatherStatus,
  DateText,
  DayText
} from './elements';
import moment from 'moment';
// import sunrise from '../../assets/sunrise.png';

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

export default function Weather() {
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
          icon: data.weather[0].icon
        });
        setStateLoc(inputValue);
        setInputValue('');
      });
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
        <CurrentLocation className="text-5xl text-center p-5 capitalize">
          {stateLoc}
        </CurrentLocation>
        <WeatherStatus className="text-2xl text-center">
          {apiData.main}
          <h4 className="text-sm">{apiData?.description}</h4>
          <WeatherIcon
            className="m-auto"
            src={`http://openweathermap.org/img/wn/${apiData?.icon}@2x.png`}
          />
        </WeatherStatus>
        <Temperature className="m-auto text-4xl text-center">{apiData?.temp} ºC</Temperature>
        <SunContainer className="flex flex-row justify-evenly py-5">
          <div className="flex flex-row items-center">
            <img src={require('../../assets/sunrise.png')} alt="" width={30} height={30} />
            {moment.unix(apiData.sunrise).format('HH:mm').toString()} AM
          </div>
          <div className="flex flex-row items-center">
            <img src={require('../../assets/sunset.png')} alt="" width={30} height={30} />
            {moment.unix(apiData.sunset).format('HH:mm').toString()} PM
          </div>
        </SunContainer>
      </>
    ) : null;
  };
  return (
    <Container className="h-screen py-10">
      <WeatherState className="m-auto py-10">
        <SearchContainer className="flex flex-row justify-evenly w-full px-3">
          <TextInput
            className="border border-gray-300 text-gray-900 text-sm rounded-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(env) => onChangeText(env.target.value)}
            value={inputValue}
          />
          <Button
            type="submit"
            className="text-white rounded-full focus:outline-none text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={onPressSubmit}
          >
            SEARCH
          </Button>
        </SearchContainer>
        <DateContainer className="flex flex-row justify-around w-full py-5">
          <DayText className="text-white">{moment().format('dddd')}</DayText>
          <DateText className="text-white">{moment().format('MMM Do YY')}</DateText>
        </DateContainer>
        {renderData()}
      </WeatherState>
    </Container>
  );
}
