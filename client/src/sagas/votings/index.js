import { takeEvery } from 'redux-saga/effects';
import {
  GET_NEW_VOTINGS_INIT,
  GET_RECENT_VOTINGS_INIT,
} from '../../components/NavSideBar/modules/types';
import {
  GET_ONE_VOTING_INIT,
  GET_VOTING_CANDIDATES_INIT,
  SEND_VOTE_INIT,
  CHECK_USER_CAN_VOTE_INIT,
} from '../../routes/VotingItem/modules/types';
import {
  ADD_VOTING_INIT,
  ADD_CANDIDATES_INIT,
} from '../../routes/VotingForm/modules/types';

import getVotingsByState from './getVotinsByState';
import getOneVoting from './getVoting';
import getVotingCandidates from './getVotingCandidates';
import createVoting from './createVoting';
import addCandidates from './addCandidates';
import sendVote from './sendVote';
import checkUserCanVote from './checkUserCanVote';

export default function* votings() {
  yield takeEvery(GET_NEW_VOTINGS_INIT, getVotingsByState);
  yield takeEvery(GET_RECENT_VOTINGS_INIT, getVotingsByState);
  yield takeEvery(GET_ONE_VOTING_INIT, getOneVoting);
  yield takeEvery(GET_VOTING_CANDIDATES_INIT, getVotingCandidates);
  yield takeEvery(ADD_VOTING_INIT, createVoting);
  yield takeEvery(ADD_CANDIDATES_INIT, addCandidates);
  yield takeEvery(SEND_VOTE_INIT, sendVote);
  yield takeEvery(CHECK_USER_CAN_VOTE_INIT, checkUserCanVote);
}
