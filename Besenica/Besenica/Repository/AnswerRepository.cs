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
    public class AnswerRepository : IRepository<Answer>
    {
        private ApplicationDbContext entities = new ApplicationDbContext();

        public IEnumerable<Answer> GetAll(Func<Answer, bool> predicate = null, Expression<Func<Answer, object>>[] includeProperties = null)
        {
            if (predicate != null)
            {
                if (predicate != null)
                {
                    return entities.Answers.Where(predicate);
                }
            }
            IQueryable<Answer> set = entities.Answers;
            if (includeProperties != null)
            {
                foreach (var include in includeProperties)
                {
                    set = set.Include(include);
                }
            }

            return entities.Answers;
        }

        public Answer Get(Func<Answer, bool> predicate)
        {
            return entities.Answers.FirstOrDefault(predicate);
        }

        public void Add(Answer entity)
        {
            entities.Answers.Add(entity);
        }

        public void Delete(Answer entity)
        {
            entities.Answers.Remove(entity);
        }

        internal void SaveChanges()
        {
            entities.SaveChanges();
        }
    }
}