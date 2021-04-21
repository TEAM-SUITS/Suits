import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import SearchHeaderBar from "containers/SearchHeaderBar/SearchHeaderBar";
import Card from "components/Card/Card";
import QnAContent from "components/Content/QnAContent";
import { fetchSearchData } from "redux/storage/search/search";
import styled from "styled-components";
import { spoqaMedium } from "styles/common/common.styled";
import { array, string } from "prop-types";
import QnADialog from "containers/QnADialog/QnADialog";
import API from "api/api";

/* ---------------------------- styled components --------------------------- */
const InfoImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 300px;

  // mobile
  @media screen and (max-width: 480px) {
    width: 200px;
  }
`;

const InfoMsg = styled.p`
  ${spoqaMedium}
  text-align: center;
  color: var(--color-gray3);
`;

/* ---------------------------------- 검색 영역 --------------------------------- */
function ResultsSection({ result = [], word = "" }) {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [question, setQuestion] = useState({});

  // 이벤트 핸들러(QnA 다이얼로그 제어)
  const handleDialog = async id => {
    const res = await API(`/api/questions/${id}`, 'get');
    setQuestion(res);
    setIsDialogVisible(true);
  };

  // const showDialog = async id => {
  //   const res = await axios.get(`/api/questions/${id}`);
  //   setQuestion(res.data);
  // };

  // useEffect(() => {
  //   showDialog(questionId);
  //   setIsDialogVisible(true);
  // }, [questionId]);

  if (result === null || word === "") {
    return <InfoMsg>검색하실 단어를 입력해주세요.</InfoMsg>;
  }
  // 검색 결과가 존재하지 않을 경우
  if (!result.length) {
    return (
      <>
        <InfoImg src="assets/empty.png" alt="검색 결과 없음" />
        <InfoMsg>{`"${word}"에 대한 검색 결과가 없습니다.`}</InfoMsg>
      </>
    );
  }

  return (
    <>
      <QnADialog
        isVisible={isDialogVisible}
        onClick={() => setIsDialogVisible(false)}
        question={question}
      />
      {result.map((data, idx) => (
        <>
          {/* <QnADialog
            isVisible={isDialogVisible}
            onClick={() => setIsDialogVisible(false)}
            question={data}
          /> */}
          <Card
            key={data._id + 'a'}
            isQuestion={true}
            title={data.content}
            onClick={() => handleDialog(data._id)}
          >
            <QnAContent
              key={data._id + 'b'}
              answer={
                // 빈 객체일 경우 false 전달
                data.answers[0].hasOwnProperty("likes") &&
                data.answers.reduce(
                  (prev, curr) => {
                    if (curr.likes.length >= prev.likes.length) {
                      return curr;
                    }

                    return prev;
                  }, { likes: [] }
                )
              }
            />
          </Card>
        </>
        ))}
    </>
  );
}

/* ------------------------------- Search Page ------------------------------ */
export default function SearchPage() {
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search);
  const [searchWord, setSearchWord] = useState(searchState.searchWord);
  const [prevSearchWord, setPrevSearchWord] = useState(searchWord);

  useEffect(() => {
      dispatch(fetchSearchData(searchWord, prevSearchWord));
  }, [searchWord, dispatch]);

  const handleSearchWord = (e) => {
    // enter -> setSearchWord
    if (e.key === "Enter") {
      setPrevSearchWord(searchWord);
      setSearchWord(e.target.value);
    }
  };

  const handleCancelButton = () => {
    setPrevSearchWord(searchWord);
    setSearchWord("");
  };

  return (
    <>
      <TextHeaderBar page="search" />
      <PageContainer
        page="search"
        variants={pageEffect}
        initial="hidden"
        animate="visible"
      >
        <SearchHeaderBar
          onKeyUp={handleSearchWord}
          onClick={handleCancelButton}
          initialWord={searchWord}
        />
        <TextHeaderBar page="search" />
        <ResultsSection
          result={searchState.searchData}
          word={searchWord}
        />
      </PageContainer>
    </>
  );
}

/* -------------------------------- proptypes ------------------------------- */
ResultsSection.propTypes = {
  result: array,
  word: string,
};
