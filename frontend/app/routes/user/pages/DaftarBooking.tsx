import axios from "axios";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import CardRoom from "~/components/CardRoom";
import { DatePicker } from "~/components/DatePicker";
import { DurationInput } from "~/components/DurationInput";
import { TimePicker } from "~/components/TimePicker";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { cn, formatTanggal, formatWaktu } from "~/lib/utils";

// interface RoomsProps {
//   id: number;
// }

interface BookingProps {
  id: number;
  ruangan: {
    namaRuangan: string;
  };
  status: string;
  tanggalPeminjaman: string;
  waktuMulai: string;
  // waktuAkhir: string;
  durasiPeminjaman: number;
  keperluanRuangan: string;
}

const DaftarBooking = () => {
  const [selectedBookingRoomId, setSelectedBookingRoomId] = useState<
    number | null
  >(null);
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [selectedBookingData, setSelectedBookingData] =
    useState<BookingProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [durationTime, setDurationTime] = useState<number | undefined>(
    undefined
  );
  const [keperluan, setKeperluan] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const isDisabled = selectedBookingData?.status !== "Submit";

  // get TOken and fetch data booking by user
  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    // Fetch Data Booking by user
    axios
      .get("http://localhost:8000/user/booking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Booking data:", res.data.data);
        setBookings(res.data.data);
      })
      .catch((error) => console.error("Error Fetching Booking: ", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Fetch data selected booking by user
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    // Fetch slected Booking by user
    if (selectedBookingRoomId !== null) {
      axios
        .get(`http://localhost:8000/user/booking/${selectedBookingRoomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Selected Booking data:", res.data.data);
          const booking = res.data.data;
          setSelectedBookingData(booking);

          setDate(DateTime.fromISO(booking.tanggalPeminjaman).toJSDate());
          setStartTime(DateTime.fromISO(booking.waktuMulai).toJSDate());
          setKeperluan(booking.keperluanRuangan);
          setDurationTime(booking.durasiPeminjaman);
          // console.log(setKeperluan);
        })
        .catch((error) => {
          console.error("Error Fetching Selected Booking: ", error);
        });
    } else {
      setSelectedBookingRoomId(null);
    }
  }, [selectedBookingRoomId]);

  return (
    <div className="h-full flex gap-4">
      {/* Sebelah kiri */}
      <div className="w-3/4 py-4 px-10">
        <h2 className="text-xl font-bold mb-2">Daftar Booking</h2>
        <div className="grid grid-cols-4 gap-6">
          {isLoading ? (
            <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />
          ) : (
            <>
              {bookings.map((booking, index) => (
                <CardRoom
                  key={booking.id}
                  title={booking.ruangan.namaRuangan}
                  status={booking.status}
                  imageUrl="https://placehold.co/600x400"
                  onSelected={() => setSelectedBookingRoomId(booking.id)}
                  selected={selectedBookingRoomId === booking.id}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Sebelah kanan */}
      <div className="w-1/3 p-4 border-l sticky h-screen top-0">
        <h2 className="text-lg font-semibold text-black mb-2">Edit Jadwal</h2>
        <p className="text-sm text-neutral-600 mb-4">
          Silahkan ubah tanggal, jam, dan keperluan peminjaman ruangan.
        </p>

        {/* Nama Ruangan */}
        <div className="mb-4">
          <p className="text-sm text-neutral-700">
            Nama Ruangan:{" "}
            <span className="font-medium text-black">
              {selectedBookingData?.ruangan?.namaRuangan}
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
          <DatePicker value={date} onChange={setDate} disabled={isDisabled} />
          <TimePicker
            date={startTime}
            setDate={setStartTime}
            disabled={isDisabled}
          />
        </div>

        {/* Durasi */}
        <div className="mb-2 flex gap-2  items-center">
          <p className="text-sm font-medium text-neutral-800">
            Durasi Peminjaman
          </p>
          {/* <TimePicker date={durationTime} setDate={setDurationTime} /> */}
          <DurationInput
            value={durationTime}
            onChange={setDurationTime}
            min={0}
            max={12}
            disabled={isDisabled}
          />
          <span>Jam</span>
        </div>

        {/* Keperluan */}
        <div className="mb-4">
          <p className="text-sm font-medium text-neutral-800 mb-1">Keperluan</p>
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

        {/* Tombol */}
        <div className="mt-auto pt-4">
          <Button
            onClick={() => {
              console.log({});
            }}
            disabled={selectedBookingData?.status !== "Submit"}
            className="w-full bg-black text-white hover:bg-neutral-800 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DaftarBooking;
