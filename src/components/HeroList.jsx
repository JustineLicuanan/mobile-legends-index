import React from "react"
import HeroCard from "./HeroCard"

const HeroList = ({ heroes }) => {
  return (
    <div className="hero-list">
      <div className="container">
        <ul className="flex">
          {heroes.map(({ node: { heroid, name, gallery_picture } }) => (
            <HeroCard
              key={heroid}
              heroid={heroid}
              name={name}
              gallery_picture={gallery_picture}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HeroList
