import React, {Component} from 'react'
import classes from './ListAction.module.css'
import deleteIcon from '../../images/delete_icon.png'
import editIcon from '../../images/edit_icon.png'

class ListAction extends Component{

  onAction = action => () => {
    const item = this.props.dataKey;
    switch(action){
      case 'edit':
        this.props.onEdit(item)
        break;
      case 'delete':
        this.props.onDelete(item)
        break;
      default:
        break;
    }
  }

  render(){
    return (
        <div className={classes.container}>
            <div className={classes.adjacent} onClick={this.onAction('edit')}><img src={editIcon} alt="" style={{width: '20px'}}/></div>
            <div className={classes.adjacent} onClick={this.onAction('delete')}><img src={deleteIcon} alt="" style={{width: '16px'}}/></div>
        </div>
    );
  }

}


export default ListAction;
