import React from "react"
import { Router } from "@reach/router"
import HeroDetails from "../../components/HeroDetails"

import Layout from "../../components/layout"

const detail = () => {
  return (
    <Layout>
      <Router basepath="/hero/detail">
        <HeroDetails path="/:heroid" />
      </Router>
    </Layout>
  )
}

export default detail
