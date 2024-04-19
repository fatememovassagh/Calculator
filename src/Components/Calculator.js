import './Calculator.css'
import React, {useReducer} from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import DarkModeToggle from "./Darkmode";

export const ACTIONS = {
    ADD_DIGIT: "add_digit",
    CHOOSE_OPERATION: "choose_operation",
    DELETE_DIGIT: "del_digit",
    CLEAR: "clear",
    EVALUATE: "evaluate"
}

function resultReducer(state, {type, payload}) {
    switch (type) {
        // When digit buttons are clicked
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                if (payload.digit !== '.') {
                    return {
                        ...state,
                        overwrite: false,
                        currentOperand: payload.digit
                    }
                } else {
                    return {
                        ...state,
                        overwrite: false,
                        currentOperand: '0.'
                    }
                }

            }
            // Prevent entering '0' at the beginning of a number unless it is '.'
            if (state.currentOperand === '0' && payload.digit !== '.') {
                return {
                    ...state,
                    currentOperand: payload.digit
                }
            }
            // Prevent entering more than one '.' in a number
            if (payload.digit === '.' && state.currentOperand?.includes('.')) {
                return state;
            }
            // If the first digit is '.' ,instead of '.' print '0.'
            if (payload.digit === '.' && state.currentOperand === null) {
                return {...state, currentOperand: '0.'};
            }
            // Limit the length of the digits entered by user
            if (state.currentOperand?.length >= 10) {
                return state;
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            };

        case ACTIONS.CHOOSE_OPERATION:
            // if clicks on operation multiple times
            if (state.currentOperand === null && state.previousOperand === null) {
                return {
                    ...state,
                    operation: null,
                    previousOperand: null,
                    currentOperand: null
                }
            }
            // If the user enters an operation right after the other
            if (state.currentOperand === null) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }
            // Computing
            if (state.previousOperand !== null) {
                return {
                    ...state,
                    previousOperand: evaluate(state),
                    operation: payload.operation,
                    currentOperand: null
                };
            }
            return {
                ...state,
                operation: payload.operation,
                previousOperand: `${state.currentOperand || ""}`,
                currentOperand: null
            };

        case ACTIONS.EVALUATE:
            if (state.currentOperand === null) {
                return state
            }
            // Use the variable 'overwrite' to overwrite the result of the previous computation
            return {
                ...state,
                overwrite: true,
                currentOperand: evaluate(state) || 0,
                operation: null,
                previousOperand: null
            };

        case ACTIONS.DELETE_DIGIT:
            return {
                ...state,
                currentOperand: `${state.currentOperand.substring(0, state.currentOperand.length - 1)}`
            };

        case ACTIONS.CLEAR:
            return {
                ...state,
                operation: null,
                currentOperand: null,
                previousOperand: null
            };

        default :
            return state;

    }

    function evaluate({operation, previousOperand, currentOperand}) {
        console.log('operation,previousOperand ,currentOperand', operation, previousOperand, currentOperand)
        const prev = parseFloat(previousOperand)
        const curr = parseFloat(currentOperand)
        let computation
        switch (operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '÷':
                // Prevent resulting Error
                if (curr === 0) {
                    computation = null
                    break
                }
                computation = prev / curr
                break
            default :
                return computation = null;
        }
        // Shrink the length of a number by using exponential function (for numbers with more than 7 digits)
        if (computation?.toString().length > 7) {
            computation = computation?.toExponential(2)
        }
        return computation?.toString()
    }
}

const Calculator = (props) => {
    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(resultReducer, {
        currentOperand: null,
        previousOperand: null,
        operation: null
    })
    return (
        <React.Fragment>
            <div
                className="calculator grid grid-cols-4 m-auto p-3 text-2xl bg-white dark:bg-slate-950 rounded-lg text-slate-900 dark:text-slate-200 border-2 dark:border-0 border-opacity-20">
                <DarkModeToggle/>
                <div className="calc-display col-span-4 w-1/4 text-slate-900 dark:text-white rounded-t-lg">
                    <div className="text-lg mb-2">{previousOperand}{operation}</div>
                    <div className="text-4xl">{currentOperand}</div>
                </div>
                <button className="col-span-2 bg-neutral-200 dark:bg-neutral-600 rounded-xl m-1"
                        onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC
                </button>
                <button className="bg-neutral-200 dark:bg-neutral-600 rounded-xl m-1"
                        onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL
                </button>
                <OperationButton className="bg-blue-300 dark:bg-blue-700 rounded-xl text-4xl m-1" operation='÷'
                                 dispatch={dispatch}/>
                <div className="col-span-3 grid grid-cols-3 dark:text-blue-400 ">
                    <DigitButton className="bg-indigo-100 dark:bg-slate-800	rounded-xl m-1" digit='1'
                                 dispatch={dispatch}/>
                    <DigitButton className="bg-indigo-100 dark:bg-slate-800	rounded-xl m-1" digit='2'
                                 dispatch={dispatch}/>
                    <DigitButton className="bg-indigo-100 dark:bg-slate-800	rounded-xl m-1" digit='3'
                                 dispatch={dispatch}/>
                    <DigitButton className="bg-indigo-100 dark:bg-slate-800	rounded-xl m-1" digit='4'
                                 dispatch={dispatch}/>
                    <DigitButton className="bg-indigo-100 dark:bg-slate-800 rounded-xl m-1" digit='5'
                                 dispatch={dispatch}/>
                    <DigitButton className="bg-indigo-100 dark:bg-slate-800 rounded-xl m-1" digit='6'
                                 dispatch={dispatch}/>
                    <DigitButton className="bg-indigo-100 dark:bg-slate-800 rounded-xl m-1" digit='7'
                                 dispatch={dispatch}/>
                    <DigitButton className="bg-indigo-100 dark:bg-slate-800 rounded-xl m-1" digit='8'
                                 dispatch={dispatch}/>
                    <DigitButton className="bg-indigo-100 dark:bg-slate-800 rounded-xl m-1" digit='9'
                                 dispatch={dispatch}/>
                    <DigitButton className="col-span-2 bg-indigo-100 dark:bg-slate-800  rounded-xl m-1" digit='0'
                                 dispatch={dispatch}/>
                    <DigitButton className="bg-indigo-100 dark:bg-slate-800 rounded-xl m-1" digit='.'
                                 dispatch={dispatch}/>
                </div>
                <div className="col-span-1 grid grid-cols-1 text-4xl dark:text-white  ">
                    <OperationButton className="bg-blue-300 dark:bg-blue-700 rounded-xl m-1 pt-3" operation='*'
                                     dispatch={dispatch}/>
                    <OperationButton className="bg-blue-300 dark:bg-blue-700 rounded-xl m-1 pb-1" operation='+'
                                     dispatch={dispatch}/>
                    <OperationButton className="bg-blue-300 dark:bg-blue-700 rounded-xl m-1" operation='-'
                                     dispatch={dispatch}/>
                    <button className="bg-blue-300 dark:bg-blue-700 rounded-xl m-1"
                            onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=
                    </button>

                </div>
            </div>
        </React.Fragment>)
}

export default Calculator;