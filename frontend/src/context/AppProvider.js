import { combineComponents } from 'utils/combineComponents';
import { AuthProvider } from './AuthProvider';
import { LoadingProvider } from './LoadingProvider';
const providers = [
    AuthProvider,
    LoadingProvider,
]
const AppProvider = combineComponents(...providers);

export default AppProvider;