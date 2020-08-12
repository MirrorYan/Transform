import { Request } from './request';

const domain = 'http://192.168.7.71:8000/';

export const URL = {
  getDetail: domain + 'getYamlDetail', // 获取文件详情
  convert: domain + 'convert', // JSON & YAML 转换
  runYaml: domain + 'Api/runYaml', // 执行
};

// Get testcase list
export const getTstcsLst = () => Request({
  url: domain + 'api/v1/testcases/',
  method: 'get'
});

// Get testcase detail
export const getTstcsDtl = (id) => Request({
  url: domain + 'api/v1/testcase/' + id,
  method: 'get'
});

// JSON & YAML conversion
export const JsYmConvert = ({type, data}) => Request({
  url: domain + 'api/v1/convert',
  method: 'post',
  data: {
    type,
    data
  }
});

// Run testcase.
export const runTstcs = (json) => Request({
  url: domain + 'api/v1/runTestcase',
  method: 'post',
  data: {
    json_data: json
  }
});

// Upload .har file
export const uploadHar = domain + 'api/v1/uploadHarFile';