import React from 'react';
import SelectDropdownIcon from './assets/select.svg';

const Input = ({ amount, onAmountChange, currency, onCurrencyChange, currencies, labelName }) => {
	return (
        <>
            <label htmlFor={labelName}>{labelName}</label>
            <div className='input-container'>
                <input
                    type='number'
                    className='input'
                    value={amount}
                    onChange={onAmountChange}
                    id={labelName}
                />
                <select value={currency} onChange={onCurrencyChange}>
                    {currencies.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <img src={SelectDropdownIcon} alt='' className='select-dropdown-icon' />
            </div>
        </>
	);
};

export default Input;
