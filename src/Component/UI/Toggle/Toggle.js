import React, {Component} from 'react';
import classes from './Toggle.module.css';

import {connect} from 'react-redux';
import {actionTimeHandling} from './../../../Store/Action';

class Toggle extends Component{

  constructor(props) {
    super(props);

    this.state = {
      active: 'am'
    }

  }

  static getDerivedStateFromProps(props, state){
    if(props.facility_times[props.item][props.name] !== undefined && props.facility_times[props.item][props.name] !== ''){
      return {
        active: props.facility_times[props.item][props.name]
      }
    }
    return null;
    
  }

  setActive = active => async () => {
    const evt = {
      target: {
        name: this.props.name,
        value: active
      }
    }
    
    this.props.TimeHandling(evt, this.props.item, this.props.facility_times)
  }

  render(){

    const classLeft = (this.state.active === 'am')? classes.optionLeft + " " + classes.active : classes.optionLeft
    const classRight = (this.state.active === 'pm')? classes.optionRight + " " + classes.active : classes.optionRight

    return (
        <div style={this.props?.style}>
            <input type="hidden" name={this.props.name} value={this.state.active}/>
            <span className={classLeft} onClick={this.setActive('am')}>AM</span>
            <span className={classRight} onClick={this.setActive('pm')}>PM</span>
        </div>
    );
  }

}

const mapState2Props = state => {
  return { 
    facility_times: state.facility_times
  }
}
const mapDispatch2Props = dispatch => {
  return { 
    TimeHandling: (evt, day, allTimes) => dispatch(actionTimeHandling(evt, day, allTimes)),
  }
}

export default connect(mapState2Props, mapDispatch2Props)(Toggle);


