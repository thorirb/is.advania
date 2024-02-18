using weather_app.DataAccess.Vedur;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddTransient<IVedurDA, VedurDA>();
builder.Services.AddHttpClient("vedur", client =>
{
    string baseUrl = builder.Configuration.GetSection(VedurDAOptions.Vedur).GetValue<string>("BaseUrl");
    if (String.IsNullOrEmpty(baseUrl)) {
        // TODO: Handle with custom config exception
        throw new Exception("Unable to start the application, missing");
    }
	client.BaseAddress = new Uri(baseUrl);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
