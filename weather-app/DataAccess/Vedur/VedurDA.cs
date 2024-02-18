using System.Xml.Serialization;

namespace weather_app.DataAccess.Vedur;

public class VedurDA: IVedurDA {
  private readonly ILogger<VedurDA> _logger;
  private IHttpClientFactory _factory;

    public VedurDA(ILogger<VedurDA> logger, IHttpClientFactory factory)
    {
      _factory = factory;
        _logger = logger;
    }

  private async Task<T> GetResponseFromXMLService<T>(string requestUrl) {
    using (var client = _factory.CreateClient("vedur")) {
      client.DefaultRequestHeaders.Add("User-Agent", "VedurAPI/0.1 ( thorir.bjarnason@gmail.com )");
  		_logger.LogInformation($"Calling Url '{client.BaseAddress}{requestUrl}'");
  		var response = await client.GetAsync(requestUrl);
  		response.EnsureSuccessStatusCode();

      XmlSerializer serializer = new XmlSerializer(typeof(T));
      return (T)serializer.Deserialize(response.Content.ReadAsStream());
    };
  }

  public Task<Forecasts> GetWeatherForeCast(int StationId) {
    string requestUrl = $"?op_w=xml&type=forec&lang=is&view=xml&ids={StationId}";
    return GetResponseFromXMLService<Forecasts>(requestUrl);
  }
}