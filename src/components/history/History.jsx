import React, {useContext} from "react";
import HistoryItem from "./HistoryItem";
import TransactionContext from "../../contexts/TransactionContext";

function History (){

const transactionsContext = useContext(TransactionContext);

    return (
        <section className="history">
            <h3>История расходов</h3>
            <ul className="history__list">
                {
                    transactionsContext.transactions.map((transaction) => <HistoryItem key={transaction.id} {...transaction} />)
                }
            </ul>
        </section>
    )
}

export default History;