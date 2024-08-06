import { useQuery } from "react-query";
import "./App.css";
import { getAll } from "./API/api";
import { CardList } from "./Components/CardList";
import { Container } from "./Components/Container";
import { useEffect, useState } from "react";
import { Results, CustomError } from "./assets/schema/schema";
import { Form } from "./Components/Form";

function App() {
  const [page, setPage] = useState(1);
  const [dataList, setDataList] = useState<Results[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState(false);

  const loadMore = (): void => {
    setPage((prev) => (prev += 1));
  };

  const handleSubmit = (
    value: string,
    gender: string,
    status: string
  ): void => {
    if (!value.trim() && !gender && !status) {
      alert("Pleas write something");
      return;
    }

    if (value || gender || status) {
      setInputValue(value);
      setGender(gender);
      setStatus(status);
      setPage(1);
      setDataList([]);
      setHasNextPage(true);

      return;
    }
  };

  const sortState = () => {
    setSort(!sort);
    setDataList((prev) => {
      return prev.sort((a, b) => a.name.localeCompare(b.name));
    });
  };

  const { isLoading, error, data } = useQuery(
    ["data", page, inputValue, gender, status],
    () => getAll(page, inputValue, gender, status),

    {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 10 * 1000,
      enabled: hasNextPage,
    }
  );

  useEffect(() => {
    if (data) {
      setDataList((prev) => [...prev, ...data.results]);
    }
  }, [data, inputValue]);

  useEffect(() => {
    if (data?.info.pages === page) {
      setHasNextPage(false);
    }
  }, [page, data?.info.pages]);

  return (
    <Container>
      <header className="pb-3 border-b-4 border-indigo-500">
        <Form handleSubmit={handleSubmit} />
        {data && (
          <button
            type="button"
            className=" fixed top-41 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded w-50 "
            onClick={() => sortState()}
          >
            Sort by name
          </button>
        )}
      </header>

      {isLoading && (
        <div className="mx-auto mt-6 border-gray-300 h-40 w-40 animate-spin rounded-full border-8 border-t-blue-600" />
      )}

      {error ? (
        <h3 className="text-2xl text-center font-bold mt-10 ml-10">
          {(error as CustomError).status === 404 ? (
            <>Error: Characters with these parameters were not found.</>
          ) : (
            <>
              Error: {(error as CustomError).message || "Something went wrong."}
            </>
          )}
        </h3>
      ) : null}

      <CardList data={dataList} />
      {data && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-auto block rounded mt-20 w-64"
          onClick={loadMore}
        >
          Load more
        </button>
      )}
    </Container>
  );
}

export default App;
