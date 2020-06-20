import React, {Component} from 'react'
import Header from './../../Component/Header/Header';
import List from './../../Component/List/List';
import AddLocation from './../../Component/AddLocation/AddLocation';
import FacilityTime from '../../Component/FacilityTime/FacilityTime';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

class Location extends Component{

  render(){

    return (
      <div>
        <BrowserRouter basename="/my-location"/>
          <Header />
          <Switch>
              <Route path="/" exact component={List}/>
              <Route path="/add-location" exact component={AddLocation}/>
              <Route path="/add-location/:id" exact component={AddLocation}/>
              <Route path="/update-location/:id" exact component={AddLocation}/>
              <Route path="/facility-time" exact component={FacilityTime}/>
              <Route path="/update-facility-time/:id" exact component={FacilityTime}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}

export default Location;
