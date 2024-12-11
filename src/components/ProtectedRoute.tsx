import { useRecoilValue } from 'recoil';
import { isLoginSelector } from '../recoil/tokenAtom';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ 
    children,
}: { 
    children: React.ReactNode;
}) {
    const isLogin = useRecoilValue(isLoginSelector);
    const currentLocation = useLocation();

    if (!isLogin) {
        return <Navigate 
            to='/login' 
            replace 
            state={{ redirectedFrom: currentLocation }} 
        />;
    }

    return <>children</>;
}

export default ProtectedRoute;