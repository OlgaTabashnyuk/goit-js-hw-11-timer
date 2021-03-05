import './styles.css';

function pad (value) {
    return String(value).padStart(2, '0');
};

function getTimeFormat (time) {
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
};

function moment(time) {
    return getTimeFormat(time)
}
class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.timerId = null;
        this.targetDate = targetDate;
        this.refs = {
            $days: document.querySelector(`${selector} [data-value="days"]`),
            $hours: document.querySelector(`${selector} [data-value="hours"]`),
            $mins: document.querySelector(`${selector} [data-value="mins"]`),
            $secs:document.querySelector(`${selector} [data-value="secs"]`),
        }
    }
     start() {
         this.timerId = setInterval(() => { 
             const deltaTime = this.targetDate - Date.now()
         const time = moment(deltaTime)
         this.updInterface(time)
         }, 1000)
         
    };
    updInterface({ days, hours, mins, secs }) {
        const { $days, $hours, $mins, $secs } = this.refs
        $days.textContent = days
        $hours.textContent = hours
        $mins.textContent = mins
        $secs.textContent = secs 
        
    }
}

function initTimer (selector, targetDate) {
    const timer = new CountdownTimer({ selector, targetDate });
    timer.start()

}
initTimer('#timer-1', new Date('Jul 17, 2021'));


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
