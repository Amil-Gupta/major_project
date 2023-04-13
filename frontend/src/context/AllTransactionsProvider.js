import { createContext, useState } from "react";

const AllTransactionsContext = createContext({});

export const AllTransactionsProvider = ({children})=>{
    const [transactions, setTransactions] = useState([]);

    return(
        <AllTransactionsContext.Provider value={{transactions, setTransactions}}>
            {children}
        </AllTransactionsContext.Provider>
    )
}

export default AllTransactionsContext;