import AuthContext from "context/AuthProvider";
import StatementContext from "context/StatementProvider";
import { useContext, useEffect } from "react";
import useStyles from "styles/AccountStatementStyles";
import { DataGrid, gridPageCountSelector, gridPageSelector, gridPageSizeSelector, gridRowCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Button, Grid, Pagination, PaginationItem, TablePagination, Tooltip } from "@mui/material";
import { depositIcon, inboundIcon, outboundIcon, withdrawalIcon } from "assets/assets";
import axios from "api/axios";
import LoadingContext from "context/LoadingProvider";

const GET_STATEMENT_URL = '/accounts/statement';

function AccountStatement() {
    const classes = useStyles();

    const { auth, setAuth } = useContext(AuthContext);
    const { setLoading } = useContext(LoadingContext);
    const { statement, setStatement } = useContext(StatementContext);

    const rows = statement?.rows?.content ?? [];

    const columns = [
        {
            field: 'type',
            headerName: 'Type',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            valueGetter: (params)=>{
                const {withdrawalAmount, description} = params.row;
                if(withdrawalAmount){
                    if(description.startsWith('To Account')){
                        return 'Outbound Transfer';
                    }
                    else{
                        return 'Withdrawal';
                    }
                }
                else{
                    if(description.startsWith('From Account')){
                        return 'Inbound Transfer';
                    }
                    else{
                        return 'Deposit';
                    }
                }
            },
            renderCell: (params)=>{
                const getIcon = ()=>{
                    switch(params.value){
                        case 'Withdrawal':
                            return(
                                <img src={withdrawalIcon} alt='W' className={classes.typeIcon} />
                            );
                            break;
                        case 'Deposit':
                            return(
                                <img src={depositIcon} alt='D' className={classes.typeIcon} />
                            );
                            break;
                        case 'Inbound Transfer':
                            return(
                                <img src={inboundIcon} alt='I' className={classes.typeIcon} />
                            );
                            break;
                        case 'Outbound Transfer':
                            return(
                                <img src={outboundIcon} alt='O' className={classes.typeIcon} />
                            );
                            break;
                        default:
                            return(
                                <>
                                    Unknown
                                </>
                            )
                    }
                }
                return(
                    <Tooltip title={params.value} enterTouchDelay={0}>
                        <div className={classes.typeIconContainer}>
                            {
                                getIcon()
                            }
                        </div>
                    </Tooltip>
                )
            },
        },
        {
            field: 'amount',
            headerName: 'Amount',
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params)=>{
                const {withdrawalAmount, depositAmount} = params.row;
                return `₹  ${(withdrawalAmount ?? depositAmount) / 100}`;
            },
            flex: 4,
            renderCell: (params)=>{
                return(
                    <p style={{
                        overflowX: 'auto'
                    }}>
                        {params.value}
                    </p>
                )
            }
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 2,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params)=>{
                return(
                    <p style={{
                        overflowX: 'auto'
                    }}>
                        {params.value}
                    </p>
                )
            }
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 3,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params)=>{
                return(
                    <p style={{
                        overflowX: 'auto'
                    }}>
                        {params.value}
                    </p>
                )
            }
        },
    ]

    // useEffect(()=>{
    //     console.log(rows);
    // },[statement]);

    const handleRefresh = async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const token = auth?.token;
            const response = await axios.get(
                GET_STATEMENT_URL,
                {
                    headers: {
                        Authorization: "Bearer "+token,
                    }
                }
            );
            setLoading(false);
            setStatement(response?.data);
        }catch(err){
            if(!err?.response){
                alert('No server response');
            }else{
                alert(err?.response?.data?.message ?? 'An error occured.');
            }
            setLoading(false);
        }
    }

    const CustomPagination = ()=>{
        const apiRef = useGridApiContext();
        const page = useGridSelector(apiRef, gridPageSelector);
        // const pageCount = useGridSelector(apiRef, gridPageCountSelector);
        const count = useGridSelector(apiRef, gridRowCountSelector);
        const rowsPerPage = useGridSelector(apiRef, gridPageSizeSelector);

        return (
        <TablePagination
        component="div"
        variant="outlined"
        shape="rounded"
        page={page}
        count={count}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
        labelRowsPerPage={<span>Records Per Page:</span>}
        onRowsPerPageChange={
            (event)=>{
                apiRef.current.setPageSize(event.target.value);
                apiRef.current.setPage(0);
            }
        }
        onPageChange={
            (event, newPage) =>{
                apiRef.current.setPage(newPage);
            }
        }
        showFirstButton={true}
        showLastButton={true}
        sx={{
            color: 'white',
        }}
        />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <div className={classes.heading}>
                            {auth?.name}[#{statement?.accountId}]
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className={classes.heading}>
                            Balance: ₹{statement?.balancePaise / 100}
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.gridContainer}>
                <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                sx={{
                    color: 'white',
                    backgroundColor: 'darkslategrey',
                    fontWeight: 'bolder',
                    fontSize: '1.2rem',
                }}
                components={{
                    Pagination: CustomPagination,
                }}
                />
            </div>
            <div className={classes.refreshButtonContainer}>
                <Button
                    onClick={handleRefresh}
                    sx={{
                        color: 'greenyellow',
                        backgroundColor: 'green',
                        margin: '.5rem 0',
                        border: '.1rem solid yellowgreen'
                    }}
                >
                    Refresh
                </Button>
            </div>
        </div>
    );
}

export default AccountStatement;