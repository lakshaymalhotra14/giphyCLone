import { RESULT , RESULT_LOADED ,LOADING  , INCREASE_CURRENT_PAGE , RESET_CURRENT_PAGE, LOAD_MORE} from "../types/giphy.types";

export const loadGifs=(currentPage , prevData)=>{
return async(dispatch , getState)=>{
    dispatch({type:RESULT_LOADED , payload:false})
    var response = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=hGcDcj1wagW8SDewFoiH76FIG72qZnFt&limit=20&offset=${currentPage*20}`
        // `https://api.unsplash.com/photos/?client_id=2dYcT43LCN9mMRvUEbqVg3-XROayMhBcLvh-BxbCBWc&per_page=20&page=${currentPage}`
        );
    if(response.status == 200){
        const responseJson = await response.json();
        console.log(responseJson)
        let res = prevData == [] ? [...responseJson.data] : [...prevData, ...responseJson.data]; 
        dispatch({type:RESULT , payload:res})
    }else{
        dispatch({type:LOADING , payload:false})
        dispatch({type:RESULT_LOADED , payload:false})
    }

}
}
export const searchGifs=(currentPage , prevData , text)=>{
return async(dispatch , getState)=>{
    dispatch({type:RESULT_LOADED , payload:false})
    var response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=hGcDcj1wagW8SDewFoiH76FIG72qZnFt&limit=20&offset=${currentPage*20}&q=${text}`
        );
    
    if(response.status == 200){
        const responseJson = await response.json();
        let res = prevData == [] ? [...responseJson.data] : [...prevData , ...responseJson.data]; 

        dispatch({type:RESULT , payload:res})
    }else{
        dispatch({type:LOADING , payload:false})
        dispatch({type:RESULT_LOADED , payload:false})
    }

}
}



export const setloading=(val)=>{
return {
    type: LOADING , 
    payload : val
}
}
export const increaseCurrentPage = () => {
return {
    type: INCREASE_CURRENT_PAGE
}
}

export const resetCurrentPage = () => {
return {
    type: RESET_CURRENT_PAGE
}
}
export const setLoadMore=(val)=>{
return {
    type: LOAD_MORE , 
    payload : val
}
}