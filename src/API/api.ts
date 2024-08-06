import axios, { AxiosError } from "axios";
import { CustomError, Response } from "../assets/schema/schema";

export async function getAll(
  page: number,
  inputValue: string,
  gender: string,
  status: string
): Promise<Response | undefined> {
  if (page || inputValue || gender || status) {
    try {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${inputValue}&page=${page}&gender=${gender}&status=${status}`
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status || 500;
        const message = axiosError.message || "An unexpected error occurred";
        throw { status, message } as CustomError;
      } else {
        throw {
          status: 500,
          message: "An unexpected error occurred",
        } as CustomError;
      }
    }
  }
}
