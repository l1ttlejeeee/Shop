import React, { useState, useContext, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { UserContext } from "../contexts/UserContextProvider";
import Order from "./Order";
import { Link } from "react-router-dom";
import {data} from "../Data.js";


const showNothing = () => {
    return (<div className='empty'> 
    <h2>Добавте товари</h2>
    </div>)
}

export default function Header(props) {

    const { orders } = props;

    let price = orders
      .map(order => order.price)
      .reduce((prev, current) => prev + current, 0);

    let title = orders.map(order => order.name).join(', ');

    let [cartOpen, setCartOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpener = () => {
        setIsModalOpen(prev => !prev);

    }

    function wait(delay) {
        return new Promise(resolve => {
          setTimeout(resolve, delay);
        });
      }

      function request(url, method, data) {
        const options = { method };
      
        if (data) {
          options.body = JSON.stringify(data);
          options.headers = {
            'Content-Type': 'application/json; charset=UTF-8',
          };
        }
      
        return wait(300)
          .then(() => fetch(data.API_URL + url), options)
          .then(response => {
            if (!response.ok) {
              throw new Error();
            }
            return response.json();
          });
      }

    const post = (url, data) => {
        return request(url, {
            method: 'POST',
            headers: { "Content-Type" : "application.json"},
            body: JSON.stringify(data),
        });
    }

    async function postData(url = "", data = {}) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(data),
        });
        return response.json(); 
      }

    const client = {
        post: (url, data) => request(url, 'POST', data),
    };

  return (
    <header>
        <div className="header-wrapper">
            <img src="img/logo.png" className="logo"></img>        
            <ul className='nav'>
                <li>Про нас</li>
                <li>Особистий кабінет</li>
            </ul>
            <FaShoppingBag onClick={() => setCartOpen(cartOpen = !cartOpen)} className={`shop-cart-button ${cartOpen && 'active'}`}/>

            {cartOpen && (
                <div className="shop-cart">
                   {props.orders.length > 0 ? 
                   ShowOrders(props, handleModalOpener, isModalOpen) : showNothing()}
                </div>
            )}
        </div>
        <div className='presentation'>
        </div>

        {isModalOpen && (
        <div className="orderFromWrapper">
          <form 
            className="orderForm" 
            onSubmit={(e) => {
                e.preventDefault();
                const event = e.nativeEvent.target.elements;
                const name = event.name.value;
                const phone = event.phone.value;
                const orderId = 2;
                const userId = -1;
                Promise.all(
                   postData(data.API_URL + '/UnregisteredUser', {name, phone, orderId}),
                   postData(data.API_URL + '/Order', {title, price, userId})
                )
            }} 
          >
            <input type="text" name="name" required placeholder="Ім'я"/>
            <input type="tel" name="phone" required placeholder="Телефон" />
            <button type="submit">Купить</button>
            <button className="cross" type="button" onClick={handleModalOpener}>Закрити</button>
          </form>
        </div>
      )}
    </header>
  )
}

const ShowOrders = (props, handleModalOpener, isModalOpen) =>  {
    const { user } = useContext(UserContext);

    const { orders } = props;

    let sum = orders
      .map(order => order.price)
      .reduce((prev, current) => prev + current, 0);

 return(
 <div>
    {!isModalOpen && (
        <>
             { props.orders.map(el => (<Order deleteOrder={props.deleteOrder} key={el.id} item={el}/>)) }
     <div className="orderSum">
     <p className="sum">Сума: {new Intl.NumberFormat().format(sum)}₴</p>
     </div>
     {user ? (
        'user'
     ) : (
        'not logged'
     )}
      <button className="orderButton" onClick={handleModalOpener}>Замовити</button></>
    )}
    </div>
 )
}