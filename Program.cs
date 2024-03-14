using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using NewTodoApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//var corsOrigins = Configuration["Security:Cors:AllowedOrigins"]!.Split(";");
        builder.Services.AddCors(options => {
            options.AddPolicy("AbCors",
                builder => builder.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
            );
        });
        
builder.Services.AddControllers();
var connStr = builder.Configuration.GetConnectionString("EfCore");
builder.Services.AddDbContext<TodoContext>(opt =>      
    opt.UseSqlServer(connStr));            
//builder.Services.AddDbContext<TodoContext>(opt =>
//    opt.UseInMemoryDatabase("TodoContext"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 8;
})
    .AddEntityFrameworkStores<TodoContext>()
    .AddDefaultTokenProviders();
builder.Services.AddAuthentication();
builder.Services.AddEndpointsApiExplorer();     
builder.Services.AddSwaggerGen();               

var app = builder.Build();     


if (app.Environment.IsDevelopment())        
{
    app.UseSwagger();       
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseAuthorization();
app.UseHttpsRedirection();     

app.UseCorsOptions();

app.UseCors("AbCors");

app.UseAuthorization();         

app.MapControllers();           

app.Run();      
