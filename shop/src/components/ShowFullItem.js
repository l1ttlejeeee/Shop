import React, { Component } from 'react'

export class ShowFullItem extends Component {
  render() {
    return (
      <div className='full-item'>
        <div>
        <img src ={"./img/" + this.props.item.imageFileName} alt="ddd" onClick={() => this.props.onShowItem(this.props.item)}/>
        <h2>{this.props.item.title}</h2>
        <b>{this.props.item.price}₴</b>
        <div className='add-to-cart' onClick={() => this.props.addToOrder(this.props.item)}>+</div>
        </div>
      </div>
    )
  }
}

export default ShowFullItem