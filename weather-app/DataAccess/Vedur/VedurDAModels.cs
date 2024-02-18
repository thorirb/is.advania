using System.Xml.Serialization;

/***
* Classes generated using website https://json2csharp.com/code-converters/xml-to-csharp
* with xml taken from this document https://www.vedur.is/media/vedurstofan/XMLthjonusta.pdf
***/
namespace weather_app.DataAccess.Vedur;


[XmlRoot(ElementName="station")]
public class Station { 

    [XmlElement(ElementName="name")] 
    public string Name { get; set; } 

    [XmlElement(ElementName="time")]
    public string Time { get; set; } 

    [XmlElement(ElementName="atime")] 
    public string Atime { get; set; }

    [XmlElement(ElementName="err")] 
    public string Err { get; set; } 

    [XmlElement(ElementName="link")] 
    public string Link { get; set; } 

    [XmlElement(ElementName="T")] 
    public string? Temperature { get; set; } 

    [XmlElement(ElementName="D")] 
    public string? WindDirection { get; set; } 

    [XmlElement(ElementName="F")] 
    public int? WindSpeed { get; set; } 

    [XmlElement(ElementName="W")] 
    public string? WeatherDescription { get; set; } 

    [XmlElement(ElementName="forecast")] 
    public List<Forecast>? Forecasts { get; set; } 

    [XmlAttribute(AttributeName="id")] 
    public int Id { get; set; } 

    [XmlAttribute(AttributeName="valid")] 
    public int Valid { get; set; } 

}

[XmlRoot(ElementName="observations")]
public class Observations { 

    [XmlElement(ElementName="station")] 
    public List<Station> Stations { get; set; } 

    [XmlElement(ElementName="error")] 
    public string Error { get; set; } 
}

[XmlRoot(ElementName="forecast")]
public class Forecast { 

    [XmlElement(ElementName="ftime")] 
    public string Ftime { get; set; } 

    [XmlElement(ElementName="T")] 
    public string? Temperature { get; set; } 

    [XmlElement(ElementName="D")] 
    public string? WindDirection { get; set; } 

    [XmlElement(ElementName="F")] 
    public int? WindSpeed { get; set; } 

    [XmlElement(ElementName="W")] 
    public string? WeatherDescription { get; set; } 
}



[XmlRoot(ElementName="forecasts")]
public class Forecasts { 

    [XmlElement(ElementName="station")] 
    public List<Station> Stations { get; set; } 

    [XmlElement(ElementName="error")] 
    public string Error { get; set; } 
}

// using System.Xml.Serialization;
// XmlSerializer serializer = new XmlSerializer(typeof(Texts));
// using (StringReader reader = new StringReader(xml))
// {
//    var test = (Texts)serializer.Deserialize(reader);
// }

[XmlRoot(ElementName="text")]
public class Text { 

    [XmlElement(ElementName="title")] 
    public string Title { get; set; } 

    [XmlElement(ElementName="creation")] 
    public DateTime Creation { get; set; } 

    [XmlElement(ElementName="valid_from")] 
    public DateTime ValidFrom { get; set; } 

    [XmlElement(ElementName="valid_to")] 
    public DateTime ValidTo { get; set; } 

    [XmlElement(ElementName="content")] 
    public string Content { get; set; } 

    [XmlAttribute(AttributeName="id")] 
    public int Id { get; set; }
}

[XmlRoot(ElementName="texts")]
public class Texts { 

    [XmlElement(ElementName="text")] 
    public List<Text> Text { get; set; } 

    [XmlElement(ElementName="error")] 
    public string Error { get; set; } 
}

