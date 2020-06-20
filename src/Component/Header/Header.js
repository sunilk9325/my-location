import React, {Component} from 'react'
import classes from './Header.module.css';
import Heading from '../UI/Heading/Heading';
import Button from '../UI/Button/Button';
import {NavLink} from 'react-router-dom';

class Header extends Component{

  render(){
    return (
        <div>
            <div className={classes.leftSection}>
              <NavLink to="/">
                <Heading type="default">Locations</Heading>
              </NavLink>
            </div>
            <div className={classes.rightSection}>
              <NavLink to="/add-location">
                <Button type="generalRound">+ Add Location</Button>
              </NavLink>
            </div>
            <div className={classes.clearBoth}></div>
        </div>
    );
  }

}

export default Header;
