namespace weather_app.DataAccess.Vedur;

public interface IVedurDA
{
  Task<Forecasts> GetWeatherForeCast(int StationId);
}