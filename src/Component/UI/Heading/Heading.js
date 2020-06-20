import React, {Component} from 'react';
import classes from './Heading.module.css';

class Heading extends Component{

  render(){
    return (
        <div style={this.props?.style} className={classes[this.props.type]}>
            {this.props.children}
        </div>
    );
  }
}

export default Heading;
