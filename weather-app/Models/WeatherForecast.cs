namespace weather_app.Models;

public class WeatherForecast
{
    public DateTime Date { get; set; }

    public int? TemperatureC { get; set; }

    public int? TemperatureF => TemperatureC.HasValue ? 32 + (int)(TemperatureC / 0.5556) : null;

    public string? Summary { get; set; }
    public string? WindDirection { get; internal set; }
    public int? WindSpeed { get; internal set; }
}
