import React, { Component } from 'react'

export class Categories extends Component {
    constructor(props){
        super(props)
        this.state = {
            categories: [
                {
                    key: 'all',
                    name: 'Все'
                },
                // {
                //     key: 'one',
                //     name: 'Звичайні'
                // },
                // {
                //     key: 'two',
                //     name: 'Комбіновані'
                // }
            ]
        }
    }
  render() {
    return (
      <div className='categories'>
        {this.state.categories.map(el => (
            <div key={el.key} onClick={() => this.props.chooseCategory('all')}>{el.name}</div>
        ))}
         </div>
    )
  }
}

export default Categories