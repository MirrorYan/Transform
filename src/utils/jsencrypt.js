import { JSEncrypt } from 'jsencrypt';

// 加密公钥
const key = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSmIUJSqQ82ZA1sGS0yfFeC1wC/YxdyETekxsWIpVrQj/+bB0AXJDIO/hTE/O6H8Kdx9AqmIgcXykc/SONAvT2ZT1tAW202hoxtK/UI/Ws05Z0OHpP3i2qeXVTs7RPcfAcYRkXaq6qPwlFPfSMBJFP+aq/ILJ24i7reo+wdw8ShwIDAQAB
-----END PUBLIC KEY-----`;

// 加密
export default function setEncrypt (msg) {
  const jsencrypt = new JSEncrypt();
  jsencrypt.setPublicKey(key);
  return jsencrypt.encrypt(msg);
}