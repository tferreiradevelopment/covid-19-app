import React, {useState, useEffect} from 'react';
import Header from './Header';
import Countries from './Countries';
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
                <div className="element box">
                    <h5>Infected</h5>
                    <h2 className="number-infected">{info.infected}</h2>
                    <p className=" date date-infected">{today.toDateString()}</p>
                    <p className="info">Number of active cases of COVID-19</p>
                </div>
                <div className="element box">
                    <h5>Recovered</h5>
                    <h2 className="number-recovered">{info.recovered}</h2>
                    <p className="date date-recovered">{today.toDateString()}</p>
                    <p className="info">Number of recoveries from COVID-19</p>
                </div>
                <div className="element box">
                    <h5>Deaths</h5>
                    <h2 className="number-deaths">{info.deaths}</h2>
                    <p className="date date-deaths">{today.toDateString()}</p>
                    <p className="info">Number of deaths caused by COVID-19</p>
                </div>
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