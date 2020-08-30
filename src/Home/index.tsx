import React, { useEffect, useState, ChangeEvent } from 'react'; //useState,ChangeEvent, FormEvent
import './styles.css';

import api from '../services/api';
import Graphic from '../Graphic';

const Home = () => {

    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('0');

    const [confirmed, setConfirmed] = useState('0');
    const [recovered, setRecovered] = useState('0');
    const [deaths, setDeaths] = useState('0');

    const [data, setData] = useState('0');
  
    useEffect(() => {
        api.get('/countries')
             .then((response) => {

            const countryInitials = response.data.countries.map((country: { name: string; })=>country.name);
            setCountry(countryInitials);

          });
      }, []);
    
   useEffect(() => {
        api.get('')
           .then((response) => {
              const globalConfirmed = response.data.confirmed.value;
              const globalRecovered = response.data.recovered.value;
              const globalDeaths = response.data.deaths.value;
              setConfirmed(globalConfirmed);
              setRecovered(globalRecovered);
              setDeaths(globalDeaths);
          });
      }, []);

    useEffect(() => {
      if (selectedCountry === '0') {
        return;
      }
      api.get(`https://covid19.mathdro.id/api/countries/${selectedCountry}`)
         .then((response) => {
            const confirm = response.data.confirmed.value;
            // console.log(response.data.confirmed.value);
            setConfirmed(confirm);

            const recover = response.data.recovered.value;
            // console.log(response.data.recovered.value);
            setRecovered(recover);
            
            const death = response.data.deaths.value;
            // console.log(response.data.deaths.value);
            setDeaths(death);
            
            const data = [];
            for (let a=0; a<10; a++) {
              data.push(response.data.lastUpdate[a])
            };
            const time = data.join('');
            setData(time);
          });
     
      }, [selectedCountry]);
  
      useEffect(() => {
        
      if (selectedCountry !== '0') {
        return;
      }
        api.get('')
           .then((response) => {
              const globalConfirmed = response.data.confirmed.value;
              const globalRecovered = response.data.recovered.value;
              const globalDeaths = response.data.deaths.value;
              
              const data = [];
              for(let i=0; i<10; i++){
                data.push(response.data.lastUpdate[i])
              };
              const update = data.join('');
              // console.log(response.data.lastUpdate);
              setConfirmed(globalConfirmed);
              setRecovered(globalRecovered);
              setDeaths(globalDeaths);
              setData(update);
          });
      }, [selectedCountry]);


      function handleSelectCountry(event: ChangeEvent<HTMLSelectElement>) {
      const country = event.target.value;
      setSelectedCountry(country);
    }

  return (

    
          <div id="page-content">
            
            <header>
              <h1>COVID-19</h1>  
            </header>
            
            <div className="details">
              <div className="logo1">
                <h2>Infected</h2>
                  <div className="dados">
                    <h3>{confirmed}</h3>
                  </div>
                <p>{data}</p>
                <p>No of active cases of COVID-19</p>
              </div>

              <div className="logo2">
               <h2>Recovered</h2>
               <div className="dados">
                 <h3>{recovered}</h3>
                 </div>
               <p>{data}</p>
               <p>No of recoveries of COVID-19</p>
              </div>

              <div className="logo3">
                <h2>Deaths</h2>
                  <div className="dados">
                    <h3>{deaths}</h3>
                  </div>
                <p>{data}</p>
                <p>No of deaths caused by COVID-19</p>
              </div>
            </div>
            
            <div className="field-group">
              <div className="field">
                <select
                  name="country"
                  value={selectedCountry}
                  onChange={handleSelectCountry}
                >
                  <option value="0">Global</option>

                  {country.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))} 
                </select>
                <p id="country">Select Country</p>
              </div>
            </div>
            <div>
            </div>

            <Graphic />

          </div>
  );
};

export default Home;
