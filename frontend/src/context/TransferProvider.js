import { createContext, useState } from "react";

const TransferContext = createContext({});

export const TransferProvider = ({children})=>{
    const [transfer, setTransfer] = useState({});

    return(
        <TransferContext.Provider value={{transfer, setTransfer}}>
            {children}
        </TransferContext.Provider>
    )
}

export default TransferContext;