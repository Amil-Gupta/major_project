import { createContext, useState } from "react";

const StatementContext = createContext({});

export const StatementProvider = ({children})=>{
    const [statement, setStatement] = useState({});

    return(
        <StatementContext.Provider value={{statement, setStatement}}>
            {children}
        </StatementContext.Provider>
    )
}

export default StatementContext;