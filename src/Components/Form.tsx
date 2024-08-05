import { FormEvent, ChangeEvent, FC } from "react";
import { useState } from "react";

interface FormProps {
  handleSubmit(inputValue: string, gender: string, status: string): void;
}

export const Form: FC<FormProps> = ({ handleSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(inputValue, gender, status);
    setInputValue("");
    setGender("");
    setStatus("");
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    switch (e.target.name) {
      case "name":
        return setInputValue(e.target.value);
      case "gender":
        return setGender(e.target.value);
      case "status":
        return setStatus(e.target.value);
    }
  };
  return (
    <form onSubmit={onSubmit} className="grid justify-items-center gap-4">
      <label>
        <input
          type="text"
          name="name"
          value={inputValue}
          className="mt-1 block w-52 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 sm:w-96"
          placeholder="Write... "
          onChange={onChange}
        ></input>
      </label>
      <label className="block text-sm font-medium text-gray-700">
        <select
          onChange={onChange}
          name="gender"
          value={gender}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg py-2 px-3 bg-white text-gray-900"
        >
          <option value="" className="text-gray-500">
            Select gender
          </option>
          <option value="male" className="text-gray-900">
            Male
          </option>
          <option value="female" className="text-gray-900">
            Female
          </option>
          <option value="genderless" className="text-gray-900">
            Genderless
          </option>
          <option value="unknown " className="text-gray-900">
            Unknown
          </option>
        </select>
      </label>
      <label className="block text-sm font-medium text-gray-700">
        <select
          onChange={onChange}
          name="status"
          value={status}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg py-2 px-3 bg-white text-gray-900"
        >
          <option value="" className="text-gray-500">
            Select status
          </option>
          <option value="alive" className="text-gray-900">
            Alive
          </option>
          <option value="dead " className="text-gray-900">
            Dead
          </option>
          <option value="unknown" className="text-gray-900">
            Unknown
          </option>
        </select>
      </label>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded w-64 "
      >
        Find
      </button>
    </form>
  );
};
