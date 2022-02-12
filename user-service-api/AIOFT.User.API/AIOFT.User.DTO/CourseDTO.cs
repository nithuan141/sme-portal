using System;
using System.Collections.Generic;
using System.Text;

namespace AIOFT.User.DTO
{
    public class CourseDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Descriptions { get; set; }
        public string Tags { get; set; }
        public string VideoURL { get; set; }
        public string ThumbanilURL { get; set; }
        public int DurationMinutes { get; set; }
        public bool IsPublished { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public string CreatedBy { get; set; }
    }
}
