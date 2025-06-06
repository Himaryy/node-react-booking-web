import { formatTanggal, formatWaktu } from "~/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import PaginationAdmin from "./PaginationAdmin";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DatePicker } from "./DatePicker";
import { DurationInput } from "./DurationInput";
import { Textarea } from "./ui/textarea";

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

  const [editedBooking, setEditedBooking] = useState<BookingProps | null>(null);

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePagination = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleEdit = (booking: BookingProps) => {
    setEditedBooking(booking);
  };

  return (
    <div className="rounded-md bg-gray-900 text-white w-full">
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => handleEdit(booking)}
                      variant="secondary"
                      className="text-xs"
                    >
                      <FaEdit />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Edit Booking {booking.user.name}
                      </DialogTitle>
                      <DialogDescription>
                        Edit detail peminjaman ruangan
                      </DialogDescription>
                    </DialogHeader>

                    {/* Form content */}
                    <div className="flex flex-col gap-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <Label>Nama Peminjam</Label>
                          <Input
                            value={editedBooking?.user?.name ?? ""}
                            onChange={(e) =>
                              setEditedBooking((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      user: {
                                        ...prev.user,
                                        name: e.target.value,
                                      },
                                    }
                                  : null
                              )
                            }
                            className="bg-gray-100 text-black"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label>Nama Ruangan</Label>
                          <Input
                            value={booking.ruangan.namaRuangan}
                            className="bg-gray-100 text-black"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <Label>Durasi Peminjaman</Label>
                        <div className="flex items-center gap-2">
                          <DurationInput
                            value={booking.durasiPeminjaman}
                            onChange={() => {}}
                          />
                          <span className="text-sm">Jam</span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <Label>Keperluan Ruangan</Label>
                        <Textarea
                          value={booking.keperluanRuangan}
                          className="bg-gray-100 text-black"
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" className="text-xs ml-2">
                  <MdDelete />
                </Button>
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
