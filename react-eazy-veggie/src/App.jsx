import React, { useMemo, useState } from 'react'
import VegetableItem from './components/VegetableItem.jsx'
import CartSummary from './components/CartSummary.jsx'

const VEGETABLES = [
  { name: 'Tomato', price: 50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJa6G2sFzRt2c_4DljZUMKfK8sMOFV-E8F_A&s' },
  { name: 'Potato', price: 30, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200' },
  { name: 'Onion', price: 40, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8q08WhpczEznhtGN8yMjO4H4QJtfm351g9w&s' },
  { name: 'Cabbage', price: 35, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSovwzSv6Dsb6s7h5LucdCxCfBvt-0kQbwm2g&s' },
  { name: 'Carrot', price: 45, image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=200' },
  { name: 'Cucumber', price: 25, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9kwNr0m2eK0A8wsR1WVm58LSTGKF4cFHFEg&s' },
  { name: 'Bell Pepper', price: 60, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-hZz0Wfezku9jKiwx08O8jw6SP0XaZcIliA&s' },
  { name: 'Spinach', price: 40, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0TLQ-TatGslPnS8LwNMnQzkymUZI3Q-_-gw&s' },
  { name: 'Broccoli', price: 250, image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200' },
  { name: 'Green Beans', price: 35, image: 'https://thefamilydinnerproject.org/wp-content/uploads/2013/09/Green-bean-lime-633x326.jpg' }
]

export default function App() {
  const [quantities, setQuantities] = useState(() => Object.fromEntries(VEGETABLES.map(v => [v.name, 0])))

  const cartItems = useMemo(() => {
    return VEGETABLES
      .filter(v => (quantities[v.name] || 0) > 0)
      .map(v => ({ ...v, quantity: Number(quantities[v.name] || 0), total: v.price * Number(quantities[v.name] || 0) }))
  }, [quantities])

  const subtotal = useMemo(() => cartItems.reduce((acc, item) => acc + item.total, 0), [cartItems])
  const tax = useMemo(() => subtotal * 0.18, [subtotal])
  const delivery = 49
  const total = useMemo(() => subtotal + tax + delivery, [subtotal, tax])

  function updateQuantity(name, qty) {
    setQuantities(prev => ({ ...prev, [name]: Math.max(0, qty) }))
  }

  function clearCart() {
    setQuantities(Object.fromEntries(VEGETABLES.map(v => [v.name, 0])))
  }

  function handleCheckout() {
    if (cartItems.length === 0) return
    alert(`Thank you for your purchase!\nTotal amount: ₹${total.toFixed(2)}`)
    clearCart()
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Eazy Veggie</h1>
        <p className="subtitle">Fresh picks, easy checkout</p>
      </header>

      <main className="main-grid">
        <section className="panel">
          <h2 className="panel-title">Select Your Vegetables</h2>
          <div className="veg-grid">
            {VEGETABLES.map(v => (
              <VegetableItem key={v.name} veg={v} value={quantities[v.name]} onChange={updateQuantity} />
            ))}
          </div>
        </section>

        <section className="panel">
          <h2 className="panel-title">Cart Summary</h2>
          <CartSummary
            items={cartItems}
            subtotal={subtotal}
            tax={tax}
            delivery={delivery}
            total={total}
            onCheckout={handleCheckout}
            onClear={clearCart}
          />
        </section>
      </main>

      <footer className="footer"></footer>
    </div>
  )
}
