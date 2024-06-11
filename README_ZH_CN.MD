[English](./README.MD)

# 支持平台

* windows(ia32/x64)
* Linux(x64/arm64)

> 支持在```electron```中使用。

获取计算机的硬件信息：
* CPU
* 硬盘
* 网卡

# 安装

```
npm install --save node-hardware
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
如果是Linux x64架构，可以传入参数```false```，则不返回```cpuid```信息。
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

> 在Linux下，仅获取了```sd```和```nvme```类型的磁盘信息。

## 授权

如果你的进程名是```node.exe```和```electron.exe```，你的使用将不会有任何限制，除此之外，你需要购买**License**才能使用。

```javascript
const hardware=require("node-hardware");
console.log(hardware.setLicense("..."));
```
如果**License**有效，将会返回```true```。

> 注意：仅在需要调用```addon```中的功能时需要授权，比如可以从```fssys```获取的信息，在调接口是不需要进行授权。