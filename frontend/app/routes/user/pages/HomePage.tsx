import CardRoom from "~/components/CardRoom";
import { DatePicker } from "~/components/DatePicker";
import { TimePicker } from "~/components/TimePicker";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";
import { Separator } from "~/components/ui/separator";
import RoomScheduleBadge from "~/components/RoomSchduleBadge";
import { useAuth } from "hooks/AuthProvider";
import { DurationInput } from "~/components/DurationInput";

import { toast } from "sonner";
import { DateTime } from "luxon";
import { createBookingSchema } from "lib/validations";
import { FileWarning } from "lucide-react";
import { withMinimumLoading } from "utils/MinimumTime";

interface RoomsProps {
  id: number;
  namaRuangan: string;
}

interface BookingProps {
  id: number;
  tanggalPeminjaman: string;
  waktuMulai: string;
  waktuAkhir: string;
}

interface createBookingProps {
  ruanganId: number;
  tanggalPeminjaman: string;
  waktuMulai: string;
  // waktuAkhir: string;
  durasiPeminjaman: number;
  keperluanRuangan: string;
}

const HomePage = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [rooms, setRooms] = useState<RoomsProps[]>([]);
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [keperluan, setKeperluan] = useState<string | undefined>(undefined);
  const [dateInput, setDateInput] = useState<Date | undefined>(undefined);
  const [startTimeInput, setStartTimeInput] = useState<Date | undefined>(
    undefined
  );
  const [durationTimeInput, setDurationTimeInput] = useState<
    number | undefined
  >(undefined);

  const [isLoadingRoom, setIsLoadingRoom] = useState(true);
  const [isLoadingBooking, setIsLoadingBooking] = useState(false);
  const { user } = useAuth();
  const isDisabled = !user || selectedRoomId === null;

  // Fetch Data All Ruangan
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        await withMinimumLoading(
          async () => {
            const response = await axios.get(
              "http://localhost:8000/ruangan/ruangan"
            );
            setRooms(response.data.data);
          },
          setIsLoadingRoom,
          1000
        );
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Gagal memuat data ruangan", {
          description: "Terjadi kesalahan saat mengambil data ruangan.",
          richColors: true,
          style: { backgroundColor: "#dc2626", color: "white" }, // bit dark red
          icon: <FileWarning className="text-white" />,
        });
      }
    };

    fetchRooms();
  }, []);

  // Fetch Data selected Room
  useEffect(() => {
    if (selectedRoomId !== null) {
      axios
        .get(`http://localhost:8000/ruangan/ruangan/${selectedRoomId}/bookings`)
        .then((res) => {
          // Filter data booking
          // Only show from today
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const upcomingBookings = res.data.data.filter((booking: any) => {
            const bookingDate = new Date(booking.tanggalPeminjaman);
            bookingDate.setHours(0, 0, 0, 0);

            return bookingDate >= today;
          });

          setBookings(upcomingBookings);
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [selectedRoomId]);

  // Handle Booking Room
  const handleBooking = async () => {
    console.log("cek button");
    if (
      !selectedRoom ||
      !dateInput ||
      !startTimeInput ||
      !durationTimeInput ||
      !keperluan
    ) {
      toast.error("Mohon lengkapi field yang kosong", {
        description: "Pastikan semua field terisi dengan benar.",
        richColors: true,
        style: { backgroundColor: "#facc15", color: "black" }, // bit dark red
      });
      return;
    }
    console.log("Data yang akan dikirim:", {
      selectedRoom,
      dateInput,
      startTimeInput,
      durationTimeInput,
      keperluan,
    });

    const bookingData: createBookingProps = {
      ruanganId: selectedRoom.id,
      tanggalPeminjaman: DateTime.fromJSDate(dateInput).toISODate()!,
      waktuMulai: DateTime.fromJSDate(startTimeInput).toISO()!,
      durasiPeminjaman: durationTimeInput,
      keperluanRuangan: keperluan,
    };
    console.log(bookingData);

    const parsedBookingData = createBookingSchema.safeParse(bookingData);

    if (!parsedBookingData.success) {
      toast.error("Validasi Gagal", {
        description: parsedBookingData.error.errors.map((err) => err.message),
        richColors: true,
        style: { backgroundColor: "#dc2626", color: "white" }, // bit dark red
      });
      return;
    }

    console.log("Data valid, siap dikirim:", parsedBookingData.data);

    // send booking request to backend
    try {
      // Token Authorization
      await withMinimumLoading(
        async () => {
          const token = localStorage.getItem("token");

          if (!token) {
            console.error("Token not found in localStorage");
            return;
          }
          console.log(parsedBookingData);

          await axios.post("http://localhost:8000/user/booking", bookingData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        },
        setIsLoadingBooking,
        1000
      );

      toast.success("Booking Berhasil", {
        description: "Ruangan berhasil dibooking.",
        richColors: true,
        style: { backgroundColor: "#16a34a", color: "white" }, // bit green
      });

      // Clear form field after successful booking
      setDateInput(undefined);
      setStartTimeInput(undefined);
      setDurationTimeInput(undefined);
      setKeperluan("");
    } catch (error) {
      // console.error("Error creating booking:", error);
      toast.error("Booking Gagal", {
        description: "Terjadi kesalahan saat melakukan booking.",
        richColors: true,
        style: { backgroundColor: "#dc2626", color: "white" }, // bit dark red
        icon: <FileWarning className="text-white" />,
      });
    }
    // finally {
    //   setIsLoadingBooking(false);
    // }
  };

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  return (
    <>
      {/* <pre>{JSON.stringify(rooms, null, 2)}</pre> */}
      <div className="h-full flex gap-4">
        {/* Sebelah kiri */}
        <div className="w-3/4 py-4 px-10">
          <h2 className="text-xl font-bold mb-2">Pilih Ruangan</h2>
          <div className="grid grid-cols-4 gap-6">
            {isLoadingRoom ? (
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
            <p className="text-sm font-medium text-neutral-800">
              Nama Ruangan:{" "}
              <span className="font-semibold">{selectedRoom?.namaRuangan}</span>
            </p>
          </div>

          {/* Tanggal & Jam */}
          <div className="mb-2">
            <p className="text-sm font-medium text-neutral-800">
              Pilih Tanggal dan Jam (Format 24 Jam)
            </p>
          </div>
          <div className="flex gap-3 mb-4">
            <DatePicker
              value={dateInput}
              onChange={setDateInput}
              disabled={isDisabled}
            />
            <TimePicker
              date={startTimeInput}
              setDate={setStartTimeInput}
              disabled={isDisabled}
            />
          </div>

          {/* Durasi */}
          <div className="mb-2 flex gap-2  items-center">
            <p className="text-sm font-medium text-neutral-800">
              Durasi Peminjaman
            </p>
            <DurationInput
              value={durationTimeInput}
              onChange={setDurationTimeInput}
              min={0}
              max={12}
              disabled={isDisabled}
            />
            <span className="text-sm font-medium text-neutral-800">Jam</span>
          </div>

          {/* Keperluan */}
          <div className="mb-4">
            <p className="text-sm font-medium text-neutral-800 mb-1">
              Keperluan
            </p>
            <Textarea
              value={keperluan}
              disabled={isDisabled}
              onChange={(e) => setKeperluan(e.target.value)}
              className={cn(
                "w-full border border-neutral-300 bg-white text-black text-sm p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              )}
              placeholder="Contoh: Rapat Proyek A"
            />
          </div>

          {/* BUtton Booking */}
          <div className="mt-auto pt-4">
            <Button
              onClick={handleBooking}
              disabled={isDisabled || isLoadingBooking}
              className={`w-full bg-black text-white hover:bg-neutral-800 transition ${
                user
                  ? "opacity-100 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="flex items-center gap-2">
                Booking{" "}
                <span>
                  {isLoadingBooking && (
                    <OrbitProgress style={{ fontSize: "4px" }} color="white" />
                  )}
                </span>
              </span>
            </Button>
          </div>

          <Separator className={cn("bg-gray-300 mt-4")} />

          <h2 className="text-lg font-semibold text-black mt-4 mb-2">
            Jadwal Ruangan
          </h2>
          <div className="flex gap-3 overflow-x-auto py-2">
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <RoomScheduleBadge
                  key={booking.id}
                  tanggal={booking.tanggalPeminjaman}
                  waktuMulai={booking.waktuMulai}
                  waktuAkhir={booking.waktuAkhir}
                />
              ))
            ) : (
              <p className="text-muted-foreground italic">
                Tidak ada jadwal ruangan mendatang.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
