using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Besenica.Models
{
    public class Game : Entity
    {
        [Required]
        public virtual int AnswerId { get; set; }
        public virtual Answer Answer { get; set; }

        [Required]
        public virtual int ApplicationUserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}