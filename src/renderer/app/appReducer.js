const INITIAL_STATE = {
  title: 'Schedules',
  page: 'Schedules',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'PAGE_CHANGED': {
      let payload = null;
      if (state.page === 'Schedules') {
        payload = 'Configuration';
      } else {
        payload = 'Schedules';
      }
      return { ...state, page: payload };
    }

    default:
      return state;
  }
};
