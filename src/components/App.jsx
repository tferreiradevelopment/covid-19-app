import React, {useState, useEffect} from 'react';
import Header from './Header';
import Countries from './Countries';
import Card from './Card';
import Footer from './Footer';
import {Line,Bar} from 'react-chartjs-2';
import { fetchCountry, fecthDailyGlobalStats, fecthCountriesDaily } from '../api/api';


const App = () =>{
    
    const today = new Date();

    const [isGlobal,setIsGlobal] = useState(true);

    const [info, setInfo] = useState({
        infected:0,
        recovered:0,
        deaths:0,
        date:new Date()
    });

    const [globalInfo, setGlobalInfo] = useState([]);
    
    const dataLineChart = {
            labels: globalInfo.map(({ date }) => date),
            datasets: [{
                label: 'Infected',
                data: globalInfo.map((data) => data.confirmed),
                fill:true,
                borderColor: [
                    'rgba(228, 100, 15, 1)'
                ]
            },{
                label: 'Deaths',
                data: globalInfo.map((data) => data.deaths),
                backgroundColor: [
                    'rgba(30, 231, 114, 0)'
                ],
                borderColor: [
                    'rgba(30, 231, 114, 1)'
                ],
                borderWidth: 2
            }]
        };

        const dataBarChart = {
            labels: ['Infected', 'Recoveries', 'Deaths'],
            datasets: [{
                label: '# of Infected',
                data: [info.infected, info.recovered, info.deaths],
                backgroundColor: [
                    'rgba(228, 100, 15, 1)',
                    'rgba(30, 231, 114, 1)',
                    'rgba(169, 169, 169, 1)'
                ],
                borderColor: [
                    'rgba(228, 100, 15, 1)',
                    'rgba(30, 231, 114, 1)',
                    'rgba(169, 169, 169, 1)'
                ],
                borderWidth: 2
            }]
        };

    const optionsChart= {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    
    useEffect(()=>{
        const fetchGlobalAPI = async () => {
            const currentInfo = await fecthCountriesDaily();
            const daily = await fecthDailyGlobalStats();
            setInfo({
                infected:daily.confirmed.value,
                recovered:daily.recovered.value,
                deaths:daily.deaths.value
            });
            setGlobalInfo(currentInfo);
        } 
        fetchGlobalAPI();
    },[]);

    const setInfoHandler = ()=>{
        setInfo(info);
    }

    const countryChangeHandle= async (country) => {
        let data;
        if(country === '' || country.length > 50){
            return;
        }
        if(country !== "Global"){
            setIsGlobal(false);
            data = await fetchCountry(country);   
        }
        else{
            setIsGlobal(true);
            data = await fecthDailyGlobalStats(country);
        }
        setInfo({
            infected:data.confirmed.value,
            recovered:data.recovered.value,
            deaths:data.deaths.value
        });
    }

    return (
        <div>
            <Header/>
            <div className="grid">
                <Card title="Infected" infected={info.infected} date={today.toDateString()} description="Number of active cases from COVID-19"/>
                <Card title="Recovered" infected={info.recovered} description="Number of recoveries from COVID-19"/>
                <Card title="Deaths" infected={info.deaths} description="Number of deaths caused by COVID-19"/>
            </div>
            <div className="countries-container">
                <Countries countryChangeHandle={countryChangeHandle}/>
            </div>
            <div className="chart-container">
                {isGlobal ?  <Line data={dataLineChart} options={optionsChart} width={100} height={50}/> : <Bar data={dataBarChart} options={optionsChart} width={100} height={50}/>}
            </div>
            <Footer/>
        </div>
    );
};

export default App;