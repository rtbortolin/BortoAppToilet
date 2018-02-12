import { remote } from 'electron'; // eslint-disable-line
import Store from 'electron-store';
import CONSTs from './constants';

class ConfigHelper {
  constructor() {
    this.store = new Store();
    this.keys = {
      START_WITH_WINDOWS: 'startWithWindows',
      IS_DARK_THEME_ACTIVE: 'isDarkThemeActive',
    };
  }

  getStore() {
    return this.store;
  }

  onDidChange(key, callback) {
    this.getStore().onDidChange(key, callback);
  }

  setStartWithWindows(value) {
    this.setConfigValue(this.keys.START_WITH_WINDOWS, value);
  }
  getStartWithWindows() {
    return this.getConfigValue(this.keys.START_WITH_WINDOWS);
  }

  setIsDarkThemeActive(value) {
    this.setConfigValue(this.keys.IS_DARK_THEME_ACTIVE, value);
  }
  getIsDarkThemeActive() {
    return this.getConfigValue(this.keys.IS_DARK_THEME_ACTIVE, true);
  }

  setConfigValue(key, value) {
    this.store.set(key, value);
  }
  getConfigValue(key, defaultValue = false) {
    const value = this.store.get(key);
    if (value === undefined) {
      return defaultValue;
    }
    return value;
  }
}

let instance = null; // eslint-disable-line
if (CONSTs.isRenderer()) {
  instance = remote.getGlobal('configHelper');
} else {
  instance = new ConfigHelper();
  global.configHelper = instance;
}

export default instance;
