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
    public class CatchesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CatchesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
            select * from dbo.Catches
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FishAppCon");
            SqlDataReader myReader;

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

        [HttpPost]
        public JsonResult Post(Catches Catch)
        {
            string query = @"
            insert into dbo.Catches
            (Species, FishLength, AggGroup)
            values(
            '" + Catch.Species + @"',
            '" + Catch.FishLength + @"',
            '" + Catch.AggGroup + @"'
            )
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FishAppCon");
            SqlDataReader myReader;

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
            return new JsonResult("Successfully Added");
        }

        [HttpPut]
        public JsonResult Put(Catches Catch)
        {
            string query = @"
            update dbo.Catches set           
            Species = ('" + Catch.Species + @"'),
            FishLength = ('" + Catch.FishLength + @"')
            where CatchId = ('"+Catch.CatchId+@"')
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FishAppCon");
            SqlDataReader myReader;

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
            return new JsonResult("Successfully Updated");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
            delete from dbo.Catches where CatchId = ('"+ id + @"')
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FishAppCon");
            SqlDataReader myReader;

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
            return new JsonResult("Successfully Deleted");
        }
    }
}
