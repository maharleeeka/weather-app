import styled from 'styled-components';

export const Container = styled.div`
  h3 {
    color: black;
  }
`;
export const WeatherState = styled.div`
  width: 400px;
  height: 65vh;
`;
export const SearchContainer = styled.div``;
export const TextInput = styled.input``;
export const Button = styled.button``;
export const CurrentDateTime = styled.div``;
export const CurrentLocation = styled.div``;
export const WeatherIcon = styled.img``;
export const WeatherStatus = styled.div``;
export const DateContainer = styled.div``;
export const Temperature = styled.div``;
export const SunContainer = styled.div``;
export const SunIcon = styled.div<{icon: string}>`
  background: url(${props => props.icon})
`
