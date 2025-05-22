import React from "react";

interface Props {
  title: string;
  imageUrl: string;
  onSelected: () => void;
  selected: boolean;
}

const CardRoom = ({ title, imageUrl, onSelected, selected }: Props) => {
  return (
    <div
      onClick={onSelected}
      className={`cursor-pointer rounded-xl shadow-md  outline-2 ${
        selected ? "outline-green-500" : "outline-black"
      } transition duration-200`}
    >
      <div className="overflow-hidden rounded-t-xl ">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-t-xl w-full h-40 object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-bold text-md">{title}</h3>
      </div>
    </div>
  );
};

export default CardRoom;
