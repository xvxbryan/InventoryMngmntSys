using api.Data;
using api.Interfaces;
using api.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            policy.WithOrigins("https://inv-mngmnt-sys.vercel.app") // Allow only your frontend
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

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

app.UseCors("AllowSpecificOrigin"); // Apply CORS policy
app.UseAuthorization();
app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.Headers["Access-Control-Allow-Origin"] = "https://inv-mngmnt-sys.vercel.app";
        context.Response.Headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
        context.Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
        context.Response.StatusCode = 204;
        return;
    }
    await next();
});


// app.UseCors(x => x
//     .AllowAnyHeader()
//     .AllowAnyMethod()
//     .AllowCredentials()
//     .WithOrigins("https://inv-mngmnt-sys.vercel.app")
//     .SetIsOriginAllowed(origin => true)
// );

app.MapGet("/", () => "API is running!!!");
app.MapControllers();

app.Run();


