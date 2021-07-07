import Token from "./token";

export default class TokenError extends Error {
    private token : Token;

    constructor(message : string, token: Token) {
        super(message);
        this.token = token;
    }

    get getToken() {
        return this.token;
    }
}