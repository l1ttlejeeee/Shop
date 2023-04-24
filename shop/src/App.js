import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import { AboutPage } from './pages/AboutPage.js'
import {data} from "./Data.js";
import { Link, Route, Routes} from "react-router-dom";


class App extends React.Component {
  refreshList(){
    fetch(data.API_URL+'/Pastila')
    .then(response =>response.json())
    .then(data=>{
      this.setState({items:data});
    });
    
  }
  componentDidMount(){
    console.log(this.state.items);
    this.refreshList();
  }
  constructor(props){
    super(props)
    this.state = {
      orders: [],
      currentItems: [],
      items:[],
      showFullItem: false,
      fullItem: {}
    }
    this.state.currentItems = this.state.items
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
  }
  render(){
  return (
   <div className="wrapper">
    <Header orders = {this.state.orders} deleteOrder={this.deleteOrder}/>
    <Categories chooseCategory={this.chooseCategory}/>

    {/* <Link to="about">About</Link>
    <Link to="personal">Personal</Link> */}

    <Routes> 
      <Route path="/about" element={<AboutPage /> } />
      {/* <Route path="/personal" element={<PersonalPage /> } /> */}
    </Routes>

    <Items onShowItem={this.onShowItem} items ={this.state.currentItems} addToOrder={this.addToOrder}/>


    
    {this.state.showFullItem && <ShowFullItem addToOrder={this.addToOrder} onShowItem={this.onShowItem} item={this.state.fullItem}/>}
    <Footer/>
   </div>
  )
  }

  onShowItem(item){
    this.setState({fullItem: item})
    this.setState({showFullItem: !this.state.showFullItem})
  }

  chooseCategory (category){
    if(category === 'all'){
      this.setState({currentItems: this.state.items})
      return
    }
    this.setState({
      currentItems: this.state.items.filter(el => el.category === category)
    })
  }

  deleteOrder(id){
    this.setState({orders: this.state.orders.filter(el => el.id !== id)})
  }

  addToOrder(item){
    let isInArray = false
    this.state.orders.forEach(el => {
      if(el.id === item.id)
      isInArray = true
    })
    if(!isInArray)
    this.setState({orders: [...this.state.orders, item]})
  }
}

export default App;