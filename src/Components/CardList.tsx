import { Results } from "../assets/schema/schema";
import { FC } from "react";

import { Card } from "./Card";

interface CardListProps {
  data: Results[];
}

export const CardList: FC<CardListProps> = ({ data }) => {
  return (
    <>
      {" "}
      <ul className="grid gap-x-8 gap-y-4 grid-cols-1 justify-content: center pt-3 md:grid-cols-2 lg:grid-cols-5">
        {data.map((el) => {
          return <Card el={el} key={el.id} />;
        })}
      </ul>
    </>
  );
};
