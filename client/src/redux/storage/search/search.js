import API from 'api/api';

/* ------------------------------ action types ------------------------------ */
const READ_SEARCH_RESULT = '검색 결과 조회';
const GET_SEARCH_RESULT = '검색어로 검색 요청';
const GET_SEARCH_SUCCESS  = '검색 요청 성공';
const GET_SEARCH_FAILURE = '검색 요청 실패';

/* ----------------------------- thunk ---------------------------- */
export const fetchSearchData = searchWord => async (dispatch) => {
  // 요청 시작
  dispatch({ type: GET_SEARCH_RESULT, searchWord });

  // API 호출
  try {
    // 성공했을 때
    const searchData = await API(`/api/questions/search/${searchWord}`, 'get');
    dispatch({ type: GET_SEARCH_SUCCESS, searchData });
  } catch (error) {
    // 실패했을 때
    dispatch({ type: GET_SEARCH_FAILURE, error });
  }
};

/* ------------------------- initial state + reducer ------------------------ */
const initialState = {
  isLoading: false,
  searchWord: '',
  data: null,
  error: null,
};

export const searchReducer = (
  state = initialState,
  { type, searchWord, searchData, error }
) => {
  switch (type) {
    case READ_SEARCH_RESULT:
      return state;

    case GET_SEARCH_RESULT:
      return {
        ...state,
        isLoading: true,
        searchWord: searchWord,
      };

    case GET_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: searchData,
      };


    case GET_SEARCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

      default:
      return state;
  }
};
