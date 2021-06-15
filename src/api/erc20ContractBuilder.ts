import { ethers } from "ethers";
import ERC20 from "../contracts/ERC20.json"

export default function ERC20ContractBuilder(contractAddress : string) : Contract {
    return new ethers.Contract(contractAddress, ERC20.abi, ethers.getDefaultProvider("http://127.0.0.1:9545"))
}