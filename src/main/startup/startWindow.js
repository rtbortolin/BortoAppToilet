
function setOpenOnLogin() {
  this.app.setLoginItemSettings({
    openAtLogin: true,
  });
}

function init(app) {
  this.app = app;
  setOpenOnLogin();
}


module.exports = init;
