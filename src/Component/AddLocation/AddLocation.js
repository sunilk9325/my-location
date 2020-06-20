import React, {Component} from 'react'
import classes from './AddLocation.module.css'
import CentreBlock from './../UI/CentreBlock/CentreBlock'
import Heading from './../UI/Heading/Heading'
import Input from './../UI/Input/Input'
import Button from './../UI/Button/Button'


import initialState from './../../Store/Initial';
import db from './../../Services/DBService';

import {connect} from 'react-redux';
import {actionInputHandling, actionSetLocationData} from './../../Store/Action';

class AddLocation extends Component{

  constructor(props){
    super(props)
    this.default_facility_times = this.props.facility_times
    
    this.state = {
      error: false,
      error_required: false
    }
  }

  async componentDidMount(){
    let initialload = false;
    let indexDbload = true;
    if(this.props.match.path === '/add-location'){
      initialload = true
    }

    if(this.props.match.path === '/add-location/:id'){
      indexDbload = false
    }

    if(this.props.match.params.id && this.props.match.params.id !== 'redirect'){
      if(indexDbload === true){
        const data = await db.get(this.props.match.params.id)
        this.props.setLocationData(data)
      }
    }

    if(initialload === true){
      this.props.setLocationData(initialState)
    }
  }

  setFacilityTime = evt => {
    console.log(" -- ", this.props)
    if(this.props.match.params.id && this.props.match.params.id !== 'redirect'){
      this.props.history.push(`/update-facility-time/${this.props.match.params.id}`)
    }else{
      this.props.history.push(`/facility-time`)
    }
  }

  redirect = () => {
    this.props.history.push(`/`)
  }

  dataModification = () => {
    const val = {
      location_name: this.props.location_name,
      address_line_1: this.props.address_line_1,
      suite_no: this.props.suite_no,
      address_line_2: this.props.address_line_2,
      city: this.props.city,
      state: this.props.state,
      zipcode: this.props.zipcode,
      phone_number: this.props.phone_number,
      timezone: this.props.timezone,
      facility_times: this.default_facility_times,
      appointment_pool: this.props.appointment_pool
    }

    if(this.props.save_time === true){
      val.facility_times = this.props.facility_times
    }

    return val;
  }

  updateLocation = async () => {
    const val = this.dataModification();
    const res = this.checkValidation(val)

    if(res === true){
      this.setState({
        error: res
      })
    }else{
      const key = this.props.match.params.id
      await db.set(key, val)

      this.props.history.push("/")
    }
  }

  saveLocation = async () => {
    const allresults = await db.keys()
    const count = allresults.length 

    const val = this.dataModification();
    const res = this.checkValidation(val)
    if(res === true){
      this.setState({
        error: res
      })
    }else{
      const key = `location_${count}`
      await db.set(key, val)

      this.props.history.push("/")
    }
  }

  checkValidation = (val) => {
    if(val.location_name === ""){
      this.setState({
        error_required: true
      })
      return true;
    }

    const regPattern = new RegExp('^[A-Za-z0-9\\s]{2,100}$');
    const result = regPattern.test(val.location_name);
    if(result === false) {
      return true;
    }
    
    if(val.zipcode !== ""){
      const regPattern = new RegExp('^[A-Za-z0-9]{5,10}$');
      const result = regPattern.test(val.zipcode);
      if(result === false) {
        return true;
      }
    }

    if(val.phone_number !== ""){
      const regPattern = new RegExp('^[\\(](\\d{3})[\\)][\\s](\\d{3})[\\-](\\d{4})$');
      const result = regPattern.test(val.phone_number);
      if(result === false) {
        return true;
      }
    }
    
    return false;
  }

  render(){

    const allState = ['Assam', 'Delhi', 'Uttar Pradesh', 'Gujrat', 'Mumbai', 'Banglore', 'Pune'] 
    const allTimeZone = ['IST', 'UTC', 'GMT'] 

    const requiredInputStyle = (this.state.error_required)? {border: '0px', borderBottom: '2px solid red', background: '#f3d3d1'} : {}
    return (
        <CentreBlock>
            <Heading type="default">{(this.props.match.params.id && this.props.match.params.id !== 'redirect') ? 'Update Location' : 'Add Location'}</Heading>
            {this.state.error && <Heading type="default" style={{color: '#a84a43'}}>Data is invalid or missing</Heading>}
            <form>
            <div className={classes.row}>
              <div className={classes.col} style={{width: '100%'}}>
                <Input type="text" style={requiredInputStyle} pattern="^[A-Za-z0-9\s]{2,100}$" label="Location Name*" name="location_name" onChange={this.props.inputHandling} value={this.props.location_name}/>
              </div>
            </div>
            <div className={classes.clearBoth} />
            
            <div className={classes.row}>
              <div className={classes.col} style={{width: '48%'}}>
                <Input type="text" label="Address Line 1" name="address_line_1" onChange={this.props.inputHandling} value={this.props.address_line_1}/>
              </div>
              <div className={classes.col} style={{width: '48%'}}>
                <Input type="text" label="Suite No." name="suite_no" onChange={this.props.inputHandling} value={this.props.suite_no}/>
              </div>
            </div>
            <div className={classes.clearBoth} />
            
            <div className={classes.row}>
              <div className={classes.col} style={{width: '48%'}}>
                <Input type="text" label="Address Line 2" name="address_line_2" onChange={this.props.inputHandling} value={this.props.address_line_2}/>
              </div>
              <div className={classes.col} style={{width: '23%'}}>
                <Input type="text" label="City" name="city" onChange={this.props.inputHandling} value={this.props.city}/>
              </div>
              <div className={classes.col} style={{width: '23%'}}>
                <Input type="select" label="State" name="state" options={allState} onChange={this.props.inputHandling} value={this.props.state}/>
              </div>
            </div>
            <div className={classes.clearBoth} />

            <div className={classes.row}>
              <div className={classes.col} style={{width: '23%'}}>
                <Input type="text" pattern="^[A-Za-z0-9]{5,10}$" label="Zipcode" name="zipcode" onChange={this.props.inputHandling} value={this.props.zipcode}/>
              </div>
              <div className={classes.col} style={{width: '23%'}}>
                <Input type="text" pattern="^[\(](\d{1,3})[\)][\s](\d{0,3})[\-](\d{4})$" label="Phone Number" name="phone_number" onChange={this.props.inputHandling} value={this.props.phone_number}/>
              </div>
              <div className={classes.col} style={{width: '48%'}}>
                <Input type="select" label="Time Zone" name="timezone" options={allTimeZone} onChange={this.props.inputHandling} value={this.props.timezone}/>
              </div>
            </div>
            <div className={classes.clearBoth} />

            <div className={classes.row}>
              <div className={classes.col} style={{width: '48%'}}>
                <Input type="text" label="Facility Times" name="facility_times" onChange={this.props.inputHandling} onClick={this.setFacilityTime} placeholder="Click to set/update time" />
              </div>
              <div className={classes.col} style={{width: '48%'}}>
                <Input type="text" label="Appointment Pool" name="appointment_pool" onChange={this.props.inputHandling} value={this.props.appointment_pool} />
              </div>
            </div>
            <div className={classes.clearBoth} />

            <div className={classes.row}>
              <div className={classes.colRight}>
                <Button type="general" onClick={(this.props.match.params.id && this.props.match.params.id !== 'redirect') ? this.updateLocation : this.saveLocation}>{(this.props.match.params.id && this.props.match.params.id !== 'redirect') ? 'Update' : 'Save'}</Button>
              </div>
              <div className={classes.colRight}>
                <Button type="danger" onClick={this.redirect}>Cancel</Button>
              </div>
            </div>
            </form>
        </CentreBlock>
    );
  }

}

const mapState2Props = state => {
  return { 
    location_name: state.location_name,
    address_line_1: state.address_line_1,
    suite_no: state.suite_no,
    address_line_2: state.address_line_2,
    city: state.city,
    state: state.state,
    zipcode: state.zipcode,
    phone_number: state.phone_number,
    timezone: state.timezone,
    facility_times: state.facility_times,
    appointment_pool: state.appointment_pool,
    save_time: state.save_time
  }
}
const mapDispatch2Props = dispatch => {
  return { 
    inputHandling: (evt) => dispatch(actionInputHandling(evt)),
    setLocationData: data => dispatch(actionSetLocationData(data))
  }
}

export default connect(mapState2Props, mapDispatch2Props)(AddLocation);

