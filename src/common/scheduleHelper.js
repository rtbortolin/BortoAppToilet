import pad from 'pad-left';

function getCurrentTime() {
  const currentDate = new Date();
  return parseInt(pad(currentDate.getHours().toString(), 2, '0') + pad(currentDate.getMinutes().toString(), 2, '0'), 0);
}

export default {
  getCurrentTime,
};
