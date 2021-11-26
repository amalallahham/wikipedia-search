
const initialState = {
    inputValue : '',
    data: [],
    progress: false
}

const reducer = (state = initialState, action) => {
     switch (action.type) {
        case 'INPUT_CHANGED': 
            return Object.assign({} , state , { inputValue : action.value });
        
        case 'SEARCH_VALUES': 
        return Object.assign({} , state , { data : action.value });

        case 'CLEAR_SEARCH_VALUES': 
        return Object.assign({} , state , { data : initialState.data });

        case 'PROGRESS': 
        console.log(action.value)
        return Object.assign({} , state , { progress : action.value });

        default: 
            return state
    }

}


export default reducer