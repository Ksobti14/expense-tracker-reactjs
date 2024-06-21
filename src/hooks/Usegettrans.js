import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { UseGetinfo } from './UseGetinfo';

export default function Usegettrans() {
    const [transactions, settransactions] = useState([]);
    const [transactionstotal, settransactionstotal] = useState({ balance: 0.0, income: 0.0, expenses: 0.0 });
    const transactionref = collection(db, "transactions");
    const { userId } = UseGetinfo();

    const gettransaction = async () => {
        try {
            const querytransactions = query(transactionref, where("userId", '==', userId), orderBy('createdAt'));
            const unsubscribe = onSnapshot(querytransactions, (snapshot) => {
                let docs = [];
                let totalincome = 0;
                let totalexpense = 0;
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    docs.push({ ...data, id });
                    if (data.transactiontype === 'expense') {
                        totalexpense += Number(data.transactionamount);
                    } else {
                        totalincome += Number(data.transactionamount);
                    }
                });
                settransactions(docs);
                let balance=totalincome-totalexpense;
                settransactionstotal({
                    balance,
                    expenses: totalexpense,
                    income: totalincome
                });
            });
            return () => unsubscribe();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        gettransaction();
    }, [userId]);

    return { transactions, transactionstotal };
}
