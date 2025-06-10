import { formatTanggal, formatWaktu } from "~/lib/utils";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import PaginationAdmin from "./PaginationAdmin";
import { toast } from "sonner";
import EditModalAdmin from "./EditModalAdmin";
import { FileWarning } from "lucide-react";
import { withMinimumLoading } from "utils/MinimumTime";
import axios from "axios";

interface BookingProps {
  id: number;
  ruangan: {
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

interface DataTableAdminProps {
  bookings: BookingProps[];
}

const itemsPerPage = 10;

const DataTableAdmin = ({ bookings }: DataTableAdminProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  // const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [durationTime, setDurationTime] = useState<number | undefined>(
    undefined
  );
  const [editedBooking, setEditedBooking] = useState<BookingProps | null>(null);
  const [status, setStatus] = useState<string>("Submit");
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePagination = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleEdit = (booking: BookingProps) => {
    // Only get data to display on Dialog
    setEditedBooking(booking);
    setDate(new Date(booking.tanggalPeminjaman));
    setStartTime(new Date(booking.waktuMulai));
    // setEndTime(new Date(booking.waktuAkhir));
    setDurationTime(booking.durasiPeminjaman);
    setStatus(booking.status);
  };

  const handleSave = async (booking: BookingProps) => {
    if (!date || !startTime || !durationTime) {
      toast.error("Mohon lengkapi field yang kosong", {
        description: "Pastikan semua field terisi dengan benar.",
        richColors: true,
        style: { backgroundColor: "#facc15", color: "black" }, // bit dark red
      });
      return;
    }

    try {
      await withMinimumLoading(
        async () => {
          console.log(booking.status);
          // const token = localStorage.getItem("token");

          // if (!token) {
          //   console.error("Token not found in storage");
          //   return;
          // }

          // await axios.patch(
          //   `http://localhost:8000/admin/booking-admin/${booking.id}`,
          //   {
          //     tanggalPeminjaman: date?.toISOString(),
          //     waktuMulai: startTime?.toISOString(),
          //     durasiPeminjaman: durationTime,
          //   },
          //   {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   }
          // );
        },
        setIsLoading,
        1000
      );
    } catch (error) {
      toast.error("Update Gagal", {
        description: "Terjadi kesalahan saat melakukan update.",
        richColors: true,
        style: { backgroundColor: "#dc2626", color: "white" }, // bit dark red
        icon: <FileWarning className="text-white" />,
      });
    }
  };

  return (
    <div className="rounded-md text-white w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">No</TableHead>
            <TableHead className="text-white">Nama</TableHead>
            <TableHead className="text-white">Ruangan</TableHead>
            <TableHead className="text-white">Keperluan</TableHead>
            <TableHead className="text-white">Tanggal</TableHead>
            <TableHead className="text-white">Waktu</TableHead>
            <TableHead className="text-white">Durasi</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedBookings.map((booking, index) => (
            <TableRow className="text-center" key={booking.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="max-w-[150px] truncate whitespace-nowrap overflow-hidden">
                {booking.user.name}
              </TableCell>
              <TableCell>{booking.ruangan.namaRuangan}</TableCell>
              <TableCell className="max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                {booking.keperluanRuangan}
              </TableCell>

              <TableCell>{formatTanggal(booking.tanggalPeminjaman)}</TableCell>
              <TableCell>
                {formatWaktu(booking.waktuMulai)} -{" "}
                {formatWaktu(booking.waktuAkhir)}
              </TableCell>
              <TableCell>{booking.durasiPeminjaman} jam</TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.status === "Submit"
                      ? "submit"
                      : booking.status === "Approved"
                      ? "approved"
                      : booking.status === "Rejected"
                      ? "destructive"
                      : "default"
                  }
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <EditModalAdmin
                  booking={booking}
                  handleEdit={handleEdit}
                  date={date}
                  setDate={setDate}
                  startTime={startTime}
                  setStartTime={setStartTime}
                  // endTime={endTime}
                  // setEndTime={setEndTime}
                  durationTime={durationTime}
                  setDurationTime={setDurationTime}
                  status={status}
                  setStatus={setStatus}
                  editedBooking={editedBooking}
                  setEditedBooking={setEditedBooking}
                  onSave={() => handleSave(booking)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* pagination */}
      <PaginationAdmin
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePagination}
      />
    </div>
  );
};

export default DataTableAdmin;
