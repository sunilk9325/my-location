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
        <BrowserRouter>
          <Header />
          <Switch>
              <Route path="my-location/" exact component={List}/>
              <Route path="my-location/add-location" exact component={AddLocation}/>
              <Route path="my-location/add-location/:id" exact component={AddLocation}/>
              <Route path="my-location/update-location/:id" exact component={AddLocation}/>
              <Route path="my-location/facility-time" exact component={FacilityTime}/>
              <Route path="my-location/update-facility-time/:id" exact component={FacilityTime}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}

export default Location;
