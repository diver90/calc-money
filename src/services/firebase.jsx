import {initializeApp} from "firebase/app";
import { getDatabase, ref, onValue, update, child, push, off, remove} from "firebase/database";

const env = process.env;
const firebaseConfig = {
    apiKey: env.REACT_APP_FIREBASE_API_KEY,
    authDomain: env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL:env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: env.REACT_APP_FIREBASE_BUCKET,
    messagingSenderId: env.REACT_APP_FIREBASE_SENDER_ID,
    appId: env.REACT_APP_FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);

class Firebase {
    constructor() {
        this.fire = firebase;
        this.database = getDatabase(firebase);
    }

    getTransactionsSocket = (callback) => {
        const transactions = ref(this.database,'transactions')
        onValue(transactions, (snapshot) => {
            let snapshotObj = snapshot.val();
            const arrEntr = Object.entries(snapshotObj);
            const transArr = [];
            arrEntr.forEach(([key, val]) => {
                val.keyId = key
                transArr.push(val);
            });
            callback(transArr);
        });
    }

    offTransactionsSocket = () => {
        off(ref(this.database));
    }

    //
    // getTransactionsOnce = async () => {
    //     return await this.database.ref('transactions').once('value').then(snapshot =>
    //         snapshot.val());
    // }

    addTransaction = (data) => {
        const updates = {};
        const newKey = push(child(ref(this.database), 'transactions')).key;
        updates['transactions/' + newKey] = data;
        update(ref(this.database), updates)
            .then(
                () => console.log(`Success`),
                () => console.log(`Reject`)
            );
    }

    delTransaction = (id) => {
        remove(ref(this.database, 'transactions/' + id))
            .then(
                () => console.log(`Success`),
                () => console.log(`Reject`)
            );
    }
}

export default Firebase;

