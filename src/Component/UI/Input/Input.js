import React, {Component, Fragment} from 'react'
import classes from './Input.module.css'
import Button from './../Button/Button'

class Input extends Component{

  render(){

    let tags = []
    if(this.props.name === 'appointment_pool'){
      const value = this.props.value
      tags = value.split(',');
    }

    return (
          <Fragment>
            <div className={classes.label}>{this.props.label}</div>

            {
              tags.map(item => (
                item !== "" && <Button key={item} type="tags" >{item}</Button>
              ))
            }   

            {this.props?.type === 'text' && (
              <input className={classes.input} 
              type="text" 
              style={this.props?.style}
              name={this.props.name} 
              value={this.props.value}
              placeholder={this.props?.placeholder}
              pattern={this.props.pattern}
              onChange={this.props?.onChange}
              onClick={this.props?.onClick}/>
            )}

            {this.props?.type === 'select' && (
            <select className={classes.select} 
            name={this.props.name}
            value={this.props.value}
            onChange={this.props?.onChange}>
              <option key="please_select" value=""></option>
              {
                this.props.options.map(item => (
                  <option key={item} value={item}>{item}</option>
                ))
              }
            </select>
            )}
          </Fragment>
    );
  }

}

export default Input;
