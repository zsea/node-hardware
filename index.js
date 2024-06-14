const arch = process.arch
    , os = require('os')
    ;
let packageName = `./hardware-${os.platform()}-${arch}.node`;
if (os.platform() === 'linux') {
    if (arch === "arm64") {
        packageName = "./libs/hardware-linux-arm64.js"
    }
    else if (arch === "x64") {
        packageName = "./libs/hardware-linux-x64.js"
    }
    else if(arch === "loong64") {
        packageName = "./libs/hardware-linux-loong64.js"
    }  

}
const hardware = require(packageName);
const h = {
    /**
     * get version no.
     * @returns Number
     */
    get version() { return hardware.version },
    /**
     * @returns string
     */
    get appName() { return hardware.appName },
    /**
     * get cpu informatrion
     * @returns Object
     */
    getCpuinfo() {
        return Object.assign({ arch: process.arch }, hardware.getCpuinfo())
    },
    /**
     * get the MAC address of the physical network card
     * @returns Array<string>
     */
    getMacAddress() {
        return hardware.getMacAddress();
    },
    /**
     * 
     * @returns Object
     */
    getDiskInformation() {
        return hardware.getDiskInformation()
    },
    /**
     * 
     * @param {string} license 
     * @returns boolean
     */
    setLicense(license) {
        return hardware.setLicense(license);
    }
}
module.exports = h;
