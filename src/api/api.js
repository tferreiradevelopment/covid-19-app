import axios from 'axios';
const urlAPI = 'https://covid19.mathdro.id/api';


export const fecthDailyGlobalStats = async () => {
    try{
        const {data} =  await axios.get(`${urlAPI}`);
        return data;
    }
    catch(err){
        console.log(err);
    }
}


export const fecthCountriesDaily = async () => {
    try{
        const {data} =  await axios.get(`${urlAPI}/daily`);
        const info=data.map(({confirmed,deaths,reportDate:date}) => ({confirmed:confirmed.total,deaths:deaths.total,date}));
        return info;
    }
    catch(err){
        console.log(err);
    }
}

export const fetchCountries = async () => {
    try{
          const {data:{countries}} = await axios.get(`${urlAPI}/countries`);
          const info = countries.map( country => country.name);
          info.unshift("Global");
          return info;
    }
    catch(err){
        console.log(err);
    }
}

export const fetchCountry = async (country) => {
    try{
          const {data}= await axios.get(`${urlAPI}/countries/${country}`);
          return data;

    }
    catch(err){
        console.log(err);
    }
}