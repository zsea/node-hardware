const node = require(`../hardware-linux-x64.node`)
    , base = require("./linux_base")
    , path = require("path")
    ;
function getCpuinfo(cpuid) {
    if(cpuid!==false) cpuid=true;
    const info = base.getCpuinfo();
    if (cpuid) {
        info["cpuid"] = node.getCpuid()
    }
    return info;
}
module.exports = {
    getCpuinfo: getCpuinfo,
    getMacAddress: base.getMacAddress,
    getDiskInformation: base.getDiskInformation,
    setLicense: node.setLicense,
    version: node.version,
    appName: path.basename(process.execPath)
}