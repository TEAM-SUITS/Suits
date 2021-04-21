import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import SearchHeaderBar from "containers/SearchHeaderBar/SearchHeaderBar";
import Card from "components/Card/Card";
import QnAContent from "components/Content/QnAContent";
import { fetchSearchData } from "redux/storage/search/search";

/* -------------------------------------------------------------------------- */

export default function SearchPage() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.search);
  const [searchWord, setSearchWord] = useState('javascript');
  // e.target.value였다가 엔터 입력하면 setSearchWord

  useEffect(() => {
    if (searchWord !== '') {
      dispatch(fetchSearchData(searchWord));
    }
  }, [searchWord, dispatch]);

  return (
    <>
      <TextHeaderBar page="search" />
      <PageContainer
        page="search"
        variants={pageEffect}
        initial="hidden"
        animate="visible"
      >
        <SearchHeaderBar />
        <TextHeaderBar page="search" />
        { data.searchData && // 검색 결과가 없을 경우에 대한 처리 필요
          data.searchData.map(data => (
            <Card
              key={data._id}
              isQuestion={true}
              title={data.content}
            >
              <QnAContent
                key={data._id}
                answer={
                  // 빈 객체일 경우 false 전달
                  data.answers[0].hasOwnProperty('likes') &&
                  data.answers.reduce((prev, curr) => {
                    if (curr.likes.length >= prev.likes.length) {
                      return curr;
                    }

                    return prev;
                  }, { likes: [] })
              } />
            </Card>
          ))
        }
      </PageContainer>
    </>
  );
}
