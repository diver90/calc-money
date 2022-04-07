import React, {useContext} from "react";
import TransactionContext from "../../contexts/TransactionContext";

export default function HistoryItem ({id, amount, description, add}) {
    const transactionsContext = useContext(TransactionContext);
    const deleteHandler = (id) => {
        transactionsContext.setTransactions(prevState => prevState.filter(el => el.id !== id));
    }

    return (
        <li key={id} className={`history__item ${ add ? 'history__item-plus' : 'history__item-minus'}`}>
            {description}
        <span className={`history__money ${ add ? 'history__money-income' : 'history__money-expenses'}`}>
                {add ? '+' : '-'} {amount} $</span>
        <button type="button" onClick={() => deleteHandler(id)} className="history__delete">x</button>
</li>
)
}

