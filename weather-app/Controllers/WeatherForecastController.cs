using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using weather_app.Converters;
using weather_app.DataAccess.Vedur;
using weather_app.Models;

namespace weather_app.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;
    private readonly IVedurDA _vedurDA;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IVedurDA vedurDA)
    {
        _logger = logger;
        _vedurDA = vedurDA;
    }

    [HttpGet]
    public async Task<IEnumerable<WeatherForecast>> Get([FromQuery] int StationId = 1)
    {
        // Might move the conversion logic to a layer further down but given the simplicity of the app
        // we will not add the extra layer. 
        try
        {
            _logger.LogInformation("Got a request! Params: {0}", StationId);
            var result = await _vedurDA.GetWeatherForeCast(StationId);
            return ConvertVedurToWeatherForecast.Convert(result);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Unhandled Exception");
            throw new Exception("Internal Server Error");
        }
    }
}
