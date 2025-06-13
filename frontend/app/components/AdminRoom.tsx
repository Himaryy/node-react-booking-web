import { FaEdit } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface RoomProps {
  id?: number;
  imageUrl?: string;
  title?: string;
}

const AdminRoom = ({ id, title, imageUrl }: RoomProps) => {
  return (
    <Dialog>
      {/* Card Ruangan */}
      <div className="relative rounded-xl bg-gray-800 border border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-500 group">
        {/* Tombol edit pakai DialogTrigger */}
        <div className="absolute top-2 right-2 z-10">
          <DialogTrigger asChild>
            <Button variant="secondary" size="icon">
              <FaEdit className="w-4 h-4" />
            </Button>
          </DialogTrigger>
        </div>

        {/* Gambar ruangan */}
        <div className="rounded-t-xl overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-36 object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="text-white text-base font-bold tracking-wide truncate">
            {title}
          </h3>
        </div>
      </div>

      {/* Dialog Content */}
      <DialogContent className="bg-gray-900 text-gray-100 border border-gray-700">
        <DialogHeader>
          <DialogTitle>Edit Ruangan {title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Edit detail ruangan di bawah ini
          </DialogDescription>
        </DialogHeader>
        {/* Tambahkan form atau input di sini jika diperlukan */}
      </DialogContent>
    </Dialog>
  );
};

export default AdminRoom;
