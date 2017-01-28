using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Besenica.Models
{
    public class Animal : Entity
    {
        public string Name { get; set; }

        public string Hint { get; set; }
    }
}