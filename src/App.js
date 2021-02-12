import React,{useState,useEffect} from 'react';
import './index.css';
const api = {
  key : "11d7888124f14e1aef642dad695d7d92",
  base : "https://api.openweathermap.org/data/2.5"
}
function App() {
  let d = new Date();
  let mnth = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  let dy = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState('');
  const [day,setDay] = useState(dy[d.getDay()]);
  const [date,setDate] = useState(d.getDate());
  const [month,setMonth] = useState(mnth[d.getMonth()]);
  const [year,setYear] = useState(d.getFullYear());
  const [time,setTime] = useState(d.toLocaleTimeString());

  const search = e=>{
    if(e.key==="Enter"){
      fetch(`${api.base}/weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setWeather(result);
        setQuery('');
        console.log(result);
      })
    }
  }
  const updateTime = ()=>{
    d = new Date();
    let mnth = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    let dy = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    setMonth(mnth[d.getMonth()]);
    setDay(dy[d.getDay()]);
    setYear(d.getFullYear());
    setDate(d.getDate());
    setTime(d.toLocaleTimeString())
  }
  setInterval(updateTime,1000)
    
  return (
    <div className={typeof weather.main!="undefined"?(weather.main.temp>16?'warm':'app'):'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={e=>setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main!="undefined"?(
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
            </div>
          </div>
          ):(weather.cod==404?(
            <div className="location-box">
              <div className="location">Can't find the City.</div>
            </div>
          ):'')}
          <div className="date">{day}, {date} {month} {year}, {time}</div>
          {typeof weather.main!="undefined"?(
            <div>
            <div className="weather-box">
              <div className="temp">{weather.main?.temp}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
          ):('')}    
      </main>
    </div>
  );
}

export default App;
