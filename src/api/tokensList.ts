import { Signer } from "../react-app-env";
import ERC20ContractBuilder from "./erc20ContractBuilder";
import Token from "./token";

function addContractToToken(token : Token, signer : Signer) : void {
    if(token.symbol === "ETH") return;

    if(token.contractAddress === "") { 
        throw "Contract address not defined for ERC20 currency " + token.symbol;
    }

    token.contract = ERC20ContractBuilder(token.contractAddress, signer)
}

function getTokensList(signer : Signer) : Token[] {
    let tokens = [{
            symbol: "ETH",
            name: "Ethereum",
            contractAddress: "",
            decimals: 18,
        },
        {
            symbol: "GLD",
            name: "Gold test currency",
            contractAddress: "0x77Df59E592ba75Cd7F889F76A9BbEBCc046750fa",
            decimals: 3,
        },
        {
            symbol: "CTM",
            name: "SUPER test currency",
            contractAddress: "0x94D7fE77B869521d6AC0d6Ef6Ea89B4bc296C2b5",
            decimals: 2,
        }
    ]

    tokens.forEach((token) => addContractToToken(token, signer))

    return tokens
}

export default getTokensList;