import * as _ from 'lodash';

export const actionInputHandling  = (evt) => {
    if(evt.target.name === 'phone_number'){
        let phone = evt.target.value.replace(/\D/g, '');
        const match = phone.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
        if (match) {
            phone = `(${match[1]}${match[2] ? ') ' : ''}${match[2]}${match[3] ? '-' : ''}${match[3]}`;
            evt.target.value = phone
        }
    }

    return {type: 'INPUT_HANDLING', evt}
}



export const actionSaveTime = () => {
    return {type: 'SAVE_TIME'}
}



export const actionSetLocationData = (data) => {
    return {type: 'SET_LOCATION_DATA', data}
}



export const actionTimeHandling = (evt, day, allTimes, autoMeridiem) => {

    const clone = _.cloneDeep(allTimes)
    evt.target.name = evt.target.name.replace(`_${day}`, '')

    if(evt.target.name === 'from' || evt.target.name === 'to'){
        let hour, newHour, meridiem
        meridiem = (autoMeridiem) ? autoMeridiem : 'am'
        hour = newHour = evt.target.value.split(':')[0]
        if(hour > 12) newHour = hour-12
        if(hour >= 24) newHour = ''

        if(hour > 12 && hour < 24 && autoMeridiem === ''){
            meridiem = 'pm'
            autoMeridiem = 'pm'
        }
        
        let newValue = evt.target.value.replace(hour, newHour)
        evt.target.value = newValue

        clone[day][`${evt.target.name}_meridiem`] = meridiem
    }

    if(evt.target.type === 'checkbox'){
        clone[day][evt.target.name] = evt.target.checked
    }else{
        clone[day][evt.target.name] = evt.target.value
    }
    return {type: 'TIME_HANDLING', clone, autoMeridiem}
}



export const actionApplyToChecked = (selected, allTimes) => {

    const clone = _.cloneDeep(allTimes)
    const Alldays = Object.keys(clone)
    Alldays.map(item => {
        if(item !== selected && clone[item].check === true){
            clone[item] = { ...clone[selected] }
        }
        return true
    })
    return {type: 'APPLY_TO_CHECKED', clone}
}

export const actionSetAutoMeridiem = () => {
    return {type: 'SET_AUTO_MERIDIEM'}
}   
