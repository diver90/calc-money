import React, {useEffect, useState} from "react";
import Firebase from "../services/firebase";
import Total from "./total/Total";
import History from "./history/History";
import Operation from "./operation/Operation";
import TransactionContext from "../contexts/TransactionContext";

function Main() {

    const firebase = new Firebase();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        firebase.getTransactionsSocket((transactions) => {
            console.log(transactions);
            setTransactions(transactions);
        });

        return () => firebase.offTransactionsSocket();
    }, []);

    return (
        <TransactionContext.Provider value={{transactions, setTransactions, firebase}}>
            <main>
                <div className="container">
                    <Total/>
                    <History />
                    <Operation />
                </div>
            </main>
        </TransactionContext.Provider>

    )
}

export default Main;
