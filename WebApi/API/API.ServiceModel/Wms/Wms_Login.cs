using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ServiceStack;
using ServiceStack.ServiceHost;
using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;
using ServiceStack.OrmLite;
using WebApi.ServiceModel.Tables;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace WebApi.ServiceModel.Wms
{
    [Route("/wms/action/list/login", "Post")]
    [Route("/wms/login/check", "Post")]
    public class Wms_Login : IReturn<CommonResponse>
    {
        public string UserId { get; set; }
        public string Password { get; set; }
        public string body { get; set; }
        public string UpdateAllString { get; set; }
    }
    public class Wms_Login_Logic
    {
        public IDbConnectionFactory DbConnectionFactory { get; set; }
        public int LoginCheck(Wms_Login request)
        {
            int Result = -1;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("WMS"))
                {

                    if (request.UpdateAllString != null && request.UpdateAllString != "")
                    {
                        JArray ja = (JArray)JsonConvert.DeserializeObject(request.UpdateAllString);
                        if (ja != null)
                        {
                                            for (int i = 0; i < ja.Count(); i++)
                                             {
                                                 string strSqlSaus1 = "";
                                                 string strUserId = ja[i]["UserId"].ToString();
                                                 string strPassword = ja[i]["Password"].ToString();
                                                 //strSqlSaus1 = "Select count(*) From Saus1 Where UserId='" + Modfunction.CheckNull(strUserId) + "' And Password='" + Modfunction.CheckNull(strPassword) + "'";
                                                 strSqlSaus1 = "Select count(*) From Saus1 Where UserId='" + Modfunction.CheckNull(strUserId) + "'";
                                                Result = db.Scalar<int>(strSqlSaus1);
                                             }
                                                

                        }

                    }




                }
            }
            catch { throw; }
            return Result;
        }
    }
}
