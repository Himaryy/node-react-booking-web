import CardRoom from "~/components/CardRoom";
import { DatePicker } from "~/components/DatePicker";
import { TimePicker } from "~/components/TimePicker";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { cn, formatTanggal, formatWaktu } from "~/lib/utils";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";
import { Separator } from "~/components/ui/separator";
import RoomScheduleBadge from "~/components/RoomSchduleBadge";

interface RoomsProps {
  id: number;
  namaRuangan: string;
}

interface BookingProps {
  id: number;
  // tanggalPeminjaman: Date;
  tanggalPeminjaman: string;
  waktuMulai: string;
  waktuAkhir: string;
}

const HomePage = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [rooms, setRooms] = useState<RoomsProps[]>([]);
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [date, setDate] = useState<Date | undefined>(() => {
    const defaultDate = new Date();
    defaultDate.setHours(0);
    defaultDate.setMinutes(0);
    defaultDate.setSeconds(0);
    return defaultDate;
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/ruangan/ruangan")
      .then((res) => {
        console.log("Ruangan data:", res.data.data);
        setRooms(res.data.data);
      })
      .catch((error) => console.error("Error Fetching Ruangan: ", error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedRoomId !== null) {
      axios
        .get(`http://localhost:8000/ruangan/ruangan/${selectedRoomId}/bookings`)
        .then((res) => {
          console.log("Booking data:", res.data);
          setBookings(res.data.data);
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [selectedRoomId]);

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  return (
    <>
      {/* <pre>{JSON.stringify(rooms, null, 2)}</pre> */}
      <div className="h-full flex gap-4">
        {/* Sebelah kiri */}
        <div className="w-3/4 py-4 px-10">
          <h2 className="text-xl font-bold mb-2">Pilih Ruangan</h2>
          <div className="grid grid-cols-4 gap-6">
            {isLoading ? (
              <OrbitProgress
                color="#32cd32"
                size="medium"
                text=""
                textColor=""
              />
            ) : (
              <>
                {rooms.map((room, index) => (
                  <CardRoom
                    key={room.id}
                    title={room.namaRuangan}
                    imageUrl="https://placehold.co/600x400"
                    onSelected={() => setSelectedRoomId(room.id)}
                    selected={selectedRoomId === room.id}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        {/* Sebelah kanan */}
        <div className="w-1/3 p-4 border-l sticky h-screen top-0">
          <h2 className="text-lg font-semibold text-black mb-2">
            Tentukan Jadwal
          </h2>
          <p className="text-sm text-neutral-600 mb-4">
            Silahkan isi tanggal, jam, dan keperluan peminjaman ruangan.
          </p>

          {/* Nama Ruangan */}
          <div className="mb-4">
            <p className="text-sm text-neutral-700">
              Nama Ruangan:{" "}
              <span className="font-medium text-black">
                {selectedRoom?.namaRuangan}
              </span>
            </p>
          </div>

          {/* Tanggal & Jam */}
          <div className="mb-2">
            <p className="text-sm font-medium text-neutral-800">
              Pilih Tanggal dan Jam
            </p>
          </div>
          <div className="flex gap-3 mb-4">
            <DatePicker />
            <TimePicker date={date} setDate={setDate} />
          </div>

          {/* Durasi */}
          <div className="mb-2 flex gap-2  items-center">
            <p className="text-sm font-medium text-neutral-800">
              Durasi Peminjaman
            </p>
            <TimePicker date={date} setDate={setDate} />
          </div>

          {/* Keperluan */}
          <div className="mb-4">
            <p className="text-sm font-medium text-neutral-800 mb-1">
              Keperluan
            </p>
            <Textarea
              className={cn(
                "w-full border border-neutral-300 bg-white text-black text-sm p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              )}
              placeholder="Contoh: Rapat Proyek A"
            />
          </div>

          {/* Tombol */}
          <div className="mt-auto pt-4">
            <Button className="w-full bg-black text-white hover:bg-neutral-800 transition">
              Booking
            </Button>
          </div>

          <Separator className={cn("bg-gray-300 mt-4")} />

          <div className="overflow-y-auto mt-4 pr-2 flex-grow h-1/3">
            {bookings.map((booking, index) => (
              <RoomScheduleBadge
                key={booking.id}
                tanggal={formatTanggal(booking.tanggalPeminjaman)}
                waktuMulai={formatWaktu(booking.waktuMulai)}
                waktuAkhir={formatWaktu(booking.waktuAkhir)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
