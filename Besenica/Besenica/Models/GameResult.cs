using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Besenica.Models
{
    public class GameResult : Entity
    {
        [Required]
        public virtual int AnswerId { get; set; }
        public virtual Answer Answer { get; set; }
        //public virtual string Answer { get; set; }

        public DateTime Duration { get; set; }

        public string UserName { get; set; }

        public int Guesses { get; set; }
        public bool IsAnswered { get; set; }
    }
}