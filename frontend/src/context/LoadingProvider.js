import { createContext, useState } from "react";

const LoadingContext = createContext({});

export const LoadingProvider = ({children})=>{
    const [loading, setLoading] = useState(false);
    const [loadingColor, setLoadingColor] = useState('blue');

    return(
        <LoadingContext.Provider value={{loading, setLoading, loadingColor, setLoadingColor}}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext;