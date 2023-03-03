import styled from 'styled-components';
import { device } from '../../constants/device';

export const Container = styled.div`
  background-color: #41beb3;
  h3 {
    color: black;
  }
`;
export const WeatherState = styled.div`
  width: 400px;
  height: 65vh;
  background-color: #67CBC2;

  @media ${device.mobileS} { 
    max-width: 80%;
  }

`;
export const SearchContainer = styled.div``;
export const TextInput = styled.input``;
export const Button = styled.button`
  background-color: #41BEB3;

  :hover {
    background-color: #41BEB3
  }
`;
export const CurrentDateTime = styled.div``;
export const CurrentLocation = styled.div``;
export const WeatherIcon = styled.img``;
export const WeatherStatus = styled.div``;
export const DateContainer = styled.div``;
export const Temperature = styled.div``;
export const SunContainer = styled.div``;
export const DayText = styled.div``;
export const DateText = styled.div``;
export const SunIcon = styled.div<{ icon: string }>`
  background: url(${(props) => props.icon});
`;
