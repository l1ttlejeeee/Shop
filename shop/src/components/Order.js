import React, { Component } from 'react'
import { FaTrash } from 'react-icons/fa'

export class Order extends Component {
  render() {
    return (
      <div className='item'>
         <img src ={"./img/" + this.props.item.imageFileName} />
        <h2>{this.props.item.name}</h2>
        <b>{this.props.item.price} ₴ </b>
        <b>{this.props.item.weight} гр</b>
        <FaTrash className='delete-icon' onClick={() => this.props.deleteOrder(this.props.item.id)}/>
      </div>
    )
  }
}

export default Order