import { combineComponents } from 'utils/combineComponents';
import { StatementProvider } from 'context/StatementProvider';
import { TransferProvider } from 'context/TransferProvider';
const providers = [
    TransferProvider,
    StatementProvider,
]
const AppContextProvider = combineComponents(...providers);

export default AppContextProvider;