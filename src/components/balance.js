import { ethers } from 'ethers';
import React from 'react';
import tokens from "../api/tokensListManager"
import TokenError from '../api/tokenError';
import LoadingError from './loadingError'
export default class Balance extends React.Component {
    constructor(props) {
        super(props);

        this.wallet = props.wallet;

        this.state = {}
    }

    handleBalanceLoaded(tokenBalance) {
        this.setState({[tokenBalance.token.symbol]: tokenBalance})
    }

    handleLoadingError(error) {
        if(error instanceof TokenError) {
            this.setState({[error.token.symbol]: error})
        } else {
            // TODO: add handling of non-token errors
        }
    }

    componentDidMount() {
        for(let balancePromise of this.wallet.getTokensBalance()) {
            balancePromise
                .then((tokenBalance) => this.handleBalanceLoaded(tokenBalance))
                .catch((error) => this.handleLoadingError(error))
        }
    }

    render() {
        return (
            <table>
                <caption> Your tokens balance </caption>
                <tbody>{
                    tokens.map((token) => 
                        this.getBalanceTableRow(token)
                    )
                }</tbody>
            </table>
        )
    }

    getBalanceTableRow(token) {
        return(
            <tr key={token.symbol}>
                <td> {token.name} </td>
                <td> {this.getFormattedTokenValue(token)} </td>
            </tr>
        )
    }

    // TODO: Move methods below into separate class    
    getFormattedTokenValue(token) {
        let balanceOrError = this.state[token.symbol];
        
        if(balanceOrError === undefined) return "Loading...";

        if("balance" in balanceOrError) { // balanceOrError is instance of TokenBalance
            return ethers.utils.formatUnits(balanceOrError.balance, balanceOrError.token.decimals);
        } else if(balanceOrError instanceof Error) {
            return <LoadingError error={balanceOrError.message}></LoadingError>;
        } else {
            return "Loading...";
        }
    }
}