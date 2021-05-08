import axios from "axios";
import { randomDate } from "./randomDate";
export const API_KEY = "e52a287d86469bf01ea901dfd92cf8a5";

const DATE = randomDate();
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&date=${DATE}&format=json&nojsoncallback=1&per_page=6`;

export default () => {
  return axios.create({
    baseURL: `${API_ENDPOINT}`,
  });
};
