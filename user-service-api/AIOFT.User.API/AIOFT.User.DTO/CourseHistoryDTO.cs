using System;
using System.Collections.Generic;
using System.Text;

namespace AIOFT.User.DTO
{
    public class CourseHistoryDTO
    {
        public long Id { get; set; }
        public Guid CourseId { get; set; }
        public Guid UserId { get; set; }
        public DateTimeOffset StartedDate { get; set; }
        public DateTimeOffset LastSeen { get; set; }
        public int PlayedDurationMinutes { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public string CreatedBy { get; set; }
    }
}
