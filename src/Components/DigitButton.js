import {ACTIONS} from "./Calculator";
const DigitButton=({dispatch, digit, className})=>{
    return (
        <button  className={className} onClick={() => dispatch({type:ACTIONS.ADD_DIGIT, payload: {digit}})}>
        {digit}
        </button>
    )
}

export default DigitButton;