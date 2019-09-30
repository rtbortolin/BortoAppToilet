import { ActionTypes as types } from '../../constants';

const INITIAL_STATE = {
  schedules: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_SCHEDULES_SUCCESS: {
      return {
        ...state,
        schedules: action.payload,
      };
    }

    default:
      return state;
  }
};
