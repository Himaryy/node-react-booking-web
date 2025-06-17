import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";
import { OrbitProgress } from "react-loading-indicators";

interface RoomProps {
  id: number;
  namaRuangan: string;
  imageUrl: string;
}

interface DeleteRoomProps {
  ruangan: RoomProps;
  onDelete: (ruangan: RoomProps) => void;
  isLoading: boolean;
}

const DeleteRuanganAdmin = ({
  ruangan,
  onDelete,
  isLoading,
}: Omit<DeleteRoomProps, "isOpen" | "onOpenChange">) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <FaTrash />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 text-gray-100 border border-gray-700">
        <DialogHeader>
          <DialogTitle>Delete "{ruangan.namaRuangan}"</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin menghapus ruangan ini dari server ?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end">
          <Button
            disabled={isLoading}
            onClick={() => onDelete(ruangan)}
            variant="destructive"
            className="w-15"
          >
            {isLoading ? (
              <OrbitProgress style={{ fontSize: "4px" }} color="white" />
            ) : (
              "Ya !"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRuanganAdmin;
