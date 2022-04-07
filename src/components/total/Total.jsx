import React, {useContext, useEffect, useState} from "react";
import TransactionContext from "../../contexts/TransactionContext";

function Total() {
    const transactionsContext = useContext(TransactionContext);
    const transactions = transactionsContext.transactions;

    const [balance, setBalance] = useState(0);
    const [income, setIncome] = useState(0);
    const [outcome, setOutcome] = useState(0);

    useEffect(() => {
        let toIncome = 0;
        let toOutcome = 0;
        transactions.forEach(({add, amount}) => {
            add ? toIncome += amount : toOutcome += amount;
        });

        localStorage.setItem('calcMoney', JSON.stringify(transactions));

        if(toIncome >= 0) setIncome(toIncome);
        if(toOutcome >= 0) setOutcome(toOutcome);

        setBalance(income - outcome);
    }, [transactionsContext.transactions]);

    useEffect(() => {
        setBalance(income - outcome);
    }, [income, outcome])

    return (
        <section className="total">
            <header className="total__header">
                <h3>Баланс</h3>
                <p className="total__balance">{balance} $</p>
            </header>
            <div className="total__main">
                <div className="total__main-item total__income">
                    <h4>Доходы</h4>
                    <p className="total__money total__money-income">
                        + {income} $
                    </p>
                </div>
                <div className="total__main-item total__expenses">
                    <h4>Расходы</h4>
                    <p className="total__money total__money-expenses">
                        - {outcome} $
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Total;