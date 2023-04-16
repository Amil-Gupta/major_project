import LoadingContext from "context/LoadingProvider";
import { memo, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import useStyles from "styles/WithdrawalScreenStyles";
import WithdrawalInitiator from "components/WithdrawalInitiator";
import WithdrawalSuccessScreen from "components/WithdrawalSuccessScreen";

const WithdrawalScreen = memo(()=>{
    const { setLoading, setLoadingColor } = useContext(LoadingContext);

    useEffect(
        ()=>{
            setLoadingColor('red');
            // setLoading(false);
        },
        [setLoadingColor]
    );

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Routes>
                <Route path='*' element={<WithdrawalInitiator setLoading={setLoading} />} />
                <Route path='success' element={<WithdrawalSuccessScreen />} />
            </Routes>
        </div>
    )
});

export default WithdrawalScreen;