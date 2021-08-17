using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using FishAPI.Models;

namespace FishAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FishController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public FishController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
            select SpeciesId, Species, MeasurementMethod, MinimumLength, MaximumLength, BagLimit, Trophy, Agg, AggGroup from dbo.Fish
            ";
            DataTable table = new DataTable();
            SqlDataReader myReader;
            string sqlDataSource = _configuration.GetConnectionString("FishAppCon");

            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("{species}")]
        public JsonResult Get(string species)
        {
            string query = @"
            select SpeciesId, Species, MeasurementMethod, MinimumLength, MaximumLength, BagLimit, Trophy, Agg, AggGroup 
            from dbo.Fish
            where Species = '"+species+@"'  
            ";
            DataTable table = new DataTable();
            SqlDataReader myReader;
            string sqlDataSource = _configuration.GetConnectionString("FishAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
    }
}
