using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using AIOFT.User.Data;
using AIOFT.User.Data.Repository;
using AIOFT.User.Service;

namespace AIOFT.User.API.Middlewares
{
    /// <summary>
    /// Servicecollection extnetion for dependency injection mappings.
    /// </summary>
    public static class DIConfiguration
    {
        /// <summary>
        /// Configuring the DI mappings.
        /// </summary>
        /// <param name="services"></param>
        public static void ConfigureDI(this IServiceCollection services)
        {
            ConfigureServices(services);
            ConfigureRepository(services);
        }

        /// <summary>
        /// Extention method to configure the database connection.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void ConfigureDB(this IServiceCollection services, IConfiguration configuration)
        {
            // TODO: Move the connection string to a key vault and read it from vault.
            var connectionString = configuration.GetSection("ConnectionString:UserDB").Value;
            //services.AddDbContext<UserDBContext>(options => options.UseInMemoryDatabase(databaseName: "UserDB"));
            //services.AddDbContext<UserDBContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
            services.AddDbContext<UserDBContext>(options => options.UseSqlServer(connectionString));
        }

        /// <summary>
        /// Configuring the DI mapping for services.
        /// </summary>
        /// <param name="services">Service collection object.</param>
        private static void ConfigureServices(IServiceCollection services)
        {
           services.AddScoped<IUserService, UserService>();
           services.AddScoped<IUserAuthenticationService, UserAuthenticationService>();
        }

        /// <summary>
        /// Configuring the DI mapping for repository.
        /// </summary>
        /// <param name="services">Service collection object.</param>
        private static void ConfigureRepository(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<ICourseHistoryRepository, CourseHistoryRepository>();
            services.AddScoped<ICommentsRepository, CommentsRepository>();

            services.AddScoped<IInvestmentRepository, InvestmentRepository>();
            services.AddScoped<IProfitPaidRepository, ProfitPaidRepository>();
        }

        /// <summary>
        /// Adding the initial data.
        /// </summary>
        /// <param name="app"></param>
        /// <param name="context"></param>
        public static void SetUpInitialData(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<UserDBContext>();

            var adminUser = new Data.Models.User()
            {
                Name = "Admin",
                Email = "admin@example.com",
                Phone = "123456789",
                Role = "Admin",
                Password = PasswordHelper.Encrypt("Admin@123"),
                CreatedDate = DateTime.UtcNow,
                IsActive = true
            };

            var adminUser1 = new Data.Models.User()
            {
                Name = "User 1",
                Email = "admin1@example.com",
                Phone = "123456789",
                Role = "User",
                Password = PasswordHelper.Encrypt("Admin@123"),
                CreatedDate = DateTime.UtcNow,
                IsActive = true
            };

            var adminUser2 = new Data.Models.User()
            {
                Name = "User 2",
                Email = "admin2@example.com",
                Phone = "123456789",
                Role = "Investor",
                Password = PasswordHelper.Encrypt("Admin@123"),
                CreatedDate = DateTime.UtcNow,
                IsActive = true
            };

            context.User.Add(adminUser);
            context.User.Add(adminUser1);
            context.User.Add(adminUser2);
            context.SaveChangesAsync();
        }
    }
}
