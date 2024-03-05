import axios from "axios";

export const consumeAPI = async () => {
  const res = await axios
    .get("https://rickandmortyapi.com/api/character")
    .then((res) => res.data);
  return res;
};

export const consumeAPIDetail = async (id: string) => {
  const res = await axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then((res) => res.data);
  return res;
};

export const consumeAPILocation = async (id: string) => {
  const res = await axios
    .get(`https://rickandmortyapi.com/api/location/${id}`)
    .then((res) => res.data);
  return res;
};
