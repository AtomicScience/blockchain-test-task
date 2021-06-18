import { ethers } from "ethers";
import ERC20 from "../../contracts/ERC20.json"
import { Signer, Contract } from "../../react-app-env";

export default function ERC20ContractBuilder(contractAddress : string, signer : Signer) : Contract {
    let contract = new ethers.Contract(contractAddress, ERC20.abi, signer);
    return contract
}