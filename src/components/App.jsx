import React, {useState} from 'react';
import Header from './Header';
import Countries from './Countries';
import Footer from './Footer';
import {Line} from 'react-chartjs-2';


const App = () =>{
    
    const today = new Date();


    const [info, setInfo] = useState({
        infected:0,
        recovered:0,
        deaths:0
    });
    
    const dataChart = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Infected',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(228, 100, 15, 0)'
                ],
                borderColor: [
                    'rgba(228, 100, 15, 1)'
                ],
                borderWidth: 2
            },{
                label: '# of Recoveries',
                data: [28, 8, 30, 2, 2, 3],
                backgroundColor: [
                    'rgba(30, 231, 114, 0)'
                ],
                borderColor: [
                    'rgba(30, 231, 114, 1)'
                ],
                borderWidth: 2
            },{
                label: '# of Deaths',
                data: [32, 4, 10, 2, 24, 37],
                backgroundColor: [
                    'rgba(169, 169, 169, 0)'
                ],
                borderColor: [
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
    
    const setInfoHandler = ()=>{
        setInfo(info);
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
            <Countries/>
            <div className="chart-container">
                <Line data={dataChart} options={optionsChart} width={100} height={50}/>
            </div>
            <Footer/>
        </div>
    );
};

export default App;