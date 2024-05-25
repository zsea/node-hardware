[简体中文](./README_ZH_CN.MD)

> Note: Currently, only the ```win32-x64``` platform is supported.

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

### Licensing

If your process name is `node.exe` or `electron.exe`, your use will be unrestricted. Otherwise, you need to purchase a **License** to use it.

```javascript
const hardware = require("node-hardware");
console.log(hardware.setLicense("..."));
```

If the **License** is valid, it will return `true`.
