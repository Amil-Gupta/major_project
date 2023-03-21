import { createContext, useState } from "react";

const DepositContext = createContext({});

export const DepositProvider = ({children})=>{
    const [deposit, setDeposit] = useState({});

    return(
        <DepositContext.Provider value={{deposit, setDeposit}}>
            {children}
        </DepositContext.Provider>
    )
}

export default DepositContext;