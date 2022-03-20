using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AIOFT.User.DTO;
using AIOFT.User.Service;
using AIOFT.User.Data.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using AIOFT.User.API.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Amazon.Runtime;
using Amazon.S3;
using System.IO;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using Amazon.S3.Model;

namespace AIOFT.User.API.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        // The Course service instance
        private readonly ICourseRepository courseRepository;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;

        public CourseController(ICourseRepository _courseRepository, IMapper _mapper, IConfiguration _configuration)
        {
            this.courseRepository = _courseRepository;
            this.mapper = _mapper;
            this.configuration = _configuration;
        }

        [HttpPost]
        [Authorize(Roles = Roles.ADMIN)]
        public async Task<IActionResult> Post([FromBody] CourseDTO courseDto)
        {
            var courseEntity = this.mapper.Map<AIOFT.User.Data.Models.Course>(courseDto);
            var result  = await this.courseRepository.Create(courseEntity);
            this.courseRepository.Save();
            return Ok(this.mapper.Map<CourseDTO>(result));
        }

        [HttpPut]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Put([FromBody] CourseDTO courseDto)
        {
            var courseEntity = this.mapper.Map<AIOFT.User.Data.Models.Course>(courseDto);
            var result = this.courseRepository.Update(courseEntity);
            this.courseRepository.Save();
            return Ok(this.mapper.Map<CourseDTO>(result));
        }

        [HttpDelete]
        [Authorize(Roles = Roles.ADMIN)]
        public IActionResult Delete([FromBody] CourseDTO courseDto)
        {
            var courseEntity = this.mapper.Map<AIOFT.User.Data.Models.Course>(courseDto);
            this.courseRepository.Delete(courseEntity);
            this.courseRepository.Save();
            return Ok(true);
        }

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            
            var result = await this.courseRepository.FindByCondition(x=>x.Id == id).FirstOrDefaultAsync();
            var course = this.mapper.Map<AIOFT.User.Data.Models.Course>(result);
            course.VideoURL = GeneratePreSignedURL(result.VideoURL);
            course.ThumbanilURL = GeneratePreSignedURL(course.ThumbanilURL);

            return Ok(course);
        }

        [HttpGet]
        [Authorize]
        [Route("{searchText}")]
        public async Task<IActionResult> GetAll(string searchText)
        {

            var result = await this.courseRepository.FindByCondition(x => x.Descriptions.Contains(searchText) || x.Title.Contains(searchText)).ToListAsync();
            var courses = this.mapper.Map<IList<AIOFT.User.Data.Models.Course>>(result);
            foreach (var course in courses)
            {
                course.VideoURL = GeneratePreSignedURL(course.VideoURL);
                course.ThumbanilURL = GeneratePreSignedURL(course.ThumbanilURL);
            }
            return Ok(courses);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllCourse()
        {

            var result = await this.courseRepository.FindAll().ToListAsync();
            var courses = this.mapper.Map<IList<AIOFT.User.Data.Models.Course>>(result);
            foreach (var course in courses)
            {
                course.VideoURL = GeneratePreSignedURL(course.VideoURL);
            }
            return Ok(courses);
        }

        [HttpPost]
        [Authorize(Roles = Roles.ADMIN)]
        [Route("/upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            var access = this.configuration.GetSection("s3Access").Value;
            var secret = this.configuration.GetSection("s3Secret").Value;
            var bucket = this.configuration.GetSection("s3Name").Value;

            var credentials = new BasicAWSCredentials(access, secret);
            var config = new AmazonS3Config
            {
                RegionEndpoint = Amazon.RegionEndpoint.APSouth1
            };
            using var client = new AmazonS3Client(credentials, config);
            await using var newMemoryStream = new MemoryStream();
            file.CopyTo(newMemoryStream);

            var fileName = file.FileName.Split('.')[0] + "-" + DateTime.Now.Ticks.ToString() + "." + file.FileName.Split('.')[1];

            var uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = newMemoryStream,
                Key = fileName,
                BucketName = bucket,
                CannedACL = S3CannedACL.Private
            };

            var fileTransferUtility = new TransferUtility(client);
            await fileTransferUtility.UploadAsync(uploadRequest);

            return Ok(fileName);
        }

        private string GeneratePreSignedURL(string file)
        {
            if (file.StartsWith("http:") || file.StartsWith("https:"))
            {
                return file;
            }
            string urlString = "";
            try
            {
                var access = this.configuration.GetSection("s3Access").Value;
                var secret = this.configuration.GetSection("s3Secret").Value;
                var bucket = this.configuration.GetSection("s3Name").Value;

                var credentials = new BasicAWSCredentials(access, secret);
                var config = new AmazonS3Config
                {
                    RegionEndpoint = Amazon.RegionEndpoint.APSouth1
                };
                using var client = new AmazonS3Client(credentials, config);

                GetPreSignedUrlRequest request1 = new GetPreSignedUrlRequest
                {
                    BucketName = bucket,
                    Key = file,
                    Expires = DateTime.UtcNow.AddHours(6)
                };
                urlString = client.GetPreSignedURL(request1);
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            return urlString;
        }
    }
}
