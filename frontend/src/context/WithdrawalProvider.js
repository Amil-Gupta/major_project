import { createContext, useState } from "react";

const WithdrawalContext = createContext({});

export const WithdrawalProvider = ({children})=>{
    const [withdrawal, setWithdrawal] = useState({});

    return(
        <WithdrawalContext.Provider value={{withdrawal, setWithdrawal}}>
            {children}
        </WithdrawalContext.Provider>
    )
}

export default WithdrawalContext;