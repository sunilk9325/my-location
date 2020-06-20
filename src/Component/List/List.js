import React, {Component} from 'react'
import classes from './List.module.css';
import Heading from './../UI/Heading/Heading'
import Serial from './../UI/Serial/Serial'
import Pagination from './../Pagination/Pagination'
import ListAction from './../ListAction/ListAction'
import location from '../../images/location.png'

import db from './../../Services/DBService';

class List extends Component{

  constructor(props){
    super(props)

    this.state = {
      locations: [],
      total: 0,
      perPage: 2,
      currentPage: 1,
      start: 1,
      end: 5,
      notification: ''
    }
  }

  getLocations = async () => {
    const allresults = await db.keys()
    let locations = []
    
    let requests = allresults.map(async (item) => {
      const location = await db.get(item)
      location.key = item
      locations.push(location)
    })

    await Promise.all(requests);
    return locations
  }

  async componentDidMount(){
    let locations = await this.getLocations()
    const count = locations.length
    if(count > 0){
      const start = (this.state.currentPage === 1) ? 0 : ((this.state.currentPage-1)*this.state.perPage)
      const end = this.state.perPage*this.state.currentPage
      const selectedLocations = locations.slice(start, end)

      this.setState({
        locations: selectedLocations,
        total: count,
        start: start+1,
        end: (end > count) ? count : end
      })
    } 
  }

  changePerPage = async (perPage) => {
    let locations = await this.getLocations()
    
    const start = (this.state.currentPage === 1) ? 0 : ((this.state.currentPage-1)*perPage)
    const end = perPage*this.state.currentPage
    const selectedLocations = locations.slice(start, end)

    this.setState({
      locations: selectedLocations,
      perPage: perPage,
      start: start+1,
      end: (end > this.state.total) ? this.state.total : end
    })

  }

  changePage  = async (currentPage) => {
    let locations = await this.getLocations()

    const start = (currentPage === 1) ? 0 : ((currentPage-1)*this.state.perPage)
    const end = this.state.perPage*currentPage
    const selectedLocations = locations.slice(start, end)

    this.setState({
      locations: selectedLocations,
      currentPage: currentPage,
      start: start+1,
      end: (end > this.state.total) ? this.state.total : end
    })

  }

  onDelete = async (item) => {
    await db.delete(item)

    let locations = await this.getLocations()
    const count = locations.length
    
    if(count > 0){
      const start = (this.state.currentPage === 1) ? 0 : ((this.state.currentPage-1)*this.state.perPage)
      const end = this.state.perPage*this.state.currentPage
      const selectedLocations = locations.slice(start, end)

      this.setState({
        locations: selectedLocations,
        total: count,
        start: start+1,
        end: (end > count) ? count : end
      })
    } else {
      this.setState({
        locations: [],
        total: count
      })
    }
    
  }

  onEdit = item => {
    this.props.history.push(`/update-location/${item}`)
  }

  render(){

    if(this.state.total === 0){
      return (
        <div className={classes.container}>
            <div className={classes.box}>
            <div>
                <img src={location} alt="" />
            </div>
            <div>
            <h4>Kindly Add Your Location First</h4>
            <p>There is no location added right now</p>
            </div>
            </div>
        </div>
      )
    }else{
      return (
        <div>
            <table cellSpacing="0" cellPadding="0">
                <thead>
                    <tr className={classes.strip}>
                        <th><Heading type="tableHead"></Heading></th>
                        <th><Heading type="tableHead">Location Name</Heading></th>
                        <th><Heading type="tableHead">Address</Heading></th>
                        <th><Heading type="tableHead">Phone No.</Heading></th>
                        <th><Heading type="tableHead"></Heading></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    this.state.locations.map((item, index) => (
                      <tr key={this.state.start+index} className={classes.strip}>
                        <td><Serial>{this.state.start+index}</Serial></td>
                        <td><Heading type="tableRow">{item?.location_name}</Heading></td>
                        <td>
                          <Heading type="tableRow">
                            {`${item?.address_line_1} ${item?.suite_no? ', ' : ''} ${item?.suite_no} ${item?.city? ', ' : ''} ${item?.city} ${item?.state? ', ' : ''} ${item?.state}`}
                          </Heading></td>
                        <td><Heading type="tableRow">{item?.phone_number}</Heading></td>
                        <td style={{width: '5%'}}>
                          <ListAction dataKey={item?.key} onDelete={this.onDelete} onEdit={this.onEdit}/>
                        </td>
                      </tr>
                    ))
                  }
                    

                    <tr className={classes.strip}>
                        <td colSpan="5"><Pagination perPage={this.state.perPage} currentPage={this.state.currentPage} total={this.state.total} fromto={`${this.state.start}-${this.state.end}`} changePerPage={this.changePerPage} changePage={this.changePage}/></td>
                    </tr>
                </tbody>
            </table>
        </div>
      )
    }
  }

}


export default List;
