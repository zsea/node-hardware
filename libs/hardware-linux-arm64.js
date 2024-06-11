const fs = require("fs")
    , path = require("path")
    , base=require("./linux_base")
    ;
function getCpuinfo() {
    const info=base.getCpuinfo();

    let cpuid = fs.readFileSync('/sys/devices/system/cpu/cpu0/regs/identification/midr_el1', { encoding: "utf-8" });
    info["cpuid"] = cpuid.trim().replace(/^0x/ig, '');
    return info;
}

function setLicense() {
    return true
}
module.exports = {
    getCpuinfo: getCpuinfo,
    getMacAddress: base.getMacAddress,
    getDiskInformation: base.getDiskInformation,
    setLicense: setLicense,
    version: base.version,
    appName: path.basename(process.execPath)
}