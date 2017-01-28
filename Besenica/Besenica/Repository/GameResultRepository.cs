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
    public class GameResultRepository : IRepository<GameResult>
    {
        private ApplicationDbContext entities = new ApplicationDbContext();

        public IEnumerable<GameResult> GetAll(Func<GameResult, bool> predicate = null, Expression<Func<GameResult, object>>[] includeProperties = null)
        {
            if (predicate != null)
            {
                if (predicate != null)
                {
                    return entities.GameResults.Where(predicate);
                }
            }
            IQueryable<GameResult> set = entities.GameResults;
            if (includeProperties != null)
            {
                foreach (var include in includeProperties)
                {
                    set = set.Include(include);
                }
            }

            return entities.GameResults;
        }

        public GameResult Get(Func<GameResult, bool> predicate)
        {
            return entities.GameResults.FirstOrDefault(predicate);
        }

        public void Add(GameResult entity)
        {
            entities.GameResults.Add(entity);
        }

        public void Delete(GameResult entity)
        {
            entities.GameResults.Remove(entity);
        }

        internal void SaveChanges()
        {
            entities.SaveChanges();
        }
    
    }
}