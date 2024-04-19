import {ACTIONS} from "./Calculator";
const OperationButton=({dispatch, operation, className})=>{
    return (
        <button  className={className} onClick={() => dispatch({type:ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>
            {operation}
        </button>
    )
}

export default OperationButton;