let today = new Date();
let day = '';
let date = today.toLocaleDateString('de-DE', options);
let time = today.toLocaleTimeString('de-DE', timeOptions);
let options = { year: 'numeric', month: 'long', day: 'numeric' };
let timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

/* function updateClock() { 
  let today = new Date();
  let date = today.toLocaleDateString('de-DE', options);
  let time = today.toLocaleTimeString('de-DE', timeOptions);
  let day = '';
  $('#date').text(date);
  $('#time').text(time);
    if (today.getDate === 6 || today.getDate === 0) {
      day = 'Weekend'
    $('h3').text('Yaaaah, it`s a weekend');
    } else {
      day = 'Weekday'
    $('h3').text('BoooHooo, it`s not a weekend');
    };
};

setInterval(updateClock, 1000); */

