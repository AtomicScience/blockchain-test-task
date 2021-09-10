import ethereum from "./ethereum";
import loadedTokens from "../config/tokens.json"

loadedTokens.unshift(ethereum.token);

export default loadedTokens;