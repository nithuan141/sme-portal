﻿using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ApiBase.Common
{
    /// <summary>
    /// The HttpContext class extension helper class for authorization.
    /// </summary>
    public static class Authorizationhelper
    {
        /// <summary>
        /// Httpcontext extension method to validate whether the authorized user is accessing the resouces of self or not.
        /// <param name="httpContext">The http context</param>
        /// <param name="userName">The user name of the resource owner.</param>
        /// <returns></returns>
        public static async Task ValidateSelfAccess(this HttpContext httpContext, string userName)
        {
            var user = await GetUser(httpContext);
            var loggedinUserId = user.Claims.First(claim => claim.Type == "unique_name")?.Value;

            if (loggedinUserId != userName)
            {
                throw new UnauthorizedAccessException("Not autherized to access this resource.");
            }
        }

        /// <summary>
        /// Httpcontext extension method to validate whether the authorized user is accessing the resouces of self or not.
        /// <param name="httpContext">The http context</param>
        /// <param name="userName">The user name of the resource owner.</param>
        /// <returns></returns>
        public static async Task ValidateSelfOrAdminAccess(this HttpContext httpContext, string userName = "")
        {
            var user = await GetUser(httpContext);
            var loggedinUser = user.Claims.First(claim => claim.Type == "unique_name")?.Value;
            var role = user.Claims.First(claim => claim.Type == "role")?.Value;

            if (role != "Admin" && loggedinUser != userName)
            {
                throw new UnauthorizedAccessException("Not autherized to access this resource.");
            }
        }

        /// <summary>
        /// Fid and returns the logged in user name from the token.
        /// </summary>
        /// <param name="httpContext">The httpcontext</param>
        /// <returns></returns>
        public static async Task<string> LoggedInUser(this HttpContext httpContext)
        {
            var user = await GetUser(httpContext);
            var loggedinUsername = user.Claims.First(claim => claim.Type == "unique_name")?.Value;

            return loggedinUsername;
        }

        /// <summary>
        /// returns the user identity with claims as json.
        /// </summary>
        /// <param name="httpContext"></param>
        /// <returns></returns>
        private static async Task<JwtSecurityToken> GetUser(HttpContext httpContext)
        {
            var handler = new JwtSecurityTokenHandler();
            var token = httpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var user = handler.ReadToken(token) as JwtSecurityToken;
            return user;
        }

        /// <summary>
        /// returns the user identity with claims as json.
        /// </summary>
        /// <param name="httpContext"></param>
        /// <returns></returns>
        public static async Task<JwtSecurityToken> GetUserToken(this HttpContext httpContext)
        {
            var handler = new JwtSecurityTokenHandler();
            var token = httpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var user = handler.ReadToken(token) as JwtSecurityToken;
            return user;
        }

        public static string IpAddress(this HttpContext httpContext)
        {
            if (httpContext.Request.Headers.ContainsKey("X-Forwarded-For"))
                return httpContext.Request.Headers["X-Forwarded-For"];
            else
                return httpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
    }
}
