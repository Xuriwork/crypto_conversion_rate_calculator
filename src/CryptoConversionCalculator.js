import React, { useEffect, useState } from 'react';
import Input from './Input';
import CurrencyRate from './CurrencyRate';

const CRYPTOCOMPARE_API = 'https://min-api.cryptocompare.com/data';
const EXCHANGE_RATES_API = 'https://api.exchangeratesapi.io/latest';

const CryptoConversionCalculator = () => {
 
    const [loading, setLoading] = useState(true);

    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('BTC');
    const [toCurrency, setToCurrency] = useState('USD');
    const [exchangeRate, setExchangeRate] = useState();
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    
    useEffect(() => {
        const _currencies = [];
    
        fetch(EXCHANGE_RATES_API)
            .then((res) => res.json())
            .then((data) => {
                _currencies.push(data.base, ...Object.keys(data.rates));
            });
    
        fetch(`${CRYPTOCOMPARE_API}/top/totalvolfull?limit=80&tsym=USD`)
            .then((res) => res.json())
            .then((data) => {
                data.Data.forEach((coin) => _currencies.push(coin.CoinInfo.Name));
                setCurrencies(_currencies);
                setLoading(false);
            });
    }, []);
    
    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${CRYPTOCOMPARE_API}/price?fsym=${fromCurrency}&tsyms=${toCurrency}`)
                .then((res) => res.json())
                .then((data) => setExchangeRate(data[toCurrency]));
        }
    }, [fromCurrency, toCurrency]);
    
    let toAmount, fromAmount;
    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }
    
    const handleFromAmountChange = (e) => {
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    };
    
    const handleToAmountChange = (e) => {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    };
    
    const handleOnChangeToCurrency = (e) => setToCurrency(e.target.value);
    const handleOnChangeFromCurrency = (e) => setFromCurrency(e.target.value);        

	if (loading) {
		return (
			<div className='loader-container'>
				<div className='loader'></div>
			</div>
		);
    }
    
    return (
		<div className='app-component'>
			<div className='currency-converter-container'>
				<Input 
					amount={fromAmount} 
					onAmountChange={handleFromAmountChange}
					currency={fromCurrency}
					onCurrencyChange={handleOnChangeFromCurrency} 
					currencies={currencies} 
					labelName='From'
				/>
				<Input 
					amount={toAmount} 
					onAmountChange={handleToAmountChange}
					currency={toCurrency}
					onCurrencyChange={handleOnChangeToCurrency} 
					currencies={currencies} 
					labelName='To'
				/>
				<a
					href='https://www.benzinga.com/go/uphold-crypto-convertor'
					className='get-started-button'
					rel='sponsored noopener noreferrer'
					target='_blank'
				>
					Get started
				</a>
				<CurrencyRate exchangeRate={exchangeRate} fromCurrency={fromCurrency} toCurrency={toCurrency} />
			</div>
		</div>
	);
}

export default CryptoConversionCalculator;
