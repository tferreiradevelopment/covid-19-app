import React,{useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {fetchCountries} from '../api/api';


const Countries = ({countryChangeHandle}) => {
    const [countries, setCountries] = useState([]);

    useEffect( () => {
        const fetchAPI = async () =>{
            setCountries( await fetchCountries());
        }
        fetchAPI();
        
    }, []);


    return (
        <Autocomplete
            id="debug"
            options={countries}
            style={{width:300,border:"none"}}
            getOptionLabel={(option) => option}
            onChange={(e) => {
                countryChangeHandle(e.target.innerHTML)
            }}
            defaultValue={"Global"}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a country"
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}

export default Countries;