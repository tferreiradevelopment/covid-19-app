import axios from 'axios';
const urlAPI = 'https://covid19.mathdro.id/api';

export const fetchCountries = async () => {
    try{
          const response = await axios.get(`${urlAPI}/countries`);
          console.log(response);
    }
    catch(err){
        console.log(err);
    }
}