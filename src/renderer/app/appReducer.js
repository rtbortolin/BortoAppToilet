const INITIAL_STATE = {
  title: 'Schedules',
  subtitle: '',
  page: 'Schedules',
  isDrawerOpen: false,
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

    case 'TOGGLE_DRAWER_OPEN': {
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    }

    default:
      return state;
  }
};
