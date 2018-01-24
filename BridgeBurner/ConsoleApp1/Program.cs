using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Globalization;
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
            var original = serializer.Deserialize(reader).ToString();
            var pos1 = original.IndexOf("+");
            var pos2 = original.Substring(0, pos1 + 3) + ":00";
            var result = DateTime.ParseExact(pos2, "ddd MMM MM yyyy HH:mm:ss \\G\\M\\Tzzz", CultureInfo.InvariantCulture);
            return result;
        }

        public override void WriteJson(JsonWriter writer, DateTime value, JsonSerializer serializer)
        {        
            writer.WriteStartObject();
            writer.WritePropertyName("$Type");
            writer.WriteValue("UTC");
            writer.WritePropertyName("$Value");
            writer.WriteValue(value.ToString("ddd MMM MM yyyy HH:mm:ss \\G\\M\\Tzzz"));
            writer.WriteEnd();       
        }
    }


    class Program
    {

 

        static void Main(string[] args)
        {
                   //  "Wed, 01 Jan 2018 22:12:25 GMT+01:00"
    

            JsonSerializer serializer = new JsonSerializer();


          //  var r345345x = JsonConvert.DeserializeObject<List<TestModel>>(File.ReadAllText("sdfsfsdfsfs.json"));


            var x = JsonConvert.SerializeObject(TestModel.instance(),new JsonSerializerSettings{ PreserveReferencesHandling= PreserveReferencesHandling.Objects });


        }
    }
}
