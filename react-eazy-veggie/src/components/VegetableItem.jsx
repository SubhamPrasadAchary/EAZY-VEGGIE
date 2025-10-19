import React from 'react'

export default function VegetableItem({ veg, value, onChange }) {
  return (
    <div className="veg-card">
      <img
        className="veg-img"
        src={veg.image}
        alt={veg.name}
        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/160?text=No+Image' }}
      />
      <div className="veg-info">
        <div className="veg-title">{veg.name}</div>
        <div className="veg-price">₹{veg.price}/kg</div>
        <label className="qty-label">
          <span>Qty (kg)</span>
          <input
            className="qty-input"
            type="number"
            min="0"
            step="0.5"
            value={value}
            onChange={(e) => onChange(veg.name, Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  )
}
