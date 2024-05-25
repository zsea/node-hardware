const Downloader = require("nodejs-file-downloader");
const arch = process.arch
    ,os = require('os')
    ,log = require('single-line-log').stdout
;
const fileUrl=`https://raw.githubusercontent.com/zsea/node-hardware-bin/master/hardware-${os.platform()}-${process.arch}.node`;

(async () => {
    const downloader = new Downloader({
        url: fileUrl,
        directory: "./", 
        cloneFiles:false,
        proxy:process.env["npm_config_https_proxy"],
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
    finally{
        
    }
})();