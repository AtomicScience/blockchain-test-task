import { BigNumber } from "@ethersproject/bignumber";
import Token from "./token";

// TODO: Research if it is possible to deal without this ugly class
export default interface TokenBalance {
    token: Token;
    balance: BigNumber;
}