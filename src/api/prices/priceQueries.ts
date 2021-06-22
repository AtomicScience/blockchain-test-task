import {
    gql
} from "@apollo/client";

let queries =  {
    ERC20_PRICE_QUERY: gql`
      query tokens($tokenAddress: Bytes!) {
        tokens(where: {id: $tokenAddress}) {
          derivedETH
        }
      }
    `,
    ETH_PRICE_QUERY: gql`
      query bundles {
        bundles(where: { id: "1" }) {
          ethPrice
        }
      }
    `,
}

export default queries;