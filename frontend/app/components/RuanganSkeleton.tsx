const RuanganCardSkeleton = () => {
  return (
    <div className="relative rounded-xl bg-gray-800 border border-gray-700 shadow-sm animate-pulse">
      {/* Tombol edit & delete skeleton */}
      <div className="absolute top-2 right-2 z-10">
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-md bg-gray-700" />
          <div className="w-8 h-8 rounded-md bg-gray-700" />
        </div>
      </div>

      {/* Gambar ruangan skeleton */}
      <div className="rounded-t-xl overflow-hidden">
        <div className="w-full h-36 bg-gray-700" />
      </div>

      {/* Info ruangan skeleton */}
      <div className="p-4">
        <div className="h-4 w-3/4 bg-gray-700 rounded mb-2" />
      </div>
    </div>
  );
};

export default RuanganCardSkeleton;
