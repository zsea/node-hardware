const Downloader = require("nodejs-file-downloader");
const os = require('os')
    , path = require("path")
    , fs = require("fs").promises
    , log = require('single-line-log').stdout
    ;
let pre = "node";

(async () => {
    const packagePath = path.join(process.env["INIT_CWD"], "package.json");
    const package = require(packagePath);
    
    
    if ((package.devDependencies && package.devDependencies.electron)
        || (package.dependencies && package.dependencies.electron)) {
        pre = "electron";
    }
    //throw new Error(pre);
    const fileUrl = `https://raw.githubusercontent.com/zsea/node-hardware-bin/master/${pre}-hardware-${os.platform()}-${process.arch}.node`;
    const downloader = new Downloader({
        url: fileUrl,
        directory: "./",
        cloneFiles: false,
        fileName:`hardware-${os.platform()}-${process.arch}.node`,
        proxy: process.env["npm_config_https_proxy"],
        onProgress: function (percentage, chunk, remainingSize) {
            log(`Downloading ${percentage}% ${fileUrl}\n`);
        },
    });

    try {
        await downloader.download();
        console.log('Download done.');
    } catch (error) {
        console.log(error);
    }
    finally {

    }
})();