using Microsoft.AspNetCore.Mvc;
using voting_app_api.Entities;

namespace voting_app_api.Controllers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        protected readonly DataContext _dataContext;

        public BaseApiController(DataContext context)
        {
            _dataContext = context;
        }
    }
}
