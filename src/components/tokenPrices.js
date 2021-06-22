import React from "react"
import ApolloPricesFacade from "../api/prices/apolloPricesFacade";
import tokens from "../config/tokens.json"
export default class TokenPrices extends React.Component {
    constructor(props) {
        super(props);

        this.wallet = props.wallet;
        this.pricesFacade = new ApolloPricesFacade();

        this.state = {
            
        }
    }

    handlePriceLoaded(tokenPrice) {
        this.setState({[tokenPrice.token.symbol]: tokenPrice})
    }

    componentDidMount() {
        for(let tokenPricePromise of this.pricesFacade.queryMulpipleTokenPricesRelativeTo(tokens, tokens[0])) {
            tokenPricePromise
                .then((tokenPrice) => {
                    this.handlePriceLoaded(tokenPrice)
                })
                .catch(console.log)
        }
    }

    render() {
        return (
            <table>
                <caption> Price of your tokens </caption>
                <tbody>{
                    tokens.map((token) => 
                        this.getPriceTableRow(token)
                    )
                }</tbody>
            </table>
        );
    }

    getPriceTableRow(token) {
        return(
            <tr key={token.symbol}>
                <td> {token.name} </td>
                <td> {this.getFormattedTokenPrice(token)} </td>
            </tr>
        );
    }

    getFormattedTokenPrice(token) {
        let price = this.state[token.symbol];

        if(price == null) {
            return "Loading..."
        } else {
            return price.ethereumPrice.toFixed(4);
        }
    }
}