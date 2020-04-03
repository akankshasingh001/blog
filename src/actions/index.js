import jsonPlaceHolder from '../apis/jsonPlaceHolder';

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceHolder.get('/posts');
  dispatch({
    type: 'FETCH_POST',
    payload: response.data
  });
};

export const fetchUser = id => async dispatch => {
  const user = await jsonPlaceHolder.get(`/users/${id}`);
  dispatch({
    type: 'FETCH_USER',
    payload: user.data
  });
};
