import React, { useEffect, useState } from 'react';

function renderForecastsTable(forecasts: any) {
  return (
    <table className="table table-striped" aria-labelledby="tableLabel">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {forecasts.map((forecast: any) =>
          <tr key={forecast.date}>
            <td>{forecast.date}</td>
            <td>{forecast.temperatureC}</td>
            <td>{forecast.temperatureF}</td>
            <td>{forecast.summary}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

async function populateWeatherData(fn: (stateObject: any) => void) {
  const response = await fetch('weatherforecast');
  const data = await response.json();
  fn({ forecasts: data, loading: false })
}

export default function FetchData() {
  const [data, setData] = useState({ forecasts: [], loading: true });

  let contents = data.loading
      ? <p><em>Loading...</em></p>
      : renderForecastsTable(data.forecasts);

  useEffect(() => {populateWeatherData(setData);}, [])

  return (
    <div>
      <h1 id="tableLabel">Weather forecast</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {contents}
    </div>
  );
}