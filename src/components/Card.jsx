import React from 'react';

const Card = (props) => {
    return (
        <div className="element box">
            <h5>{props.title}</h5>
            <h2 className="number-infected">{props.infected}</h2>
            <p className=" date date-infected">{props.date}</p>
            <p className="info">{props.description}</p>
        </div>
    );
}

export default Card;