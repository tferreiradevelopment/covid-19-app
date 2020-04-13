import React from 'react';
import {fetchCountries} from '../api/api';

const Countries = () => {
    fetchCountries();
    return (
        <div>SELECT</div>
    );
}

export default Countries;