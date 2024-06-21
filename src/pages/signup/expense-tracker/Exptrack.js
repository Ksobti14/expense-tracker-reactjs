import React, { useState } from 'react';
import './expense.css';
import UseAdd from '../../../hooks/UseAdd';
import Usegettrans from '../../../hooks/Usegettrans';
import { UseGetinfo } from '../../../hooks/UseGetinfo';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/firebase';

export default function Exptrack() {
    const { addtransaction } = UseAdd();
    const navigate = useNavigate();
    const { transactions, transactionstotal } = Usegettrans();
    const [description, setdescription] = useState("");
    const [transactionamount, settransactionAmount] = useState(0);
    const [transactiontype, settransactionType] = useState('expense');
    const { balance, income, expenses } = transactionstotal;
    const { name, profile } = UseGetinfo();

    const onSubmit = (e) => {
        e.preventDefault();
        const amount = Number(transactionamount);
        if (!description || !amount) {
            alert("Please provide both description and amount");
            return;
        }
        addtransaction({ description, transactionamount: amount, transactiontype });
        setdescription("");
        settransactionAmount(0);
    };

    const Signuserout = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className='profile-section'>
                {profile && <div className='profile'><img className='profile-photo' src={profile} alt="Profile" /></div>}
                <button className='signout-button' onClick={Signuserout}>Sign Out</button>
                <h1 className="heading">{name}'s Expense-Tracker</h1>
            </div>
            <div className="balance-section">
                <h3>Your Balance</h3>
                {balance>=0 ? <h3>{balance} Rupees</h3>: <h3>-{balance*-1} Rupees</h3>}
                <div className="income-expense-section">
                    <div className="income">
                        <h3>Income</h3>
                        <h3>{income} Rupees</h3>
                    </div>
                    <div className="expense">
                        <h3>Expenses</h3>
                        <h3>{expenses} Rupees</h3>
                    </div>
                </div>
            </div>
            <form className="transaction-form" onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="Description" 
                    required 
                    value={description} 
                    onChange={(e) => setdescription(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Amount" 
                    required 
                    value={transactionamount} 
                    onChange={(e) => settransactionAmount(Number(e.target.value))} 
                />
                <div className="radio-buttons">
                    <input 
                        type="radio" 
                        value="expense" 
                        id="expense" 
                        checked={transactiontype === 'expense'} 
                        onChange={(e) => settransactionType(e.target.value)} 
                    />
                    <label htmlFor="expense">Expense</label>
                    <input 
                        type="radio" 
                        value="income" 
                        id="income" 
                        checked={transactiontype === 'income'} 
                        onChange={(e) => settransactionType(e.target.value)} 
                    />
                    <label htmlFor="income">Income</label>
                </div>
                <button type="submit">Add Transaction</button>
            </form>
            
            <div className="transactions">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction, index) => {
                        const { description, transactionamount, transactiontype } = transaction;
                        return (
                            <li key={index} className={transactiontype}>
                                <h4>{description}</h4>
                                <p>{transactionamount} Rupees<span className="type-label"> {transactiontype}</span></p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
