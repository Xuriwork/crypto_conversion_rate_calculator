import React, { useState } from 'react';
import ExchangeIcon from './assets/exchange-fill.svg';

const CurrencyRate = ({ exchangeRate, fromCurrency , toCurrency }) => {
    const [showFromCurrencyRate, setShowFromCurrencyRate] = useState(true);

    const handleChangeRateView = () => setShowFromCurrencyRate(!showFromCurrencyRate);

    return (
        <>
            {showFromCurrencyRate ? (
					<div className='currency-rate'>
						<p>
							{' '}
							<span>1 {fromCurrency}</span> ≈{' '}
							<span>
								{exchangeRate} {toCurrency}
							</span>{' '}
						</p>
						<button onClick={handleChangeRateView}>
							<img src={ExchangeIcon} alt='' />
						</button>
					</div>
				) : (
					<div className='currency-rate'>
						<p>
							{' '}
							<span>1 {toCurrency}</span> ≈{' '}
							<span>
								{(1 / exchangeRate).toFixed(8)} {fromCurrency}
							</span>{' '}
						</p>
						<button onClick={handleChangeRateView}>
							<img src={ExchangeIcon} alt='' />
						</button>
					</div>
				)}
        </>
    )
}

export default CurrencyRate;
