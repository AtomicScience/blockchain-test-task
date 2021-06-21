import { Contract } from "@ethersproject/contracts";

export default interface Token {
    name: string;
    symbol : string;
    decimals : number;

    contractAddress : string;
}