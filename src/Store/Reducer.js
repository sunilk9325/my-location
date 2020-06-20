import initialState from './Initial';

const Reducer = (state = initialState, action) => {
    switch(action.type){
        case 'INPUT_HANDLING':
            return {
                ...state,
                [action.evt.target.name]: action.evt.target.value
            }
        case 'SAVE_TIME': 
            return {
                ...state,
                save_time: true
            }
        case 'TIME_HANDLING':
            return {
                ...state,
                facility_times: action.clone,
                auto_meridiem: (action.autoMeridiem) ? action.autoMeridiem : ''
            }
        case 'APPLY_TO_CHECKED':
            return {
                ...state,
                facility_times: action.clone
            }
        case 'SET_AUTO_MERIDIEM':
            return {
                ...state,
                auto_meridiem: ''
            }
        case 'SET_LOCATION_DATA':
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

export default Reducer;