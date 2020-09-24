import React from 'react';
import CryptoConversionCalculator from './CryptoConversionCalculator';
import './App.scss';

const App = () => {

	return (
		<div className='app-component'>
			<CryptoConversionCalculator
				from={'USD'}
				to={'BTC'}
				partnerLink={'https://www.benzinga.com/go/uphold-crypto-convertor'}
			/>
		</div>
	)

};

export default App;
