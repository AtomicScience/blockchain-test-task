import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import React from 'react';
import PricesRequester from '../api/prices/pricesRequester';

export function TokenPrices(props) {
    new PricesRequester().getEthereumPriceForToken(props.wallet.getTokensList[1])
    return <p>asdads</p>
}