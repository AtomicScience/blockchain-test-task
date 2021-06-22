import ethereum from "./ethereum";
import Token from "./token";
import loadedTokens from "../config/tokens.json"

loadedTokens.unshift(ethereum.token);

export default loadedTokens;