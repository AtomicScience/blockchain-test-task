import Token from "../token";
import TokenError from "../tokenError";

export default class TokenNotDeployedError extends TokenError {
    constructor(token: Token) {
        super("The contract for " + token.symbol + " is not deployed on the network!", token);
    }
}