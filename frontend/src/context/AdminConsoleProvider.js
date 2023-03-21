import { combineComponents } from 'utils/combineComponents';
import { WithdrawalProvider } from 'context/WithdrawalProvider';
import { DepositProvider } from 'context/DepositProvider';
const providers = [
    WithdrawalProvider,
    DepositProvider,
]
const AdminConsoleProvider = combineComponents(...providers);

export default AdminConsoleProvider;