
const today = new Date();
// module.exports ist das gleiche wie exports ohne module
exports.getDate = function () { 
  let currentDay = {
    weekday: 'long',
    day: 'numeric',
    month: 'long' 
  };
  return today.toLocaleDateString('de-DE', currentDay);
};

exports.getDay = function () { 
  let currentDay = {
    weekday: 'long' 
  };
  return today.toLocaleDateString('de-DE', currentDay);
};
