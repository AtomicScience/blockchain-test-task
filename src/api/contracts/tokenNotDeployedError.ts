import Token from "../token";
import TokenError from "../tokenError";

export default class TokenNotDeployedError extends TokenError {
    constructor(token: Token) {
        super("Contract not deployed for token " + token.symbol, token);
    }
}