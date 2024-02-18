using System.Reflection.Metadata.Ecma335;
using weather_app.DataAccess.Vedur;
using weather_app.Models;

namespace weather_app.Converters;


public class ConvertVedurToWeatherForecast
{
  private static IDictionary<string, string> WindDirectionMap = new Dictionary<string, string>() {
    {"Logn", "Logn"},
    {"N", "Norðan"},
    {"NNA", "Norð-norð-austan"},
    {"ANA", "Aust-norð-austan"},
    {"A", "Austan"},
    {"ASA", "Aust-suð-austan"},
    {"SA", "Suð-austan"},
    {"SSA", "Suð-suð-austan"},
    {"S", "Sunnan"},
    {"SSV", "Suð-suð-vestan"},
    {"SV", "Suð-vestan"},
    {"VSV", "Vest-suð-vestan"},
    {"V", "Vestan"},
    {"VNV", "Vest-norð-vestan"},
    {"NV", "Norð-vestan"},
    {"NNV", "Norð-norð-vestan"},
  };

  public static string ConvertWindDirection(string directionShortHand)
  {
    string windDirection = "Ekki þekkt vindátt";
    if (WindDirectionMap.ContainsKey(directionShortHand))
    {
      windDirection = WindDirectionMap[directionShortHand];
    }
    return windDirection;
  }

  private static int? ConvertTemperature(string? temp)
  {
    int? temperature = null;
    if (!string.IsNullOrEmpty(temp))
    {
      temperature = (int)Math.Round(double.Parse(temp), 0);
    }
    return temperature;
  }

  static bool hasForecastData(Forecasts forecasts)
  {
    return forecasts.Stations != null && forecasts.Stations.Count > 0 && forecasts.Stations[0].Forecasts != null;
  }
  public static IEnumerable<WeatherForecast> Convert(Forecasts forecasts)
  {
    if (hasForecastData(forecasts))
    {
      return
        forecasts.Stations[0].Forecasts.Select(s =>
        new WeatherForecast()
        {
          Date = DateTime.Parse(s.Ftime),
          Summary = s.WeatherDescription,
          TemperatureC = ConvertTemperature(s.Temperature),
          WindDirection = ConvertWindDirection(s.WindDirection),
          WindSpeed = s.WindSpeed

        });
    }
    return new WeatherForecast[0];
  }
}