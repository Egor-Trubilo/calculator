import React from 'react';
import {actions} from "./actions";
import './styles/stylesByCalculator.css'

const DigitButton = ({dispatch, digit}) => {
    return (

        <button onClick={() => dispatch(
            {type: actions.ADD_DIGIT, payload: {digit}})}>
            {digit}
        </button>

    );
};

export default DigitButton;