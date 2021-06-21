import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import React from 'react';
import tokens from '../config/tokens.json'

export default class Balance extends React.Component {
    constructor(props) {
        super(props);

        this.wallet = props.wallet;

        this.state = {
            tokensBalance: tokens.map(this.getStubBalanceEntry),
        }
    }

    componentDidMount() {
        this.wallet.getTokensBalance()
            .then((tokensBalance) => this.setState({tokensBalance: tokensBalance}))
            .catch((reason) => console.log(reason))
    }

    render() {    
        let tokensBalance = this.state.tokensBalance;
        return (
            <table>
                <caption> Your tokens balance </caption>
                <tbody> {
                    tokensBalance.map((balance) => 
                        this.getBalanceTableRow(balance)
                    )
                } </tbody>
            </table>
        )
    }

    getBalanceTableRow(balance) {
        return(
            <tr key={balance.token.symbol}>
                <td> {balance.token.name} </td>
                <td> {this.getFormattedTokenValue(balance)} </td>
            </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    // TODO: Move methods below into separate class    
    getFormattedTokenValue(balance) {
        if(!this.isBalanceEntryStub(balance)) {
            return ethers.utils.formatUnits(balance.balance, balance.token.decimals);
        } else {
            return "Loading...";
        }
    }

    getStubBalanceEntry(token) {
        return ({
            token: token,
            balance: BigNumber.from(-1)
        })
    }

    isBalanceEntryStub(balance) {
        return balance.balance.lt(0);
    }
}