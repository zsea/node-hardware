[English](./README.MD)

> 注意：当前仅支持```win32-x64```平台。

获取计算机的硬件信息：
* CPU
* 硬盘
* 网址

# 安装

```
npm install --save hardware
```

# 示例

## CPU信息
```javascript
const hardware=require("node-hardware");
console.log(hardware.getCpuinfo());
```
结果
```js
{
  arch: 'x64',
  vendor: 'GenuineIntel',
  model: 'Intel(R) Core(TM) i9-14900K',
  cpuid: 'BFCBFBFF000B0671'
}
```
## 真实网卡MAC地址
```javascript
const hardware=require("node-hardware");
console.log(hardware.getMacAddress());
```
结果
```js
[ 'D8:43:AE:16:3E:BB' ]
```
## 硬盘信息
```javascript
const hardware=require("node-hardware");
console.log(hardware.getDiskInformation());
```
结果
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

> 字段```isSystem```表示当前磁盘是否是系统所在磁盘。

## 授权

如果你的进程名是```node.exe```和```electron.exe```，你的使用将不会有任何限制，除此之外，你需要购买**License**才能使用。

```javascript
const hardware=require("node-hardware");
console.log(hardware.setLicense("..."));
```
如果**License**有效，将会返回```true```。