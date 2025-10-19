import React from 'react'

export default function CartSummary({ items, subtotal, tax, delivery, total, onCheckout, onClear }) {
  return (
    <div className="cart">
      <div className="cart-items">
        {items.length === 0 && (
          <div className="empty">Your cart is empty</div>
        )}
        {items.map(item => (
          <div className="cart-row" key={item.name}>
            <div className="cart-col left">
              <strong>{item.name}</strong>
            </div>
            <div className="cart-col mid">{item.quantity} kg</div>
            <div className="cart-col right">₹{item.total.toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="billing">
        <div className="bill-row">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="bill-row">
          <span>Tax (18%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="bill-row">
          <span>Delivery</span>
          <span>₹{delivery.toFixed(2)}</span>
        </div>
        <div className="bill-row total">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="actions">
          <button className="btn outline" onClick={onClear} disabled={items.length === 0}>Clear</button>
          <button className="btn primary" onClick={onCheckout} disabled={items.length === 0}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}
