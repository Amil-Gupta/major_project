import { combineComponents } from 'utils/combineComponents';
import { StatementProvider } from 'context/StatementProvider';
import { TransferProvider } from 'context/TransferProvider';
const providers = [
    TransferProvider,
    StatementProvider,
]
const CustomerConsoleProvider = combineComponents(...providers);

export default CustomerConsoleProvider;