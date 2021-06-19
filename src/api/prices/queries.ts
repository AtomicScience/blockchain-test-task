import gql from 'graphql-tag'

export default {
    ERC20_QUERY: gql`
      query tokens($tokenAddress: Bytes!) {
        tokens(where: { id: $tokenAddress }) {
          derivedETH
        }
      }
    `,
    ETH_QUERY: gql`
      query bundles {
        bundles(where: { id: "1" }) {
          ethPrice
        }
      }
    `
}