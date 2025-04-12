// This is a re-export of the useAuth hook from the AuthContext
// This makes imports cleaner in components
import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = useAuthContext;