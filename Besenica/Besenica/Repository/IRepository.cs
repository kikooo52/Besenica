using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Besenica.Repository
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll(Func<T, bool> predicate = null, Expression<Func<T, object>>[] includeProperties = null);
        T Get(Func<T, bool> predicate);
        void Add(T entity);
        void Delete(T entity);
    }
}