import styled from 'styled-components';
import Button from '../components/Button';
import Header from '../components/Header';
import { useState } from 'react';
import { useDiariesQuery } from '../hooks/useDiary';
import { getMonthRangeByDate } from '../utils/util';
import Diaries from '../components/Diaries';
import Loading from '../components/Loading';
import Menu from '../components/Menu';
import Footer from '../components/Footer';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    flex: 1;
    overflow: hidden;
`;

const NoDataWrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: start;
`;

const Text = styled.span`
    font-size: 24px;
`;

function Home() {
    const [pivotDate, setPivotDate] = useState(new Date());
    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;
    
    const { startDate, endDate } = getMonthRangeByDate(pivotDate);
    const { isLoading, data } = useDiariesQuery({startDate, endDate});

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }

    return (
        <Wrapper>
            <Header
                title={headerTitle}
                leftChild={
                    <Button 
                        colorType={'DEFAULT'} 
                        text={'<'}
                        onClick={onDecreaseMonth}
                        disabled={isLoading}
                    />
                }
                rightChild={
                    <Button 
                        colorType={'DEFAULT'} 
                        text={'>'}
                        onClick={onIncreaseMonth}
                        disabled={isLoading}
                    />
                }
            />
            <Content>
                {
                    isLoading ? (
                        <Loading />
                    ) : data && data.posts.length > 0 ? (
                        <Diaries posts={data.posts} />
                    ) : (
                        <>
                            <Menu />
                            <NoDataWrapper>
                                <Text>작성된 일기가 없어요.</Text>
                            </NoDataWrapper>
                        </>
                    )
                }
            </Content>
            <Footer />
        </Wrapper>
    );
}

export default Home;