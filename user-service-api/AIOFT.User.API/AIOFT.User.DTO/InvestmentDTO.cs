using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AIOFT.User.DTO
{
    public class InvestmentDTO
    {
        public long Id  { get; set; }
        public Guid UserId { get; set; }
        
        [Required(ErrorMessage = "Investor Name is required")]
        public string InvestorName { get; set; }

        [Required(ErrorMessage = "Amount is required")]
        public decimal InvestedAmount { get; set; }

        [Required(ErrorMessage = "Profit is required")]
        public decimal ProfitPercentage{ get; set; }

        [Required(ErrorMessage = "Invested date is required")]
        public DateTimeOffset InvestedDate{ get; set; }

        [Required(ErrorMessage = "Duration month is required")]
        public int InvestmentMonths { get; set; }
        public DateTimeOffset CreatedDate{ get; set; }
        public string CreatedBy{ get; set; }
        public int InvetsmentType { get; set; }
        public short Status { get; set; }
        public DateTimeOffset ReturnRequestedDate { get; set; }
        public DateTimeOffset ReturnedDate { get; set; }
    }
}
