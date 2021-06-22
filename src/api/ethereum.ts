import BigNumber from "bignumber.js";
import Token from "./token";

let token : Token = {
    symbol: "ETH",
    name: "Ethereum",
    contractAddress: "",
    decimals: 18
}

let ethereum = {
    token: token,
    weiInEthereum : new BigNumber(10).pow(token.decimals),
}

export default ethereum;