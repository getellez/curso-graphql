'use strict'
require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()

// Definiendo el schema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'), 'utf-8'
)
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Configurar los resolvers
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server is listening on http://localhost:3000/api')
})
