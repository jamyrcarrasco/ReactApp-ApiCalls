import axios from "./httpGeneral";

export function getRepositoriesByName(name) {
  return axios.get(`search/repositories?q=${name}in:name`);
}

export function getRepositoryList(url) {
  return axios.get(`${url}`);
}
