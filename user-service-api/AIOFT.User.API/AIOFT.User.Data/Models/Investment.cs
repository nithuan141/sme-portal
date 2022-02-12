using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AIOFT.User.Data.Models
{
    public class Investment
    {
        [Key]
        public long Id  { get; set; }
        public Guid UserId { get; set; }
        public string InvestorName { get; set; }
        public decimal InvestedAmount { get; set; }
        public decimal ProfitPercentage { get; set; }
        public DateTimeOffset InvestedDate  { get; set; }
        public int InvestmentMonths { get; set; }
        public DateTimeOffset CreatedDate  { get; set; }
        public string CreatedBy    { get; set; }
        public int InvetsmentType   { get; set; }
        public short Status { get; set; }
        public DateTimeOffset ReturnRequestedDate { get; set; }
        public DateTimeOffset ReturnedDate { get; set; }
    }
}
