import React, {useContext, useState} from "react";
import TransactionContext from "../../contexts/TransactionContext";

function Operation (){
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();
    const transactionsContext = useContext(TransactionContext);
    const firebase = transactionsContext.firebase;

    const onAddTransaction = (add) =>
    {
        let transData = {
            id: `cmr${(+new Date()).toString(16)}`,
            amount: +amount,
            description: description,
            add
        }
        firebase.addTransaction(transData);
        let transactions = [...transactionsContext.transactions];
        transactions.push(transData);
        transactionsContext.setTransactions(transactions);
    }

    return (
        <section className="operation">
            <h3>Новая операция</h3>
            <form id="form">
                <label>
                    <input id="trans-desc"
                           onChange={(event => setDescription(event.target.value))}
                           type="text"
                           className="operation__fields operation__name"
                           placeholder="Наименование операции"
                    />
                </label>
                <label>
                    <input id="trans-amount"
                           onChange={(event => setAmount(event.target.value))}
                           type="number"
                           className="operation__fields operation__amount"
                           placeholder="Введите сумму"/>
                </label>
                <div className="operation__btns">
                    <button
                        onClick={() => onAddTransaction(false)}
                        type="button"
                        className="operation__btn operation__btn-subtract"
                    >РАСХОД</button>
                    <button
                        onClick={() => onAddTransaction(true)}
                        type="button"
                        className="operation__btn operation__btn-add"
                    >ДОХОД</button>
                </div>

            </form>
        </section>
    )
}

export default Operation;
