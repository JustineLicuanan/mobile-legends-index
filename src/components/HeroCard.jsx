import React from "react"
import { Link } from "gatsby"

const HeroCard = ({ heroid, name, cover_picture }) => {
  return (
    <li className="card">
      <Link to={`/hero/detail/${heroid}`}>
        <div className="card__header">
          <img src={cover_picture} alt={`${name} Avatar`} />
        </div>
        <div className="card__body">
          <h3>{name}</h3>
        </div>
      </Link>
    </li>
  )
}

export default HeroCard
