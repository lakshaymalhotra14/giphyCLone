import { RESULT , RESULT_LOADED ,LOADING  , INCREASE_CURRENT_PAGE , RESET_CURRENT_PAGE , LOAD_MORE} from "../types/giphy.types";


const initialState = {
loading:false ,
gifsResult : [] ,
gifsLoaded : false , 
currentPage:1  ,
loadMore:false
}

export const gifReducer=(state = initialState , action)=>{
switch(action.type){
    case RESULT : {
        return {
            ...state  , 
            loading:false , 
            gifsResult:action.payload ,
            gifsLoaded:true
        }
    }
    case LOADING : {
        return {
            ...state , 
            loading : action.payload , 
        }
    }
    case RESULT_LOADED :{
        return {
            ...state , 
            gifsLoaded:action.payload
        }
    }
    case INCREASE_CURRENT_PAGE:
        return {
            ...state,
            currentPage: state.currentPage + 1
        }
    case RESET_CURRENT_PAGE:
        return {
            ...state,
            currentPage: 1
        }
    case LOAD_MORE :{
        return {
            ...state , 
            loadMore:action.payload
        }
    }
    default : return state;
}
}
