import _ from 'lodash';
import jsonPlaceHolder from '../apis/jsonPlaceHolder';

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceHolder.get('/posts');
  dispatch({
    type: 'FETCH_POST',
    payload: response.data
  });
};

export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

//using memoize function of lodash to load one unique id of user only once
const _fetchUser = _.memoize(async (id, dispatch) => {
  const user = await jsonPlaceHolder.get(`/users/${id}`);
  dispatch({
    type: 'FETCH_USER',
    payload: user.data
  });
});
