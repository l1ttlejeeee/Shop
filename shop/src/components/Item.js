import React, { Component } from 'react'

export class Item extends Component {
  render() {
    return (
      <div className='item'>
       <img src ={"./img/" + this.props.item.imageFileName} alt="ddd" onClick={() => this.props.onShowItem(this.props.item)}/>
        <h2>{this.props.item.name}</h2>
        <b>{this.props.item.price}₴ </b>
        <b>{this.props.item.weight} гр</b>

        <div className='add-to-cart' onClick={() => this.props.addToOrder(this.props.item)}>+</div>
      </div>
    )
  }
}

export default Item