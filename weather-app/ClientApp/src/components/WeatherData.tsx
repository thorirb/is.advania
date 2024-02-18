import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import stations from '../stations.json';

function renderForecastsTable(forecasts: any) {
  if (forecasts.length) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Dags.</th>
            <th>Hiti</th>
            <th>Lýsing</th>
            <th>Vindur</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast: any) =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.summary}</td>
              <td>{`${forecast.windSpeed} - ${forecast.windDirection}`}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
  return (<div><p>Veldu stöð og smelltu á hnappinn</p></div>)
}

async function populateWeatherData(stationId: string, fn: (stateObject: any) => void) {
  fn({ forecasts: [], loading: true, isEmpty: false })
  let isEmpty = false;
  let data = [];
  if (stationId) {
    const response = await fetch(`weatherforecast?StationId=${stationId}`);
    data = await response.json();
    isEmpty = !data || data.length === 0;
  }
  fn({ forecasts: data, loading: false, isEmpty })
}



export default function WeatherData() {
  const resetState = { forecasts: [], loading: false, isEmpty: false };
  const [data, setData] = useState(resetState);
  const [stationId, setStationId] = useState('');

  let contents = data.loading
      ? <p><em>Loading...</em></p>
      : renderForecastsTable(data.forecasts);

  useEffect(() => {populateWeatherData(stationId, setData);}, []);

  function onStationChange(stationId: string) {
    setData(resetState);
    setStationId(stationId);
  }
  return (
    <div>
      <h1 id="tableLabel">VeðurSpá</h1>
      <p>Hér er hægt að sækja veðurspá frá hinum ýmsu veðurstöðum á landinu</p>
      <div className='flex'>
        <Stations onStationChange={onStationChange} />
        <input type='button' className="btn-primary" value='Sækja veðurspá' disabled={stationId === ''} onClick={() => populateWeatherData(stationId, setData)} />
      </div>
      {contents}
      {data.isEmpty && (<p><em>Engin gögn fyrir valda stöð</em></p>)}
    </div>
  );
}

type StationsProps = {
  onStationChange: (text: string) => void;
};

function Stations(props: StationsProps): JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [searchText, setSearchText] = useState<string>('');
  const [dropDownLabel, setDropDownLabel] = useState('Veldu veðurstöð');
  const [filteredStationList, setFilteredStationList] = useState(stations);
  useEffect(() => {
    if (searchText) {
      setFilteredStationList(stations.filter(s => s.name.toLowerCase().startsWith(searchText.toLowerCase())));
    } else {
      setFilteredStationList(stations);
    }
  }, [searchText]);
  // https://reactstrap.github.io/?path=/docs/components-dropdown--dropdown
  return (<Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown-custom">
    <DropdownToggle caret className='dropdown-custom'>
      {dropDownLabel}
    </DropdownToggle>
    <DropdownMenu container="body">
      <DropdownItem key="search" header className='dropdown-search'>
        <label>Leit: </label><input type="text" placeholder='Veðurstöð' value={searchText} onChange={(evt) => setSearchText(evt.target.value)} />
      </DropdownItem>
      <DropdownItem key="divider" divider >
      </DropdownItem>
      <div className="dropdown-contain">
        {filteredStationList.map(s => {
          return (<DropdownItem key={s.id} onClick={() => {setDropDownLabel(s.name); props.onStationChange(s.id)}}>
            {s.name}
          </DropdownItem>);
        })}
      </div>
    </DropdownMenu>
  </Dropdown>
  );
}
