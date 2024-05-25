const hardware = require("./index");
console.log(hardware.version);
console.log(hardware.appName);
console.log(hardware.getCpuinfo());
console.log(hardware.getMacAddress());
console.log(hardware.getDiskInformation());
console.log(hardware.setLicense("a"));