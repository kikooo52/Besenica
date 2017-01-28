using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Besenica.Startup))]
namespace Besenica
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            app.MapSignalR();
        }
    }
}
