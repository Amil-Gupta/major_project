import { Button, Grid, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import useStyles from "styles/CreditScoreCheckerStyles";
import crediScoreEligibilityChecker from "utils/creditScoreEligibilityChecker";

function CreditScoreChecker() {
    const classes = useStyles();
    
    const [creditScore, setCreditScore] = useState('');
    const [eligibilityData, setEligibilityData] = useState({});
    const [referenceKey, setReferenceKey] = useState({});

    const rating = eligibilityData?.rating;
    const loanEligibility = eligibilityData?.loanEligibility;

    const handleCreditScoreUpdate = (e)=>{
        const value = e.target.value;
        const newScore = (value) > 0 ? value : '';
        setCreditScore(newScore);
    }

    const handleEligibilityCheck = (e)=>{
        // e.preventDefault();
        const {result, referenceKey} = crediScoreEligibilityChecker(creditScore);
        // console.log(result)
        setEligibilityData(result);
        setReferenceKey(referenceKey);
    }

    const eligibilityComponent = useMemo(()=>((Object.keys(eligibilityData).length) ? (
        <div className={classes.eligibilityContainer}>
            <div className={classes.rating}>
                {eligibilityData?.rating} !
            </div>
            <div className={classes.eligibilityTable}>
                <Grid container style={{
                    // maxHeight: '53vh',
                    // overflowY: 'auto',
                }}>
                    <Grid item xs={6}>
                        <div className={classes.tableHeading}>
                            Type
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.tableHeading}>
                            Category
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.type}>
                            Auto Loan
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Tooltip title={
                            <div className={classes.tooltip}>
                                {referenceKey[loanEligibility?.auto]}
                            </div>
                        }
                        enterTouchDelay={0}>
                            <div className={classes.categoryRow}>
                                {loanEligibility?.auto}
                            </div>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.type}>
                            Business Loan
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Tooltip title={
                            <div className={classes.tooltip}>
                                {referenceKey[loanEligibility?.business]}
                            </div>
                        }
                        enterTouchDelay={0}>
                            <div className={classes.categoryRow}>
                                {loanEligibility?.business}
                            </div>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.type}>
                            Education Loan
                        </div>
                    </Grid>
                    <Grid item xs={6} className={classes.categoryRow} />
                    <Grid item xs={6}>
                        <div className={classes.subtype}>
                            Tier 1
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Tooltip title={
                            <div className={classes.tooltip}>
                                {referenceKey[loanEligibility?.student1]}
                            </div>
                        }
                        enterTouchDelay={0}>
                            <div className={classes.categoryRow}>
                                {loanEligibility?.student1}
                            </div>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.subtype}>
                            Tier 2
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Tooltip title={
                            <div className={classes.tooltip}>
                                {referenceKey[loanEligibility?.student2]}
                            </div>
                        }
                        enterTouchDelay={0}>
                            <div className={classes.categoryRow}>
                            {loanEligibility?.student2}
                            </div>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.subtype}>
                            Tier 3
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Tooltip title={
                            <div className={classes.tooltip}>
                                {referenceKey[loanEligibility?.student3]}
                            </div>
                        }
                        enterTouchDelay={0}>
                            <div className={classes.categoryRow}>
                            {loanEligibility?.student3}
                            </div>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.type}>
                            Personal Loan
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Tooltip title={
                            <div className={classes.tooltip}>
                                {referenceKey[loanEligibility?.personal]}
                            </div>
                        }
                        enterTouchDelay={0}>
                            <div className={classes.categoryRow}>
                                {loanEligibility?.personal}
                            </div>
                        </Tooltip>
                    </Grid>
                </Grid>
            </div>
        </div>
    ):(<></>)),[eligibilityData, referenceKey]);

    return (
        <div className={classes.root}>
            <Grid container alignItems='center' align='center' alignContent='center'>
                <Grid item xs={0} md={3} />
                <Grid item xs={12} md={3}>
                    <label className={classes.label}>
                        Enter Your Credit Score:
                    </label>
                </Grid>
                <Grid item xs={12} md={2}>
                    <input type='number' value={creditScore} onChange={handleCreditScoreUpdate} className={classes.input} />
                </Grid>
                <Grid item xs={12} md={1}>
                    <Button
                    onClick={handleEligibilityCheck}
                    sx={{
                        color: 'greenyellow',
                        backgroundColor: 'green',
                        margin: '.5rem 0',
                        border: '.1rem solid greenyellow',
                    }}
                    >
                        Check!
                    </Button>
                </Grid>
                <Grid item xs={0} md={3} />
                <Grid item xs={12}>
                    {eligibilityComponent}
                </Grid>
            </Grid>
        </div>
    );
}

export default CreditScoreChecker;