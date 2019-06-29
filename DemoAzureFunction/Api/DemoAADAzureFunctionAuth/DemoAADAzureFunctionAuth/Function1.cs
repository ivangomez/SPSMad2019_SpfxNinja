using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;

namespace DemoAADAzureFunctionAuth
{
    public static class Function1
    {
        [FunctionName("clients")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            var clients = new List<dynamic>
            {
                new
                {
                    Name = "Stan Lee"
                },
                new
                {
                    Name = "Thomas Anderson"
                },
                new
                {
                    Name = "Erik Lehnsherr"
                },
                new
                {
                    Name="SPS"
                }
            };

            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(JsonConvert.SerializeObject(clients), Encoding.UTF8, "application/json")
            };


            return response;
        }
        
    }
}
