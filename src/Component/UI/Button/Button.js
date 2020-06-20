import React, {Component} from 'react';
import classes from './Button.module.css';

class Button extends Component{

  render(){
    return (
        <div className={classes[this.props.type]} onClick={this.props?.onClick}>
            {this.props.children}
        </div>
        
    );
  }

}

export default Button;
