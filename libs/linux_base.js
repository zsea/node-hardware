const fs = require("fs")
    , path = require("path")
    ;
function getCpuinfo() {
    const cpuinfo = fs.readFileSync('/proc/cpuinfo', { encoding: "utf-8" });
    const info = {};
    const lines = cpuinfo.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const item = lines[i].trim();
        if (!item.length) break;
        const kv = item.split(':').map(x => x.trim());
        if (kv[0] === 'model name') {
            info["model"] = kv[1];
            if (info["vendor"]) {
                break;
            }

        }
        else if (kv[0] === 'vendor_id') {
            info["vendor"] = kv[1];
            if (info["model"]) {
                break;
            }
        }
    }


    return info;
}
function getMacAddress() {
    const allNameList = fs.readdirSync('/sys/class/net/');
    const virtualNameList = fs.readdirSync('/sys/devices/virtual/net/');
    const realNameList = allNameList.filter(function (n) {
        return virtualNameList.indexOf(n) === -1;
    });
    return realNameList.map(function (n) {
        return fs.readFileSync(`/sys/class/net/${n}/address`, { encoding: "utf-8" }).trim();
    });
}
function getDeviceNameByUUID(uuid) {
    const uuidPath = `/dev/disk/by-uuid/${uuid}`;
    const link = fs.readlinkSync(uuidPath);
    const dev = path.basename(link);
    return dev;
}
function getRootDevice() {
    const fstab = fs.readFileSync('/etc/fstab', { encoding: "utf-8" });
    const lines = fstab.split('\n');
    let root;
    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].trim().length) continue;
        const item = lines[i].trim();
        if (item.startsWith('#')) continue;
        const cells = item.split(/\s+/);
        if (!cells[1]) continue;
        if (cells[1].trim() === '/') {
            root = cells[0].trim();
            break;
        }
    }
    if (!root) return;
    // console.log('root',root);
    if (root.startsWith("UUID=")) return getDeviceNameByUUID(root.replace("UUID=", ''));
    return root;
}
function getDiskInformation() {
    const allNameList = fs.readdirSync('/sys/class/block');
    const devices = [];
    for (let i = 0; i < allNameList.length; i++) {
        const name = allNameList[i];
        if (!name.startsWith('sd') /*&& !name.startsWith("sr") */ && !name.startsWith("nvme")) continue;
        const index = devices.findIndex(function (n) {
            return name.startsWith(n) || n.startsWith(name);
        });
        if (index === -1) {
            devices.push(name);
        }
        else {
            if (name.length < devices[index].length) {
                devices[index] = name;
            }
        }
    }
    const rootDevice = getRootDevice()
    return devices.map(function (n, index) {
        const info = {
            no: index
        };
        let model, sn;
        try {
            model = fs.readFileSync(`/sys/class/block/${n}/device/model`, { encoding: "utf-8" });
            if (model) model = model.trim()
        }
        catch (e) { }
        try {
            sn = fs.readFileSync(`/sys/class/block/${n}/device/serial`, { encoding: "utf-8" });
            if (sn) sn = sn.trim()
        }
        catch (e) { }
        if (!sn) {
            try {
                sn = fs.readFileSync(`/sys/class/block/${n}/device/wwid`, { encoding: "utf-8" });
                if (sn) sn = sn.split('\n')[0]
                if (sn) {
                    sn = sn.split(/\s+/);
                    sn = sn[sn.length - 1];
                    sn = sn.trim();
                }
            }
            catch (e) { }
        }
        info["productId"] = model;
        info["sn"] = sn;
        info["isSystem"] = rootDevice.startsWith(n);
        return info;
    });
}
function setLicense() {
    return true
}
module.exports = {
    getCpuinfo: getCpuinfo,
    getMacAddress: getMacAddress,
    getDiskInformation: getDiskInformation,
    setLicense: setLicense,
    version: 1,
    appName: path.basename(process.execPath)
}