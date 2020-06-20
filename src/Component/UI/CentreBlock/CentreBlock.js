import React, {Component} from 'react';
import classes from './CentreBlock.module.css';

class CentreBlock extends Component{

  render(){
      const boxStyle = (this.props.width) ? {width: `${this.props.width}px`} : {}
      return (
          <div className={classes.container}>
            <div className={classes.box} style={boxStyle}>
              {this.props.children}
            </div>
          </div>
      );
    
  }
}


export default CentreBlock;
