const Downloader = require("nodejs-file-downloader");
const os = require('os')
    , path = require("path")
    , log = require('single-line-log').stdout
    ;
let pre = "node";

(async () => {
    if (os.platform() === 'linux' && process.arch === "arm64") {
        return;
    }
    const packagePath = path.join(process.env["INIT_CWD"] || __dirname, "package.json");
    const package = require(packagePath);


    if ((package.devDependencies && package.devDependencies.electron)
        || (package.dependencies && package.dependencies.electron)) {
        pre = "electron";
    }
    //throw new Error(pre);
    const fileUrl = `https://raw.githubusercontent.com/zsea/node-hardware-bin/master/${pre}-hardware-${os.platform()}-${process.arch}.node`;
    const options = {
        url: fileUrl,
        directory: "./",
        cloneFiles: false,
        fileName: `hardware-${os.platform()}-${process.arch}.node`,
        onProgress: function (percentage, chunk, remainingSize) {
            log(`Downloading ${percentage}% ${fileUrl}\n`);
        },
    }
    if (typeof process.env["npm_config_https_proxy"]==="string") {
        options["proxy"] = process.env["npm_config_https_proxy"];
    }
    const downloader = new Downloader(options);

    try {
        await downloader.download();
        console.log('Download done.');
    } catch (error) {
        console.log(error);
    }
    finally {

    }
})();