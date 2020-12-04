import React from "react"
import { Link } from "gatsby"

const HeroCard = ({ heroid, name, gallery_picture }) => {
  return (
    <li className="card">
      <Link to="/">
        <div className="hero-list__card-header">
          <img src={gallery_picture} alt={`${name} Avatar`} />
        </div>
        <div className="hero-list__card-body">
          <h3>{name}</h3>
        </div>
      </Link>
    </li>
  )
}

export default HeroCard
