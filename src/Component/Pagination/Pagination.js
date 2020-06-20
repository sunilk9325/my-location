import React, {Component} from 'react'
import classes from './Pagination.module.css'
import arrowLeft from '../../images/arrow_left.png'
import arrowRight from '../../images/arrow_rght.png'
import arrowMostLeft from '../../images/arrow_mostleft.png'
import arrowMostRight from '../../images/arrow_mostright.png'

class Pagination extends Component{

  changePerPage = (evt) => {
    this.props.changePerPage(evt.target.value)
  }

  changeCurrentPage = symbol => (evt) => {
    let currentPage = this.props.currentPage
    let totalPage = Math.ceil(this.props.total/this.props.perPage)
    let toPage
    switch(symbol){
      case '-':
        toPage = 1;
        break;
      case '-1':
        toPage = currentPage - 1;
        break;
      case '+1':
        toPage = currentPage + 1;
        break;
      case '+':
        toPage = totalPage
        break;
      default:
          break;
    }

    if(toPage < 1) toPage = 1
    if(toPage > totalPage) toPage = totalPage
    this.props.changePage(toPage)
  }

  render(){
    const perPage = [2,5,10,15,20]
    return (
        <div className={classes.container}>
            <div className={classes.adjacent}>items per page:</div>
            <div className={classes.dropMenu + " " + classes.sepration}>
                <select name="per_page" onChange={this.changePerPage}> 
                {
                    perPage.map(item => <option key={item} value={item}>{item}</option>)
                }
                </select>
            </div>
              <div className={classes.sepration}>{this.props.fromto} of {this.props.total}</div>
            <div onClick={this.changeCurrentPage('-')} className={classes.adjacent}><img src={arrowMostLeft} alt="" style={{width: '15px'}}/></div>
            <div onClick={this.changeCurrentPage('-1')} className={classes.adjacent}><img src={arrowLeft} alt="" style={{width: '11px'}}/></div>
            <div onClick={this.changeCurrentPage('+1')} className={classes.adjacent}><img src={arrowRight} alt="" style={{width: '14px'}}/></div>
            <div onClick={this.changeCurrentPage('+')} className={classes.adjacent}><img src={arrowMostRight} alt="" style={{width: '15px'}}/></div>
            
        </div>
    );
  }

}


export default Pagination;
