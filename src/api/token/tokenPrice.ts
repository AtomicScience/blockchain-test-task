import Token from "../token/token"

export default interface TokenPrice {
    queryStatus : string;
    token : Token;
    ethereumPrice : string
}