import React, {useState} from "react";
import database from "../services/firebase";
import Total from "./total/Total";
import History from "./history/History";
import Operation from "./operation/Operation";
import TransactionContext from "../contexts/TransactionContext";

function Main() {

    database.ref('transactions')
    const [transactions, setTransactions] = useState(JSON.parse(localStorage.getItem('calcMoney')) || []);

    return (
        <TransactionContext.Provider value={{transactions, setTransactions}}>
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
