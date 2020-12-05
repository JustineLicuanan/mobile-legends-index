import { graphql } from "gatsby"
import React, { useState } from "react"
import HeroList from "../components/HeroList"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({
  data: {
    allMobileLegendsHeroesData: { edges },
  },
}) => {
  const allHeroes = edges.sort(
    ({ node: { heroid: x } }, { node: { heroid: y } }) => y - x
  )
  const pagination = 12
  const [previous, setPrevious] = useState(0)
  const [next, setNext] = useState(pagination)
  const [heroes, setHeroes] = useState(allHeroes.slice(previous, next))

  const handlePrevious = () => {
    const tmpPrevious = previous - pagination
    const tmpNext = previous

    setNext(previous)
    setPrevious(previous - pagination)
    setHeroes(allHeroes.slice(tmpPrevious, tmpNext))
  }

  const handleNext = () => {
    const tmpPrevious = next
    const tmpNext = next + pagination

    setPrevious(next)
    setNext(next + pagination)
    setHeroes(allHeroes.slice(tmpPrevious, tmpNext))
  }

  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="logo">Mobile Legends Hero Index</h1>
      <HeroList heroes={heroes} />
      <div className="pagination">
        <div className="container">
          <div className="flex">
            <button
              className="btn"
              onClick={handlePrevious}
              style={{ visibility: previous > 0 ? "initial" : "hidden" }}
            >
              Prev
            </button>
            <button
              className="btn"
              onClick={handleNext}
              style={{
                visibility: next < allHeroes.length ? "initial" : "hidden",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allMobileLegendsHeroesData {
      edges {
        node {
          type
          name
          heroid
          cover_picture
          phy
          mag
        }
      }
    }
  }
`

export default IndexPage
