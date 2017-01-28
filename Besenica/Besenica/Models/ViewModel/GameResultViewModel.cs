using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Besenica.Models.ViewModel
{
    public class GameResultViewModel
    {
        public virtual int? CountryId { get; set; }

        public virtual int? AnimalId { get; set; }

        public virtual string Answer { get; set; }

        public DateTime Duration { get; set; }

        public string UserName { get; set; }

        public int Guesses { get; set; }
        public bool IsAnswered { get; set; }
    }
}