import { Request } from './request';

export const URL = {
  getDetail: 'getYamlDetail', // 获取文件详情
  convert: 'convert', // JSON & YAML 转换
  runYaml: 'Api/runYaml', // 执行
};

export const userLogin = (data) => Request({
  url: 'api/v1/login',
  method: 'post',
  data
});

export const getVerifyCode = () => Request({
  url: 'api/v1/verify',
  method: 'get'
});

// Get testcase list
export const getTstcsLst = () => Request({
  url: 'api/v1/testcases/',
  method: 'get'
});

// Get testcase detail
export const getTstcsDtl = (id) => Request({
  url: 'api/v1/testcase/' + id,
  method: 'get'
});

// Get History list
export const getHistoryLst = () => Request({
  url: 'api/v1/history',
  method: 'get'
});

// Get Test step list.
export const getTstStepLst = ({skip=0, limit=100 }={}) => Request({
  url: 'api/v1/teststeps',
  method: 'get',
  data: {
    skip,
    limit
  }
});

// JSON & YAML conversion
export const JsYmConvert = ({type, data}) => Request({
  url: 'api/v1/convert',
  method: 'post',
  data: {
    type,
    data
  }
});

// Run testcase.
export const runTstcs = (json) => Request({
  url: 'api/v1/runTestCase',
  method: 'post',
  data: {
    json_data: json
  }
});

// Upload .har file
export const uploadHar = (file) => Request({
  url: 'api/v1/uploadHarFile',
  method: 'post',
  data: file
});