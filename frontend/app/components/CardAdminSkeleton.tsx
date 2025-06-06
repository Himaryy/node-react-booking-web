import { Skeleton } from "./ui/skeleton";

const CardAdminSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
      {[...Array(4)].map((_, idx) => (
        <div
          key={idx}
          className="rounded-xl p-4 flex items-center gap-3 shadow-md bg-gray-800"
        >
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardAdminSkeleton;
