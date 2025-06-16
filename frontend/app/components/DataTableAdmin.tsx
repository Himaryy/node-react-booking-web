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
import DeleteModalAdmin from "./DeleteModalAdmin";

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

interface DataTableAdminProps {
  bookings: BookingProps[];
  setBookings: React.Dispatch<React.SetStateAction<BookingProps[]>>;
}

const itemsPerPage = 10;

const DataTableAdmin = ({ bookings, setBookings }: DataTableAdminProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  // const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [durationTime, setDurationTime] = useState<number | undefined>(
    undefined
  );
  const [editedBooking, setEditedBooking] = useState<BookingProps | null>(null);
  const [statusBooking, setStatusBooking] = useState<string>("Submit");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDeleted, setIsLoadingDeleted] = useState(false);

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePagination = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getScheduleConflictBooking = (
    newStartTime: Date,
    newEndTime: Date,
    existingBookings: any[],
    currentBookingId: number
  ) => {
    return existingBookings.find((booking) => {
      if (booking.id === currentBookingId) return false;
      if (booking.status !== "Approved") return false;

      const existingStartTime = new Date(booking.waktuMulai);
      const existingEndTime = new Date(booking.waktuAkhir);

      console.log("Bandingkan dengan:", {
        newStartTime,
        newEndTime,
        existingStartTime,
        existingEndTime,
      });
      const isOverlap =
        newStartTime < existingEndTime && newEndTime > existingStartTime;

      return isOverlap;
    });
  };

  const fetchBookingByDateAndRoom = async (
    tanggalPeminjaman: Date,
    ruanganId: number
  ) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in storage");
      return;
    }

    const response = await axios.get(
      `http://localhost:8000/admin/bookings-date-room`,
      {
        params: {
          // tanggalPeminjaman: tanggalPeminjaman.toISOString(),
          tanggalPeminjaman: new Date(
            tanggalPeminjaman.getFullYear(),
            tanggalPeminjaman.getMonth(),
            tanggalPeminjaman.getDate()
          ).toISOString(),
          ruanganId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  };

  const handleEdit = (booking: BookingProps) => {
    // Only get data to display on Dialog
    setEditedBooking(booking);
    setDate(new Date(booking.tanggalPeminjaman));
    setStartTime(new Date(booking.waktuMulai));
    // setEndTime(new Date(booking.waktuAkhir));
    setDurationTime(booking.durasiPeminjaman);
    setStatusBooking(booking.status);
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

    if (!booking.ruangan?.id) {
      toast.error("Ruangan tidak ditemukan", {
        description: "Booking ini tidak memiliki ruangan yang valid.",
        richColors: true,
      });
      return;
    }

    const newStartTime = new Date(startTime);
    const newEndTime = new Date(startTime);
    newEndTime.setHours(newEndTime.getHours() + durationTime);

    try {
      await withMinimumLoading(
        async () => {
          const existingBookings = await fetchBookingByDateAndRoom(
            date,
            booking.ruangan?.id
          );

          const isConflict = getScheduleConflictBooking(
            newStartTime,
            newEndTime,
            existingBookings,
            booking?.id
          );

          if (!existingBookings) {
            toast.error("Gagal cek bentrok", {
              description: "Tidak bisa memeriksa jadwal booking saat ini.",
              richColors: true,
            });
            return;
          }

          if (statusBooking === "Approved" && isConflict) {
            toast.error("Booking Bentrok", {
              description: `Ruangan telah dibooking oleh "${isConflict.user?.name}" dan sudah di Approve`,
              richColors: true,
              style: { backgroundColor: "#dc2626", color: "white" }, // bit dark red
              icon: <FileWarning className="text-white" />,
            });
            return;
          }

          const token = localStorage.getItem("token");

          if (!token) {
            console.error("Token not found in storage");
            return;
          }
          await axios.patch(
            `http://localhost:8000/admin/booking-admin/${booking.id}`,
            {
              id: booking.id,
              ruanganId: booking.ruangan?.id,
              // name: booking.user?.name,
              // namaRuangan: booking.ruangan?.namaRuangan,
              tanggalPeminjaman: date?.toISOString(),
              waktuMulai: startTime?.toISOString(),
              waktuAkhir: newEndTime.toISOString(),
              durasiPeminjaman: durationTime,
              status: statusBooking,
              keperluanRuangan: booking.keperluanRuangan,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setBookings((prev) =>
            prev.map((b) =>
              b.id === booking.id
                ? {
                    ...b,
                    // id: booking.id,
                    // ruanganId: booking.ruangan?.id,
                    status: statusBooking,
                    waktuMulai: startTime?.toISOString(),
                    durasiPeminjaman: durationTime,
                    waktuAkhir: newEndTime.toISOString(),
                    tanggalPeminjaman: date?.toISOString(),
                    keperluanRuangan: booking.keperluanRuangan,
                    ruangan: {
                      ...b.ruangan,
                    },
                    user: { ...b.user },
                  }
                : b
            )
          );
        },
        setIsLoading,
        1000
      );

      toast.success("Update Booking", {
        description: "Ruangan berhasil di update",
        richColors: true,
        style: { backgroundColor: "#16a34a", color: "white" }, // bit green
      });
    } catch (error) {
      toast.error("Update Gagal", {
        description: "Terjadi kesalahan saat melakukan update.",
        richColors: true,
        style: { backgroundColor: "#dc2626", color: "white" }, // bit dark red
        icon: <FileWarning className="text-white" />,
      });
    }
  };

  const handleDelete = async (booking: BookingProps) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      await withMinimumLoading(
        async () => {
          await axios.delete(
            `http://localhost:8000/admin/booking-admin/${booking.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        },
        setIsLoadingDeleted,
        1000
      );

      // Auto delete data without refresh page
      setBookings((prev) => prev.filter((b) => b.id !== booking.id));

      toast.success("Delete Booking", {
        description: `Booking by ${booking.user?.name} berhasil di hapus !`,
        richColors: true,
        style: { backgroundColor: "#16a34a", color: "white" }, // bit green
      });
    } catch (error) {
      console.log(error);
      toast.error("Error Delete Booking", {
        description: "Terjadi kesalahan saat melakukan delete booking.",
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
                <div className="flex gap-2 justify-center items-center">
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
                    status={statusBooking}
                    setStatus={setStatusBooking}
                    isLoading={isLoading}
                    editedBooking={editedBooking}
                    setEditedBooking={setEditedBooking}
                    onSave={handleSave}
                  />
                  <DeleteModalAdmin
                    isLoading={isLoadingDeleted}
                    booking={booking}
                    onDelete={handleDelete}
                  />
                </div>
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
