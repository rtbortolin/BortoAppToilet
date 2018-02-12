const INITIAL_STATE = {
  title: 'Schedules',
  subtitle: '',
  page: 'Schedules',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'PAGE_CHANGED': {
      let payload = null;
      if (state.page === 'Schedules') {
        payload = 'Configurations';
      } else {
        payload = 'Schedules';
      }
      return { ...state, title: payload, page: payload };
    }

    default:
      return state;
  }
};
