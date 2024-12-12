import { Outlet } from 'react-router-dom';
import { useMeQuery } from '../hooks/useAuth';
import { useSetRecoilState } from 'recoil';
import { meState } from '../recoil/tokenAtom';
import { useEffect } from 'react';

function Layout() {
    const setMe = useSetRecoilState(meState);
    const { isLoading, data } = useMeQuery();

    useEffect(() => {
        if (data) {
            setMe(data);
        }
    }, [data, setMe]);

    return(
        <>
            {
                isLoading ? (
                    <></>
                ) : (
                    <Outlet />
                )
            }
        </>
    );
}

export default Layout;