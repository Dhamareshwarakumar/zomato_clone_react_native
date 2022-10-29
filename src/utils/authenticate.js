import { Text } from 'react-native';
import Login from '../screens/Login';

export default authenticate = (WrappedComponent) => {
    const authenticated = false;

    if (authenticated) return WrappedComponent;

    return () => <Login />
}