using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.SharePoint.Client;

namespace DemoAADAzureFunctionAuth
{
    public static class Function2
    {
        [FunctionName("promote")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            log.Info("C# HTTP trigger function processed a request.");
            
            var name = req.GetQueryNameValuePairs()
                .FirstOrDefault(q => string.Compare(q.Key, "name", true) == 0)
                .Value;

            if (name!=null)
            {
                using (var clientContext = new ClientContext("https://domain.sharepoint.com/sites/MyDemoSite"))
                {
                    clientContext.Credentials = new SharePointOnlineCredentials(Utils.GetUserName(), Utils.GetPassword());

                    var list = clientContext.Web.Lists.GetByTitle("PromotedClients");
                    var itemCreationInformation = new ListItemCreationInformation();
                    var listItem = list.AddItem(itemCreationInformation);
                    listItem["Title"] = name;
                    listItem.Update();

                    clientContext.ExecuteQuery();
                } 
                return req.CreateResponse(HttpStatusCode.OK, "Added " + name);
            }

            return req.CreateResponse(HttpStatusCode.BadRequest, "Name required for this operation");
        }
    }
}
