import { ReactNode } from 'react';
import styled from 'styled-components';

const SHeader = styled.div`
    padding: 20px 0px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e2e2e2;
    width: 100%;
`;

const SHeaderCenterItem = styled.div`
    display: flex;
    font-size: 25px;
    width: 50%;
    justify-content: center;
`;

const SHeaderLeftItem = styled.div`
    display: flex;
    width: 25%;
    justify-content: start;
`;

const SHeaderRightItem = styled.div`
    display: flex;
    width: 25%;
    justify-content: end;
`;

interface IHeader {
    title: string;
    leftChild?: ReactNode;
    rightChild?: ReactNode;
}

function Header({ title, leftChild, rightChild }: IHeader) {
    return (
        <SHeader>
            <SHeaderLeftItem>{leftChild}</SHeaderLeftItem>
            <SHeaderCenterItem>{title}</SHeaderCenterItem>
            <SHeaderRightItem>{rightChild}</SHeaderRightItem>
        </SHeader>
    );
}

export default Header;