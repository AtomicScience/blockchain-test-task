import {
    ApolloClient,
    NormalizedCacheObject,
} from "@apollo/client";

import { BigNumber } from "bignumber.js";
import ethereum from "../ethereum";
import Token from "../token";
import getApolloClient from "./getApolloClient";
import queries from "./priceQueries"
import TokenPrice from "./tokenPrice";

export default class ApolloPricesFacade {
    private client : ApolloClient<NormalizedCacheObject>;

    constructor() {
        this.client = getApolloClient();
    }

    public queryMulpipleTokenPricesRelativeTo(tokens: Token[], pivot : Token) : Promise<TokenPrice>[] {
        let prices = [];
        let pivotEthPrice = this.queryTokenPriceInWei(pivot);

        for(let token of tokens) {
            prices.push(this.queryTokenPriceRelativeTo(token, pivotEthPrice));
        }

        return prices;
    }

    private async queryTokenPriceRelativeTo(token : Token, promisePivotEthPrice : Promise<BigNumber>) : Promise<TokenPrice> {
        let tokenWeiPrice = await this.queryTokenPriceInWei(token);
        let pivotWeiPrice = await promisePivotEthPrice;

        let relativePrice = tokenWeiPrice.div(pivotWeiPrice);

        return {
            token: token,
            ethereumPrice: relativePrice,
        }
    }

    private async queryTokenPriceInWei(token : Token) : Promise<BigNumber> {
        if(token.symbol === "ETH") return new BigNumber(1);

        let tokenPriceAsString = await this.makePriceQueryForERC20Token(token);
        let tokenPriceInWei = this.convertPriceToBigNumber(tokenPriceAsString, token);

        return tokenPriceInWei;
    }

    private async makePriceQueryForERC20Token(token: Token) : Promise<string> {
        let queryResult = await this.client.query({
            query: queries.ERC20_PRICE_QUERY,
            variables: {
              tokenAddress: token.contractAddress,
            },
        });

        return queryResult.data.tokens[0].derivedETH;
    }

    private async convertPriceToBigNumber(stringPrice : string, token : Token) {
        // TODO: Migrate all the code to bignumber.js
        return new BigNumber(stringPrice).multipliedBy(ethereum.weiInEthereum);
    }
}