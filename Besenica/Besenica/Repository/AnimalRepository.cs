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
    public class AnimalRepository : IRepository<Animal>
    {
        private ApplicationDbContext entities = new ApplicationDbContext();

        public IEnumerable<Animal> GetAll(Func<Animal, bool> predicate = null, Expression<Func<Animal, object>>[] includeProperties = null)
        {
            if (predicate != null)
            {
                if (predicate != null)
                {
                    return entities.Animals.Where(predicate);
                }
            }
            IQueryable<Animal> set = entities.Animals;
            if (includeProperties != null)
            {
                foreach (var include in includeProperties)
                {
                    set = set.Include(include);
                }
            }

            return entities.Animals;
        }

        public Animal Get(Func<Animal, bool> predicate)
        {
            return entities.Animals.FirstOrDefault(predicate);
        }

        public void Add(Animal entity)
        {
            entities.Animals.Add(entity);
        }

        public void Delete(Animal entity)
        {
            entities.Animals.Remove(entity);
        }

        internal void SaveChanges()
        {
            entities.SaveChanges();
        }
    }
}