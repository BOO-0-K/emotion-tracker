import styled from 'styled-components';
import { IDiaries, IDiary } from '../hooks/useDiary';
import { useEffect, useState } from 'react';
import Diary from './Diary';
import Menu from './Menu';

const Wrapper = styled.div``;

const ListWrapper = styled.div`
    overflow-y: scroll;
    margin-bottom: 30px;
`;

function Diaries({ posts }: IDiaries) {
    const [sortType, setSortType] = useState('desc');
    const [sortedData, setSortedDate] = useState(posts);

    useEffect(() => {
        const compare = (a: IDiary, b: IDiary) => {
            const aDate = new Date(a.createdAt);
            const bDate = new Date(b.createdAt);

            if (sortType === 'desc') {
                return bDate.getTime() - aDate.getTime();
            } else {
                return aDate.getTime() - bDate.getTime();
            }
        };
        const copyPosts = JSON.parse(JSON.stringify(posts));
        copyPosts.sort(compare);
        setSortedDate(copyPosts);
    }, [posts, sortType]);

    return (
        <Wrapper>
            <Menu sortType={sortType} setSortType={setSortType} />
            <ListWrapper>
                {
                    sortedData.map((data) => (
                        <Diary key={data.id} {...data} />
                    ))
                }
            </ListWrapper>
        </Wrapper>
    );
}

export default Diaries;