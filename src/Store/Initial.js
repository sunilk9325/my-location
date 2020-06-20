const initialState = {
    auto_meridiem: '',
    location_name: '',
    address_line_1: '',
    suite_no: '',
    address_line_2: '',
    city: '',
    state: '',
    zipcode: '',
    phone_number: '',
    timezone: '',
    facility_times: {
        Sun: {check:'', from:'', from_meridiem:'', to:'', to_meridiem: ''},
        Mon: {check:'', from:'', from_meridiem:'', to:'', to_meridiem: ''},
        Tue: {check:'', from:'', from_meridiem:'', to:'', to_meridiem: ''},
        Wed: {check:'', from:'', from_meridiem:'', to:'', to_meridiem: ''},
        Thu: {check:'', from:'', from_meridiem:'', to:'', to_meridiem: ''},
        Fri: {check:'', from:'', from_meridiem:'', to:'', to_meridiem: ''},
        Sat: {check:'', from:'', from_meridiem:'', to:'', to_meridiem: ''}
    },
    appointment_pool: '',
    save_time: false
}

export default initialState;