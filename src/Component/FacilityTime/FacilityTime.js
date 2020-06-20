import React, {Component} from 'react'
import classes from './FacilityTime.module.css'
import CentreBlock from './../UI/CentreBlock/CentreBlock'
import Heading from './../UI/Heading/Heading'
import Button from './../UI/Button/Button'
import Toggle from './../UI/Toggle/Toggle'

import {connect} from 'react-redux';
import {actionSaveTime, actionTimeHandling, actionApplyToChecked, actionSetAutoMeridiem} from './../../Store/Action';

class FacilityTime extends Component{

  saveTiming = () => {
    this.props.saveTime()
    this.redirect()
  }

  redirect = () => {
    if(this.props.match.params.id){
      this.props.history.push(`/add-location/${this.props.match.params.id}`)
    }else{
      this.props.history.push("/add-location/redirect")
    }
  }

  render(){

    const allDays = Object.keys(this.props.facility_times)
    const allTimes = this.props.facility_times
    const autoMeridiem = this.props.auto_meridiem
    return (
        <CentreBlock width="800">
            <Heading type="default">Facility Times</Heading>
            <form>
              <table cellSpacing="5" cellPadding="0">
                <tbody>
                  <tr>
                    <th></th>
                    <th>From (in format 5:00)</th>
                    <th>To (in format 7:30)</th>
                    <th></th>
                  </tr>
                  {
                    allDays.map(item => (
                      <tr key={item}>
                        <td style={{color: 'gray', fontSize: '14px', width: '80px'}}>
                          <div className={classes.checkbox}>
                            <input type="checkbox" id={`day_${item}`} name={`check_${item}`} onChange={this.props.TimeHandling(item,allTimes,autoMeridiem)} checked={(this.props.facility_times[item]?.check)? true:false}/>
                            <label htmlFor={`day_${item}`}><span>{item}</span></label>
                          </div>
                          <div className={classes.clearBoth} />
                        </td>
                        <td>
                          <div style={{float: 'left', marginRight: '5px'}}>
                            <input className={classes.input} pattern="^(2[0-3]|[01]?[0-9]):([0-5][0-9])$" type="text" name={`from_${item}`} onChange={this.props.TimeHandling(item,allTimes,autoMeridiem)} onBlur={this.props.setAutoMeridiem} value={this.props.facility_times[item]?.from}/>
                          </div>  
                          <Toggle style={{float: 'left', marginTop: '6px'}} name="from_meridiem" item={item} />
                        </td>
                        <td>
                          <div style={{float: 'left', marginRight: '5px'}}>
                            <input className={classes.input} pattern="^(2[0-3]|[01]?[0-9]):([0-5][0-9])$" type="text" name={`to_${item}`} onChange={this.props.TimeHandling(item,allTimes,autoMeridiem)} onBlur={this.props.setAutoMeridiem} value={this.props.facility_times[item]?.to}/>
                          </div>  
                          <Toggle style={{float: 'left', marginTop: '6px'}} name="to_meridiem" item={item} />
                        </td>
                        <td>
                          <Button type="offWhite" onClick={this.props.applyToChecked(item,allTimes)}>Apply to all checked</Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </form>
            <div className={classes.row}>
              <div className={classes.colRight}>
                <Button type="general" onClick={this.saveTiming}>Save</Button>
              </div>
              <div className={classes.colRight}>
                <Button type="danger" onClick={this.redirect}>Cancel</Button>
              </div>
              <div className={classes.colRight}>
                <Button type="danger" onClick={this.showState}>showstate</Button>
              </div>
            </div>

        </CentreBlock>
    );
  }

}

const mapState2Props = state => {
  return { 
    facility_times: state.facility_times,
    auto_meridiem: state.auto_meridiem,
    save: state.save_time
  }
}
const mapDispatch2Props = dispatch => {
  return { 
    TimeHandling: (day, allTimes, autoMeridiem) => evt => dispatch(actionTimeHandling(evt, day, allTimes, autoMeridiem)),
    saveTime: () => dispatch(actionSaveTime()),
    applyToChecked: (selected, allTimes) => () => dispatch(actionApplyToChecked(selected, allTimes)),
    setAutoMeridiem: () => dispatch(actionSetAutoMeridiem())
  }
}

export default connect(mapState2Props, mapDispatch2Props)(FacilityTime);
