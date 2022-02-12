using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AIOFT.User.Data.Models
{
    public class ProfitPaid
    {
        [Key]
        public long Id { get; set; }
        public long? InvestmentId { get; set; }
        public Guid UserId { get; set; }
        public DateTimeOffset PaidDate { get; set; }
        public decimal PaidAmount { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public string  CreatedBy { get; set; }
    }
}
