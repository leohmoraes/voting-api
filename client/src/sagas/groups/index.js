import { takeEvery } from 'redux-saga/effects';
import { GET_USER_GROUPS_INIT } from '../../components/GroupSideBar/modules/types';
import getUserGroups from './getGroups';

export default function* groups() {
  yield takeEvery(GET_USER_GROUPS_INIT, getUserGroups);
}
