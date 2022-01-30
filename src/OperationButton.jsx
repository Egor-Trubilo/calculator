import React from 'react';
import {actions} from "./actions";
import './styles/stylesByCalculator.css'

const OperationButton = ({dispatch, operation}) => {
    return (

            <button onClick={() => dispatch(
                {type: actions.CHOOSE_OPERATION, payload: {operation}})}>
                {operation}
            </button>


    );
};

export default OperationButton;