const expand = require('dotenv-expand')
const dotenv = require('dotenv')
expand.expand(dotenv.config({ path: '.env.development' }))

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  testTimeout: 10000,
}
