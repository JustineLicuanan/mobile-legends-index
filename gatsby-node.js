const fetch = require(`node-fetch`)

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  // Get heroes from Mobile Legends API
  const homepage = "http://localhost:8000"
  const APIbaseURI =
    "https://cors-anywhere.herokuapp.com/https://mapi.mobilelegends.com"
  const res = await fetch(`${APIbaseURI}/hero/list`, {
    headers: { origin: homepage },
  })
  const { data } = await res.json()

  // Get data of each heroes from Mobile Legends API at build time
  await Promise.all(
    data.map(async ({ heroid }) => {
      const res = await fetch(`${APIbaseURI}/hero/detail?id=${heroid}`, {
        headers: { origin: homepage },
      })
      const hero = await res.json()

      // Create node for build time data example in the docs
      createNode({
        // Arbitrary fields from the data
        ...hero.data,
        heroid,

        // Required fields
        id: createNodeId(hero.data.name),
        parent: null,
        children: [],
        internal: {
          type: `MobileLegendsHeroesData`,
          contentDigest: createContentDigest({ ...hero.data, heroid }),
        },
      })
    })
  )
}

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // Only update the `/hero/detail` page.
  if (page.path.match(/^\/hero\/detail/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/hero/detail/*"

    // Update the page.
    createPage(page)
  }
}
