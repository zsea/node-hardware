[简体中文](./README_ZH_CN.MD)

# Supported Platforms

* windows(ia32/x64)
* Linux(x64/arm64/loong64)

> Supported for use in ```electron```.

### Obtain computer hardware information:
* CPU
* Hard Drive
* MAC Address

## Installation

```
npm install --save node-hardware
```

## Examples

### CPU Information
```javascript
const hardware = require("node-hardware");
console.log(hardware.getCpuinfo());
```
Result
```js
{
  arch: 'x64',
  vendor: 'GenuineIntel',
  model: 'Intel(R) Core(TM) i9-14900K',
  cpuid: 'BFCBFBFF000B0671'
}
```
If the architecture is Linux x64, you can pass the argument ```false``` to not return the ```cpuid``` information.
### Real MAC Address
```javascript
const hardware = require("node-hardware");
console.log(hardware.getMacAddress());
```
Result
```js
[ 'D8:43:AE:16:3E:BB' ]
```

### Hard Drive Information
```javascript
const hardware = require("node-hardware");
console.log(hardware.getDiskInformation());
```
Result
```js
[
  {
    no: 0,
    isSystem: false,
    productId: 'KINGSTON SV300S...',
    productRevision: '608A...',
    sn: '50026B7...'
  },
  {
    no: 1,
    isSystem: false,
    productId: 'ST1000DM003...',
    productRevision: 'CC...',
    sn: '......W4Y1ZCWQ'
  },
  {
    no: 2,
    isSystem: true,
    productId: 'ZHITAI ...',
    productRevision: 'ZTA...',
    sn: '0000_0000_0000_0000_...'
  },
  {
    no: 3,
    isSystem: false,
    productId: 'WDC WD...',
    productRevision: '211070...',
    sn: 'E823_8FA6_BF53_0001_...'
  }
]
```

> The field `isSystem` indicates whether the current disk is the system disk.

> In Linux, only the disk information of types `sd` and `nvme` has been obtained.
### Licensing

If your process name is `node.exe` or `electron.exe`, your use will be unrestricted. Otherwise, you need to purchase a **License** to use it.

```javascript
const hardware = require("node-hardware");
console.log(hardware.setLicense("..."));
```

If the **License** is valid, it will return `true`.

> Note: Authorization is required only when it is necessary to invoke functions within the ```addon```, such as information that can be obtained from ```fssys```, and is not required when calling the interface.