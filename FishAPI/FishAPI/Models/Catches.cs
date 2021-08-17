using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishAPI.Models
{
    public class Catches
    {
        public int CatchId { get; set; }
        public string Species { get; set; }
        public int FishLength { get; set; }
        public string AggGroup { get; set; }
    }
}
