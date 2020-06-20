import React, {Component} from 'react';
import classes from './Serial.module.css';

class Serial extends Component{

  render(){
    return (
        <div className={classes.round}>
            {this.props.children}
        </div>
    );
  }
}

export default Serial;
