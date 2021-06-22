import { BigNumber } from "bignumber.js";
import Token from "../token"

export default interface TokenPrice {
    token : Token;
    ethereumPrice : BigNumber
}