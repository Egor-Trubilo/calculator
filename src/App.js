import './styles/stylesByCalculator.css'
import {useReducer} from "react";
import {actions, reducer} from "./actions";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

const integerFormatter = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
})
const formatOperand = (operand) => {
  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return integerFormatter.format(integer)
  return `${integerFormatter.format(integer)}.${decimal}`
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] =
      useReducer(reducer,
          {}
      )
  return (
    <div className="App">
      <div className = 'calcGrid'>
        <div className='output'>
          <div className='previousOperand'>{formatOperand(previousOperand)} {operation}</div>
          <div className='currentOperand'>{formatOperand(currentOperand)}</div>
        </div>
        <button className='bigBtn' onClick={()=> dispatch(
            {type: actions.CLEAR})}>AC</button>
        <button  onClick={()=> dispatch(
            {type: actions.DELETE_DIGIT})}>DEL</button>
        <OperationButton operation='/' dispatch={dispatch}/>
        <DigitButton digit='1' dispatch={dispatch}/>
        <DigitButton digit='2' dispatch={dispatch}/>
        <DigitButton digit='3' dispatch={dispatch}/>
        <OperationButton operation='*' dispatch={dispatch}/>
        <DigitButton digit='4' dispatch={dispatch}/>
        <DigitButton digit='5' dispatch={dispatch}/>
        <DigitButton digit='6' dispatch={dispatch}/>
        <OperationButton operation='+' dispatch={dispatch}/>
        <DigitButton digit='7' dispatch={dispatch}/>
        <DigitButton digit='8' dispatch={dispatch}/>
        <DigitButton digit='9' dispatch={dispatch}/>
        <OperationButton operation='-' dispatch={dispatch}/>
        <DigitButton digit='.' dispatch={dispatch}/>
        <DigitButton digit='0' dispatch={dispatch}/>
        <button className='bigBtn' onClick={()=> dispatch(
            {type: actions.EVALUATE})}>=</button>

      </div>
    </div>
  );
}

export default App;
