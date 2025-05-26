import { cn } from "~/lib/utils";

interface Props {
  title: string;
  imageUrl: string;
  status?: "Submit" | "Approved" | "Rejected";
  selected?: boolean;
  onSelected: () => void;
}

const CardRoom = ({ title, imageUrl, onSelected, status, selected }: Props) => {
  const statusColor = {
    Submit: "bg-yellow-500",
    Approved: "bg-green-500",
    Rejected: "bg-red-500",
  };
  return (
    <div
      onClick={onSelected}
      className={cn(
        "cursor-pointer rounded-xl border border-neutral-300 mb-3 bg-white shadow-sm transition duration-200 hover:shadow-md",
        selected ? "ring-2 ring-black" : "hover:ring-1 hover:ring-neutral-400"
      )}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        {/* Status Badge */}
        {status && (
          <div
            className={`absolute right-2 top-2 rounded-xl px-4 py-1 text-xs font-semibold text-white ${statusColor[status]}`}
          >
            {status}
          </div>
        )}

        {/* Image */}
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
