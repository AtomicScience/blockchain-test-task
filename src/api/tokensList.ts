import { Signer } from "../react-app-env";
import ERC20ContractBuilder from "./erc20ContractBuilder";
import Token from "./token";

function addContractToToken(token : Token, signer : any) : void {
    if(token.symbol === "ETH") return;

    if(token.contractAddress === "") { 
        throw "Contract address not defined for ERC20 currency " + token.symbol;
    }

    token.contract = ERC20ContractBuilder(token.contractAddress, signer)
}

function getTokensList(signer : any) : Token[] {
    let tokens = [{
            symbol: "ETH",
            name: "Ethereum",
            contractAddress: "",
            decimals: 18,
        },
        {
            symbol: "GLD",
            name: "Gold test currency",
            contractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 3,
        },
        {
            symbol: "CTM",
            name: "SUPER test currency",
            contractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 2,
        }
    ]

    tokens.forEach((token) => addContractToToken(token, signer))

    return tokens
}

export default getTokensList;