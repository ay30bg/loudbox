import React, { useState } from 'react';
import './cart.css';

// Sample initial cart data (aligned with mockEvents structure, updated prices)
const initialCartItems = [
  {
    id: 1,
    eventName: 'Davido Live In Concert',
    price: 3000, // Updated to NGN 3000
    quantity: 2,
    eventImage: 'https://wallpapercat.com/w/middle-retina/4/0/2/2250759-2560x1631-desktop-hd-davido-background-image.jpg',
  },
  {
    id: 2,
    eventName: 'Lungu Boy Tour',
    price: 2000, // Updated to NGN 2000
    quantity: 1,
    eventImage: 'https://www.okayafrica.com/media-library/cover-artwork-for-lungu-boy-by-asake.png?id=53143626&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0',
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Handle quantity increase
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle quantity decrease
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle item removal
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-container">
      <div className="cart-title-holder">
        <h3 className="cart-title">Your Cart</h3>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>No tickets in your cart yet!</p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.eventImage}
                  alt={item.eventName}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.eventName}</h4>
                  <p className="cart-item-price">NGN {item.price.toLocaleString()}</p>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-selector">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity-count">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total and Checkout */}
          <div className="cart-total-section">
            <div className="total-details">
              <span className="total-label">Total</span>
              <span className="total-amount">NGN {calculateTotal().toLocaleString()}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => alert('Proceed to checkout')} // Replace with actual checkout logic
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
