import './styles.css';

const daysRef = document.querySelector('[data-value="days"]');
const hoursRef = document.querySelector('[data-value="hours"]');
const minsRef = document.querySelector('[data-value="mins"]');
const secsRef = document.querySelector('[data-value="secs"]');

const startBtnRef = document.querySelector('[data-action="start"]');
const stopBtnRef = document.querySelector('[data-action="stop"]');
/*
* Плагин 
*/
class Timer {
  constructor({onTick}) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }
   start() {
    if (this.isActive) {
      return;
    }
    const targetTime = new Date(2021, 2, 10, 0, 23, 59, 59).getTime();
    this.isActive = true;

      this.intervalId = setInterval(() => {
      const currentTime = Date.now()
      const deltaTime = targetTime - currentTime;
     const time = this.getTimeComponents(deltaTime);
        this.onTick(time);
      }, 1000);
   }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
  getTimeComponents(time) {
  const days = this.pad(Math.floor((time / 1000 / 60 / 60 / 24)));
  const hours = this.pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
  };
  
   pad(value) {
  return String(value).padStart(2, '0');
  }; 
}

const timer = new Timer({
  onTick: updateClockFace,
});
startBtnRef.addEventListener('click', timer.start.bind(timer));

stopBtnRef.addEventListener('click', timer.stop.bind(timer));

function updateClockFace({ days, hours, mins, secs }) {
  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minsRef.textContent = `${mins}`;
  secsRef.textContent = `${secs}`;
}


/*
* вариант 2
*/
// const timer = {
//   intervalId: null,
//   isActive: false,
//   start() {
//     if (this.isActive) {
//       return;
//     }
//     const targetTime = new Date(2021, 2, 10, 0, 23, 59, 59).getTime();
//     this.isActive = true;

//       this.intervalId = setInterval(() => {
//       const currentTime = Date.now()
//       const deltaTime = targetTime - currentTime;
//      const time = getTimeComponents(deltaTime);
//         updateClockFace(time);
//         // console.log(`${days}:${hours}:${mins}:${secs}`);
//       }, 1000);
//   },
//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//   }
// }

// startBtnRef.addEventListener('click', () => {
//    timer.start();
// });

// stopBtnRef.addEventListener('click', () => {
//   timer.stop();
// });


// function getTimeComponents(time) {
//   const days = pad(Math.floor((time / 1000 / 60 / 60 / 24)));
//   const hours = pad(
//     Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//   );
//   const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//   const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

//   return { days, hours, mins, secs };
// };

// function pad(value) {
//   return String(value).padStart(2, '0');
// }

// function updateClockFace({ days, hours, mins, secs }) {
//   daysRef.textContent = `${days}`;
//   hoursRef.textContent = `${hours}`;
//   minsRef.textContent = `${mins}`;
//   secsRef.textContent = `${secs}`;
// }
