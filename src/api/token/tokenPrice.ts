import Token from "../token/token"

// TODO: Research if it is possible to deal without this ugly class
export default interface TokenPrice {
    queryStatus : string;
    token : Token;
    ethereumPrice : string
}