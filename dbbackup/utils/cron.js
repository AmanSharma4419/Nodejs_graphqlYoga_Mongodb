const Cron = require("../backup");

setTimeout(() => {
  Cron.dbAutoBackUp();
}, 5000);
