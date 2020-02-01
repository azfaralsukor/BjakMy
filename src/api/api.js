const axios = require('axios');

const api = axios.create({
  baseURL: 'https://cdn-discover.hooq.tv/v1.2/discover/'
});

export const getList = async () => {
  try {
    const res = await api.get('feed',
      {
        params: {
          region: 'ID',
          page: 1,
          perPage: 20
        }
      }
    );
    console.log(res);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export const getDetails = async () => {
  try {
    const res = await api.get('titles/e6464ce6-42c9-43ae-be23-0dd57f50add1');
    console.log(res);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}