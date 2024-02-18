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
  const response = await fetch(`weatherforecast?StationId=${stationId}`);
  const data = await response.json();
  fn({ forecasts: data, loading: false })
}



export default function WeatherData() {
  const [data, setData] = useState({ forecasts: [], loading: true });
  const [stationId, setStationId] = useState('');

  let contents = data.loading
      ? <p><em>Loading...</em></p>
      : renderForecastsTable(data.forecasts);

  useEffect(() => {populateWeatherData(stationId, setData);}, [])

  return (<>
    <style>{`.styled {
      border: 0;
      line-height: 2.5;
      padding: 0 20px;
      margin-left: 20px;
      font-size: 1rem;
      text-align: center;
      color: #fff;
      text-shadow: 1px 1px 1px #000;
      border-radius: 10px;
      background-color: rgb(220 0 0 / 100%);
      background-image: linear-gradient( to top left, rgb(0 0 0 / 20%), rgb(0 0 0 / 20%) 30%, rgb(0 0 0 / 0%) );
      // box-shadow: inset 2px 2px 3px rgb(255 255 255 / 60%), inset -2px -2px 3px rgb(0 0 0 / 60%);
    }
    .flex {
      display: flex;
    }`}</style>
    <div>
      <h1 id="tableLabel">VeðurSpá</h1>
      <p>Hér er hægt að sækja veðurspá frá hinum ýmsu veðurstöðum á landinu</p>
      <div className='flex'>
        <Stations onStationChange={setStationId} />
        <input type='button' className="styled" value='Sækja veðurspá' disabled={stationId === ''} onClick={() => populateWeatherData(stationId, setData)} />
      </div>
      {contents}
    </div>
    </>
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
  return (<Dropdown isOpen={dropdownOpen} toggle={toggle}>
    <DropdownToggle caret size="lg">
      {dropDownLabel}
    </DropdownToggle>
    <DropdownMenu container="body">
      <DropdownItem key="search" header>
        <label>Leit: </label><input type="text" placeholder='Veðurstöð' value={searchText} onChange={(evt) => setSearchText(evt.target.value)} />
      </DropdownItem>
      <DropdownItem key="divider" divider >
      </DropdownItem>
      {filteredStationList.map(s => {
        return (<DropdownItem key={s.id} onClick={() => {setDropDownLabel(s.name); props.onStationChange(s.id)}}>
          {s.name}
        </DropdownItem>);
      })}
    </DropdownMenu>
  </Dropdown>
  );
}
