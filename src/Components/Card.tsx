import { Modal } from "./Modal";
import { Results } from "../assets/schema/schema";
import { FC, useState } from "react";

interface CardProps {
  el: Results;
}

export const Card: FC<CardProps> = ({ el }) => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <li
      key={el.id}
      className="grid justify-items-center  border-2 border-indigo-600  rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    >
      <img src={el.image} alt={el.name} onClick={openModal} />
      <div className="grid justify-items-center font-mono tracking-tighter ">
        <p className="text-center">{el.name}</p>
      </div>
      {modal ? (
        <Modal closeModal={closeModal}>
          <img src={el.image} alt={el.name} onClick={openModal} />

          <div className="grid justify-items-center font-mono tracking-tighter ">
            <p>{el.name}</p>
            <p>{el.gender}</p>
            <p>{el.status}</p>
            <p>{el.species}</p>
            <p>{el.location.name}</p>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </li>
  );
};
