using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{

    public class TestModelet
    {
        [JsonConverter(typeof(DataConverter))]
        public DateTime Time { get; set; }
        public string Name { get; set; }
        public TestModel Parent { get; set; }
    }

    public class TestModel
    {

        public List<TestModelet> xxxx { get; set; }
        public string Name { get; set; }

        [JsonConverter(typeof(DataConverter))]
        public DateTime Time { get; set; }

        public static List<TestModel> instance()
        {

            var b = new TestModel
            {
                Name = "burklax",
                Time = new DateTime(1982, 8, 8),
                xxxx = new List<TestModelet>()
                };
            var b2 = new TestModelet() { Name = "zog", Time = DateTime.Now };
            b.xxxx.Add(b2);
            b2.Parent = b;

            return new List<TestModel> { b };
        }
    }

    public class DataConverter : JsonConverter<DateTime>
    {
        public override DateTime ReadJson(JsonReader reader, Type objectType, DateTime existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            var result = serializer.Deserialize(reader).ToString().Replace("$$DateTime=","");
            return DateTime.Parse(result);
        }

        public override void WriteJson(JsonWriter writer, DateTime value, JsonSerializer serializer)
        {
            writer.WriteValue("$$DateTime=" + value.Date.ToString());
        }
    }


    class Program
    {
        static void Main(string[] args)
        {

            var d3x =  $"{new DateTime(1982,12,4,6,0,14)}".Replace(" ","T");


            JsonSerializer serializer = new JsonSerializer();


            var r345345x = JsonConvert.DeserializeObject<List<TestModel>>(File.ReadAllText("sdfsfsdfsfs.json"));


            var x = JsonConvert.SerializeObject(TestModel.instance(),new JsonSerializerSettings{ PreserveReferencesHandling= PreserveReferencesHandling.Objects });


        }
    }
}
