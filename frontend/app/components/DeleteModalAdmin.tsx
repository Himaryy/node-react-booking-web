import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { OrbitProgress } from "react-loading-indicators";

interface BookingProps {
  id: number;
  ruangan: {
    id: number;
    namaRuangan: string;
  };
  user: {
    name: string;
  };
  keperluanRuangan: string;
  tanggalPeminjaman: string;
  waktuMulai: string;
  status: string;
  waktuAkhir: string;
  durasiPeminjaman: number;
}
interface DeletePropsAdmin {
  booking: BookingProps;
  onDelete: (booking: BookingProps) => void;
  isLoading: boolean;
}

const DeleteModalAdmin = ({
  booking,
  onDelete,
  isLoading,
}: Omit<DeletePropsAdmin, "isOpen" | "onOpenChange">) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <FaTrash />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 text-gray-100 border border-gray-700">
        <DialogHeader>
          <DialogTitle>Delete Booking for "{booking.user?.name}"</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin menghapus data booking ini ?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end">
          <Button
            onClick={() => onDelete(booking)}
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

export default DeleteModalAdmin;
