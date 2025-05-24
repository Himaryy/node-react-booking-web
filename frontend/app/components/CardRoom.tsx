import { cn } from "~/lib/utils";

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
      className={cn(
        "cursor-pointer rounded-xl border border-neutral-300 mb-3 bg-white shadow-sm transition duration-200 hover:shadow-md",
        selected ? "ring-2 ring-black" : "hover:ring-1 hover:ring-neutral-400"
      )}
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
