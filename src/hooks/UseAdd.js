import React from 'react'
import { db } from '../config/firebase';
import { addDoc,collection ,serverTimestamp} from 'firebase/firestore';
import {UseGetinfo} from './UseGetinfo.js'
export default function UseAdd() {
            const transactionref=collection(db,"transactions");
            const {userId}=UseGetinfo();
            const addtransaction=async({description,transactionamount,transactiontype,
            })=>{
              await addDoc(transactionref,{
                 userId,
                description,
                transactionamount,
                transactiontype,
                createdAt:serverTimestamp()
              });
            };
          return {addtransaction};
          
        };
        
      

