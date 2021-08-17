using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishAPI.Models
{
    public class Fish
    {
        public int SpeciesId { get; set; }
        public string Species { get; set; }
        public string MeasurementMethod { get; set; }
        public string MinimumLength { get; set; }
        public string MaximumLength { get; set; }
        public string BagLimit { get; set; }
        public string Trophy { get; set; }
        public string Agg { get; set; }
        public string AggGroup { get; set; }
    }
}
