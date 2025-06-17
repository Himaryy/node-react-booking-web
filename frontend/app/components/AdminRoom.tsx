import DeleteRuanganAdmin from "./DeleteRuanganAdmin";
import EditRuanganModal from "./EditRuanganModal";
import { useState } from "react";

interface RoomProps {
  id: number;
  imageUrl: string;
  namaRuangan: string;
}

interface EditRoomProps {
  ruangan: RoomProps;
  handleUpdate: (data: {
    id: number;
    namaRuangan: string;
    imageFile: File | null;
  }) => Promise<void>;
  handleDelete: (ruangan: RoomProps) => Promise<void>;
}

const AdminRoom = ({ ruangan, handleUpdate, handleDelete }: EditRoomProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  // const [ruangans, setRuangans] = useState<RoomProps[]>([]);

  // useEffect(() => {
  //   // console.log("Render AdminRoom", ruangan);
  //   setIsLoading(false); // reset loading jika ruangan baru datang
  // }, [ruangan]);

  const handleSubmitEdit = async (data: {
    namaRuangan: string;
    imageFile: File | null;
  }) => {
    setIsLoadingUpdate(true);
    await handleUpdate({
      ...data,
      id: ruangan.id,
    });
    setIsLoadingUpdate(false);
    setIsDialogOpen(false);
  };

  const handleSubmitDelete = async (ruangan: RoomProps) => {
    setIsLoadingDelete(true);

    await handleDelete({ ...ruangan, id: ruangan.id });
    setIsLoadingDelete(false);
    setIsDialogOpen(false);
  };

  return (
    <div
      key={ruangan.id}
      className="relative rounded-xl bg-gray-800 border border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-500 group"
    >
      {/* Tombol edit pakai DialogTrigger */}
      <div className="absolute top-2 right-2 z-10">
        <div className="flex gap-2">
          <EditRuanganModal
            ruangan={ruangan}
            onSubmit={handleSubmitEdit}
            isLoading={isLoadingUpdate}
          />

          <DeleteRuanganAdmin
            ruangan={ruangan}
            isLoading={isLoadingDelete}
            onDelete={handleSubmitDelete}
          />
        </div>
      </div>

      {/* Gambar ruangan */}
      <div className="rounded-t-xl overflow-hidden">
        <img
          src={
            ruangan.imageUrl ||
            "https://placehold.co/600x400?text=No Image%0AFound"
          }
          alt={ruangan.namaRuangan}
          className="w-full h-36 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-white text-base font-bold tracking-wide truncate">
          {ruangan.namaRuangan}
        </h3>
      </div>
    </div>
  );
};

export default AdminRoom;
