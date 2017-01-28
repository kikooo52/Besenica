using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Besenica.Models
{
    [Serializable]
    public class Entity
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int Id { get; protected set; }

        public DateTime CreatedOn
        {
            get { return _dateCreated; }

            set { _dateCreated = value; }
        }

        private DateTime _dateCreated = DateTime.UtcNow;
    }
}