export const actions = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}

export const reducer = (state, {type, payload}) => {
    switch (type) {
        case actions.ADD_DIGIT:
            if(state.overwrite){
                 {
                    return {
                        ...state,
                        currentOperand: payload.digit,
                        overwrite: false,
                    }
                }
            }
            // не даёт цифре 0 повторяться при пустом поле
            if (payload.digit === '0' && state.currentOperand === '0')
                return state
            // не дает (.) повторяться несколько раз
            if (payload.digit === '.' && state.currentOperand.includes('.'))
                return state
            return {
                ...state,
                // добавляет возможность выводить не одну цифру, а множество
                currentOperand: `${state.currentOperand || ''}${payload.digit}`,
            }
        case actions.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null
                }
            }
            if (state.currentOperand == null) return state
            if (state.currentOperand.length === 1) {
                return {...state, currentOperand: null}
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        case actions.CHOOSE_OPERATION: // добавляет возможность текущему операнду и предыдущем взаимодействовать посредством операций в виде сложения и т.д
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }

            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                }
            }

            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }

            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null,
            }
        case actions.CLEAR: // позволяет при нажатии на кнопку АС очистить поле ввода
            //
            return {}
        case actions.EVALUATE: // позволяет вывести результат вычислений
            if (
                state.operation == null ||
                state.currentOperand == null ||
                state.previousOperand == null
            ) {
                return state
            }
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
            }
    }
}

// добавление вычисления двух операндов
const evaluate = ({currentOperand, previousOperand, operation}) => {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let computation = ""
    switch (operation) {
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "*":
            computation = prev * current
            break
        case "/":
            computation = prev / current
            break
    }

    return computation.toString()
}