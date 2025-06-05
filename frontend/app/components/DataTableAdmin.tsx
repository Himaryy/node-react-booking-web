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

// Data dummy
const bookings = [
  {
    id: 1,
    user: { name: "Mochamad Hafied" },
    ruangan: { nama: "Ruang Rapat 1" },
    keperluanRuangan: "Rapat Divisi",
    tanggalPeminjaman: new Date(),
    waktuMulai: new Date("2025-06-06T09:00:00"),
    waktuAkhir: new Date("2025-06-06T11:00:00"),
    durasiPeminjaman: 2,
    status: "Submit",
  },
  {
    id: 2,
    user: { name: "Sarah Lestari" },
    ruangan: { nama: "Aula Utama" },
    keperluanRuangan: "Presentasi Proyek",
    tanggalPeminjaman: new Date(),
    waktuMulai: new Date("2025-06-07T13:00:00"),
    waktuAkhir: new Date("2025-06-07T15:00:00"),
    durasiPeminjaman: 2,
    status: "Approved",
  },
  {
    id: 3,
    user: { name: "Ahmad Zaki" },
    ruangan: { nama: "Ruang Diskusi" },
    keperluanRuangan: "Diskusi Internal asdasdasdasdasdasdsad",
    tanggalPeminjaman: new Date(),
    waktuMulai: new Date("2025-06-08T10:00:00"),
    waktuAkhir: new Date("2025-06-08T12:00:00"),
    durasiPeminjaman: 2,
    status: "Rejected",
  },
];

const DataTableAdmin = () => {
  return (
    <div className="rounded-md border bg-gray-900 text-white w-full">
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
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell className="max-w-[150px] truncate whitespace-nowrap overflow-hidden">
                {booking.user.name}
              </TableCell>
              <TableCell>{booking.ruangan.nama}</TableCell>
              <TableCell className="max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                {booking.keperluanRuangan}
              </TableCell>

              <TableCell>
                {new Date(booking.tanggalPeminjaman).toLocaleDateString(
                  "id-ID"
                )}
              </TableCell>
              <TableCell>
                {formatTime(booking.waktuMulai)} -{" "}
                {formatTime(booking.waktuAkhir)}
              </TableCell>
              <TableCell>{booking.durasiPeminjaman} jam</TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.status === "Submit"
                      ? "default"
                      : booking.status === "Approved"
                      ? "outline"
                      : booking.status === "Rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" className="text-xs">
                  Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const formatTime = (time: Date) => {
  return time.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default DataTableAdmin;
