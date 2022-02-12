using System;
using System.Collections.Generic;
using System.Text;

namespace AIOFT.User.DTO
{
    public class CommentsDTO
    {
        public long Id  { get; set; }
        public Guid CourseId { get; set; }
        public Guid UserId { get; set; }
        public string Description { get; set; }
        public long ParentId { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public Guid CreatedBy { get; set; }
    }
}
