import Client from 'src/utils/client';

const client = new Client();


export const posts = (params) => {
  const url = '/posts/';
  return client.get(url, params);
};
