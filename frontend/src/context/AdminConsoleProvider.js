import { combineComponents } from 'utils/combineComponents';
import { WithdrawalProvider } from 'context/WithdrawalProvider';
import { DepositProvider } from 'context/DepositProvider';
import { AllTransactionsProvider } from 'context/AllTransactionsProvider';
const providers = [
    WithdrawalProvider,
    DepositProvider,
    AllTransactionsProvider
]
const AdminConsoleProvider = combineComponents(...providers);

export default AdminConsoleProvider;