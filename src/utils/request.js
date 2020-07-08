const domain = 'http://192.168.12.190:60000/';

export const URL = {
  getList: domain + 'getYamlList', // 获取文件目录列表
  getDetail: domain + 'getYamlDetail', // 获取文件详情
  convert: domain + 'convert', // JSON & YAML 转换
};