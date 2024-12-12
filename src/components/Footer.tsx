import styled from 'styled-components';
import Button from './Button';
import { useLogout } from '../hooks/useAuth';

const SFooter = styled.div`
    padding: 20px 0px;
    display: flex;
    align-items: center;
    border-top: 1px solid #e2e2e2;
    width: 100%;
    justify-content: space-between;
`;

const CopyRightText = styled.span`
    opacity: 0.5;
`;

function Footer() {
    const { logout } = useLogout();

    return (
        <SFooter>
            <Button
                text={'로그아웃'}
                colorType={'NEGATIVE'}
                onClick={logout}
            />
            <CopyRightText>©palette.black</CopyRightText>
            <Button 
                text={'내 정보 보러가기'}
                colorType={'DEFAULT'}
            />
        </SFooter>
    );
}

export default Footer;