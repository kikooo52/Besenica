using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Besenica.DAL;
using Besenica.Models;
using Besenica.Models.ViewModel;
using Besenica.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace Besenica.Controllers
{
    public class GameController : Controller
    {
        private AnswerRepository _answerRepository = new AnswerRepository();
        private GameResultRepository _gameResultRepository = new GameResultRepository();
        private CountryRepository  _countryRepository = new CountryRepository();
        private AnimalRepository _animalRepository = new AnimalRepository();
        private ApplicationUserManager _userManager;

        // GET: Game
        public ActionResult Index()
        {

            var result = _gameResultRepository.GetAll(includeProperties: new Expression<Func<GameResult, object>>[] { x => x.Answer }).OrderByDescending(x => x.Id);
            List<GameResultViewModel> gameResultViewModels = new List<GameResultViewModel>();
            foreach (var gameResult in result)
            {
                gameResultViewModels.Add(new GameResultViewModel()
                {
                    Answer = gameResult.Answer.Animal != null ? gameResult.Answer.Animal.Name : gameResult.Answer.Country != null ? gameResult.Answer.Country.Name : "",
                    UserName = gameResult.UserName,
                    Duration = gameResult.Duration,
                    IsAnswered = gameResult.IsAnswered,
                    Guesses = gameResult.Guesses
                });
            }
            return View(gameResultViewModels.ToArray());

        }

        public ActionResult GameResult()
        {
            var result = _gameResultRepository.GetAll(includeProperties: new Expression<Func<GameResult, object>>[] { x => x.Answer }).OrderByDescending(x => x.Id);
            List<GameResultViewModel> gameResultViewModels = new List<GameResultViewModel>();
            foreach (var gameResult in result)
            {
                gameResultViewModels.Add(new GameResultViewModel()
                {
                    Answer = gameResult.Answer.Animal != null ? gameResult.Answer.Animal.Name : gameResult.Answer.Country != null ? gameResult.Answer.Country.Name : "",
                    UserName = gameResult.UserName,
                    Duration = gameResult.Duration,
                    IsAnswered = gameResult.IsAnswered,
                    Guesses = gameResult.Guesses
                });
            }
            return View(gameResultViewModels.ToArray());
        }


        public ActionResult GameChat()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CreateResult(GameResultViewModel gameResultViewModel)
        {
            Answer answer = new Answer()
            {
                AnimalId = gameResultViewModel.AnimalId,
                CountryId = gameResultViewModel.CountryId
            };
            _answerRepository.Add(answer);
            _answerRepository.SaveChanges();
            
            
            string currentUserId = User.Identity.GetUserId();
            var users = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            var sad = users.Users.FirstOrDefault(x => x.Id == currentUserId);

            GameResult gameResult = new GameResult()
            {
                AnswerId = answer.Id,
                Duration = gameResultViewModel.Duration,
                Guesses = gameResultViewModel.Guesses,
                IsAnswered = gameResultViewModel.IsAnswered,
                UserName = sad.UserName,
            };
            _gameResultRepository.Add(gameResult);
            _gameResultRepository.SaveChanges();
            return Json(gameResult, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllCountries()
        {
            var result = _countryRepository.GetAll();

            return Json(result.ToList(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllAnimals()
        {
            var result = _animalRepository.GetAll();

            return Json(result.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}