import _ from 'lodash';
import jsonPlaceHolder from '../apis/jsonPlaceHolder';

//Alternate method for lodash memoize function
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach(id => dispatch(fetchUser(id)));

  //refactor of getting userIds with lodash
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

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

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// //using memoize function of lodash to load one unique id of user only once
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const user = await jsonPlaceHolder.get(`/users/${id}`);
//   dispatch({
//     type: 'FETCH_USER',
//     payload: user.data
//   });
// });
