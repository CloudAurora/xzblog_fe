import axios from 'axios';

function successHandle(result) {
  const { config, data: response } = result;
  if (typeof response !== 'object') return response;
  // for mock error
  if (response.errcode) {
    console.error(response.errcode);
    return null;
  }

  if (response.code === 0) {
    return config.origin ? response : response.data;
  }

  return Promise.reject(response);
}

function errorHandle(error) {
  const { response } = error;
  let reject;
  if (response && response.data && response.data.res) {
    const { res } = response.data;
    reject = {
      code: res.code,
      message: res.message,
    };
  }
  if (response && response.status) {
    reject = {
      code: response.status,
      message: response.statusText,
    };
  }

  if (!response) {
    reject = {
      code: 400,
      message: error.message,
    };
  }

  if (!reject) {
    reject = { code: 400, message: '未知错误' };
  }

  // 有些时候，Python服务器返回500 但message却是OK
  if (reject.code === 500) {
    reject.message = '服务器错误';
  }

  return Promise.reject(reject);
}

const baseURL = 'https://yapi.bytedance.net/mock/844/xztech/blog/v1';

const clientConfig = {
  baseURL,
  timeout: 200000,
};

export default class Client {
  constructor(props) {
    this.config = { ...clientConfig, ...props };
    const axiosClient = axios.create(this.config);
    axiosClient.interceptors.response.use(successHandle, errorHandle);
    this.client = axiosClient;
  }

  get(url, params, option = {}) {
    const defaultOpt = {
      url,
      params,
      method: 'get',
    };
    return this.client.request({ ...defaultOpt, ...option });
  }

  post(url, data, option = {}) {
    const defaultOpt = {
      url,
      data,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    };
    return this.client.request({ ...defaultOpt, ...option });
  }

  update(url, file, option = {}) {
    const formData = new FormData();
    formData.append('file', file);
    const defaultOpt = {
      url,
      data: formData,
      method: 'post',
    };
    return this.client.request({ ...defaultOpt, ...option });
  }

  // download(url, params) {
  //   window.open(`${this.config.baseURL}${url}?${stringify(params, { arrayFormat: 'brackets' })}`)
  // }

  patch(url, data, option = {}) {
    const defaultOpt = {
      url,
      data,
      method: 'patch',
      headers: { 'Content-Type': 'application/json' },
    };
    return this.client.request({ ...defaultOpt, ...option });
  }

  put(url, data, option = {}) {
    const defaultOpt = {
      url,
      data,
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
    };
    return this.client.request({ ...defaultOpt, ...option });
  }

  delete(url, data, option = {}) {
    const defaultOpt = {
      url,
      data,
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    };
    return this.client.request({ ...defaultOpt, ...option });
  }

  static all(requests) {
    return axios.all(requests);
  }
}
