import useStyles from "styles/DepositSuccessScreenStyles";
import { Grid, Button } from "@mui/material";
import { useContext } from "react";
import DepositContext from "context/DepositProvider";
import { useNavigate } from "react-router-dom";

function DepositSuccessScreen() {
    const classes = useStyles();

    const navigate = useNavigate();

    const { deposit, setDeposit } = useContext(DepositContext);
    const { id, toAccount, amountPaise, transferredAt } = deposit;
    const amountRupees = amountPaise / 100;
    const transferDate = new Date(transferredAt);

    const handleOk = (e)=>{
        e.preventDefault();
        navigate('adminConsole/deposit', {replace: true});
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.heading}>
                        Deposit Successful!
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.amount}>
                        ₹{amountRupees}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.detailsHeading}>
                        Details
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Grid container
                    style={{
                        maxHeight: '40vh',
                        overflowY: 'auto',
                        border: '.2rem solid black'
                    }}
                    >
                        <Grid item xs={12} md={4} className={classes.label}>
                            To Account No.
                        </Grid>
                        <Grid item xs={12} md={8} className={classes.value}>
                            {toAccount}
                        </Grid>
                        <Grid item xs={12} md={4} className={classes.label}>
                            Transaction Id
                        </Grid>
                        <Grid item xs={12} md={8} className={classes.value}>
                            {id}
                        </Grid>
                        <Grid item xs={12} md={4} className={classes.label}>
                            Time of Transaction
                        </Grid>
                        <Grid item xs={12} md={8} className={classes.value}>
                            {transferDate.toString()}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button className={classes.okButton} onClick={handleOk} sx={{
                            color: 'greenyellow',
                            backgroundColor: 'green',
                            margin: '.5rem 0',
                            border: '.1rem solid yellowgreen'
                        }}>
                            OK
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default DepositSuccessScreen;