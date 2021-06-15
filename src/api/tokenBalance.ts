import { BigNumber } from "@ethersproject/bignumber";
import Token from "./token";

export default interface TokenBalance {
    token: Token;
    balance: BigNumber;
}