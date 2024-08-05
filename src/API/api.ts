import axios from "axios";

export async function getAll(
  page: number,
  inputValue: string,
  gender: string,
  status: string
) {
  if (page || inputValue || gender || status) {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${inputValue}&page=${page}&gender=${gender}&status=${status}`
    );
    console.log("axios all");
    return data;
  }
}
