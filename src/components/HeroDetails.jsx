import React, { useState, useEffect } from "react"
import { useParams } from "@reach/router"
import { Link } from "gatsby"

import SEO from "./seo"

const HeroDetails = () => {
  const { heroid } = useParams()
  const APIbaseURI =
    "https://cors-anywhere.herokuapp.com/https://mapi.mobilelegends.com"
  const [hero, setHero] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await fetch(`${APIbaseURI}/hero/detail?id=${heroid}`)
        const { data } = await res.json()
        if (!data.skill.item.main) {
          return setIsLoading(false)
        }
        setHero(data)
        setIsLoading(false)
      } catch (err) {
        setIsError(true)
        setIsLoading(false)
      }
    }
    fetchHeroData()
  }, [])

  return (
    <>
      <SEO
        title={
          isLoading
            ? `Hero #${heroid}`
            : isError
            ? "500 Internal Server Error"
            : !hero
            ? "404 Not Found"
            : hero.name
        }
      />
      {isLoading ? (
        <div className="hero-details">
          <div className="container flex">
            <h1>Loading...</h1>
            <Link to="/" className="btn">
              ⬅ Go back to Homepage
            </Link>
          </div>
        </div>
      ) : isError ? (
        <div className="hero-details">
          <div className="container flex">
            <h1>500 Internal Server Error</h1>
            <Link to="/" className="btn">
              ⬅ Go back to Homepage
            </Link>
          </div>
        </div>
      ) : !hero ? (
        <div className="hero-details">
          <div className="container flex">
            <h1>404 Hero does not Exist yet</h1>
            <Link to="/" className="btn">
              ⬅ Go back to Homepage
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="hero-details">
            <div className="container flex">
              <div className="card flex">
                <div className="hero-details__avatar">
                  <div className="hero-details__image">
                    <img src={hero.cover_picture} alt={hero.name} />
                  </div>
                  <h3>
                    {hero.name} | {hero.type}
                  </h3>
                </div>
                <ul className="hero-details__stats">
                  <h3>Base Stats:</h3>
                  <li>Magic Power: {hero.mag}</li>
                  <li>Physical Attack: {hero.phy}</li>
                  <li>Durability: {hero.alive}</li>
                  <li>Difficulty: {hero.diff}</li>
                </ul>
              </div>
              <Link to="/" className="btn">
                ⬅ Go back to Homepage
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default HeroDetails
