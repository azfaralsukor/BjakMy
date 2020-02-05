import axios from "axios";

const api = axios.create({
  baseURL: 'https://cdn-discover.hooq.tv/v1.2/discover/'
});

export const getList = async page => {
  try {
    const res = await api.get('feed',
      {
        params: {
          region: 'ID',
          page: page,
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

export const getDetails = async id => {
  try {
    const res = await api.get(`titles/${id}`);
    console.log(res);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}