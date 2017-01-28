using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using Besenica.DAL;
using Besenica.Models;

namespace Besenica.Repository
{
    public class CountryRepository : IRepository<Country>
    {
        private ApplicationDbContext entities = new ApplicationDbContext();

        public IEnumerable<Country> GetAll(Func<Country, bool> predicate = null, Expression<Func<Country, object>>[] includeProperties = null)
        {
            if (predicate != null)
            {
                if (predicate != null)
                {
                    return entities.Countries.Where(predicate);
                }
            }
            IQueryable<Country> set = entities.Countries;
            if (includeProperties != null)
            {
                foreach (var include in includeProperties)
                {
                    set = set.Include(include);
                }
            }

            return entities.Countries;
        }

        public Country Get(Func<Country, bool> predicate)
        {
            return entities.Countries.FirstOrDefault(predicate);
        }

        public void Add(Country entity)
        {
            entities.Countries.Add(entity);
        }

        public void Delete(Country entity)
        {
            entities.Countries.Remove(entity);
        }

        internal void SaveChanges()
        {
            entities.SaveChanges();
        }
    }
}