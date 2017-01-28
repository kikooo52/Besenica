using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Besenica
{
    public class GameHub : Hub
    {
        public void Send(string name, string message)
        {
            string username = HttpContext.Current.User.Identity.Name;
            // Call the addNewMessageToPage method to update clients.
            Clients.All.addNewMessageToPage(username, message);
        }
    }
}