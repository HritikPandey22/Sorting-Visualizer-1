import React from 'react';
import './controller.css';

const controller = (props) => {
    return(
    <div className="containerControl">
        <div className = "temp">
            <label className="Clabel">Size</label>
            <input type="range" 
                    min="50" max="100" 
                    onChange = {props.sizeChanger}/>
        </div>

        <div className = "temp">
            <label className="Clabel">Speed</label>
            <input type="range"
                min="2" max="20" 
                onChange = {props.speedChanger}/>
        </div>

        <div className = "temp">
            <label className="Clabel">Color</label>
            <input type="color"
                onChange = {props.colorChanger}/>
        </div>
    </div>
    );
}

export default controller;