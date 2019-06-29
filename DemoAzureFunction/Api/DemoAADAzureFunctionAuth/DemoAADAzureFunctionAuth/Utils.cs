using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace DemoAADAzureFunctionAuth
{
    public static class Utils
    {
        public static string GetUserName()
        {
            return "myServiceAccountUserName@domain.onmicrosoft.com";
        }

        public static SecureString GetPassword()
        {
            var password = "xxxxxxxxxx";
            var secureString = new SecureString();
            password.ToList().ForEach(c => secureString.AppendChar(c));
            return secureString;
        }
    }
}
