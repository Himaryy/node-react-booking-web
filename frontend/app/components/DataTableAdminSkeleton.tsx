import { Skeleton } from "./ui/skeleton";

const DataTableSkeleton = () => {
  return (
    <div className="rounded-md border bg-gray-900 text-white w-full">
      <div className="p-4 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-4 w-8" /> {/* No */}
            <Skeleton className="h-4 w-32" /> {/* Nama */}
            <Skeleton className="h-4 w-32" /> {/* Ruangan */}
            <Skeleton className="h-4 w-48" /> {/* Keperluan */}
            <Skeleton className="h-4 w-24" /> {/* Tanggal */}
            <Skeleton className="h-4 w-24" /> {/* Waktu */}
            <Skeleton className="h-4 w-16" /> {/* Durasi */}
            <Skeleton className="h-4 w-20" /> {/* Status */}
            <Skeleton className="h-4 w-12" /> {/* Aksi */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTableSkeleton;
