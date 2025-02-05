using api.Data;
using api.Interfaces;
using api.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddControllers();

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

var sqlConnection = builder.Configuration["ConnectionStrings:InvMngSys:SqlDb"];

builder.Services.AddSqlServer<ApplicationDBContext>(sqlConnection, options => options.EnableRetryOnFailure());

// builder.Services.AddDbContext<ApplicationDBContext> (options => {
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
//     // options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
// });

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi();
// }


if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.MapOpenApi();
}


app.UseHttpsRedirection();

app.UseCors(x => x
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("https://inv-mngmnt-sys.vercel.app")
    .SetIsOriginAllowed(origin => true)
);

app.MapGet("/", () => "API is running!");
app.MapControllers();

app.Run();


