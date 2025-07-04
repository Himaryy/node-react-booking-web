import axios from "axios";
import { useAuth } from "hooks/AuthProvider";
import { Clock, FileWarning } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";
import { withMinimumLoading } from "utils/MinimumTime";
import CardRoom from "~/components/CardRoom";
import { DatePicker } from "~/components/DatePicker";
import { DurationInput } from "~/components/DurationInput";
import { TimePicker } from "~/components/TimePicker";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";

// interface RoomsProps {
//   id: number;
// }

interface BookingProps {
  id: number;
  ruangan: {
    id: number;
    namaRuangan: string;
    imageUrl: string;
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
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [durationTime, setDurationTime] = useState<number | undefined>(
    undefined
  );
  const [keperluan, setKeperluan] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isLoadingBooking, setIsLoadingBooking] = useState(false);
  const [isLoadingBookingDelete, setIsLoadingBookingDelete] = useState(false);

  const isDisabled = selectedBookingData?.status !== "Submit";

  const { user, isLoading } = useAuth();
  const location = useLocation();

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
        setBookings(res.data.data);
      })
      .catch((error) => console.error("Error Fetching Booking: ", error))
      .finally(() => {
        setLoading(false);
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
          const booking = res.data.data;
          setSelectedBookingData(booking);

          setDate(DateTime.fromISO(booking.tanggalPeminjaman).toJSDate());
          setStartTime(DateTime.fromISO(booking.waktuMulai).toJSDate());
          setKeperluan(booking.keperluanRuangan);
          setDurationTime(booking.durasiPeminjaman);
        })
        .catch((error) => {
          console.error("Error Fetching Selected Booking: ", error);
        });
    }
    // else {
    //   setSelectedBookingRoomId(null);
    // }
  }, [selectedBookingRoomId]);

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // Update by user if status === submit
  const handleUpdateBooking = async () => {
    if (
      !selectedBookingRoomId ||
      !date ||
      !startTime ||
      !durationTime ||
      !keperluan
    ) {
      toast.error("Mohon lengkapi field yang kosong", {
        description: "Pastikan semua field terisi dengan benar.",
        richColors: true,
        style: { backgroundColor: "#facc15", color: "black" }, // bit dark red
      });
      return;
    }

    // Patch data to API
    try {
      await withMinimumLoading(
        async () => {
          const token = localStorage.getItem("token");

          if (!token) {
            console.error("Token not found in storage");
            return;
          }

          if (!selectedBookingRoomId) return;

          await axios.patch(
            `http://localhost:8000/user/booking/${selectedBookingRoomId}`,
            {
              tanggalPeminjaman: date?.toISOString(),
              waktuMulai: startTime?.toISOString(),
              durasiPeminjaman: durationTime,
              keperluanRuangan: keperluan,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        },
        setIsLoadingBooking,
        1000
      );

      toast.success("Update Berhasil", {
        description: "Ruangan berhasil di update.",
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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found ");
        return;
      }

      await withMinimumLoading(
        async () => {
          await axios.delete(
            `http://localhost:8000/user/booking/${selectedBookingRoomId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        },
        setIsLoadingBookingDelete,
        1000
      );
      setBookings((prev) =>
        prev.filter((booking) => booking.id !== selectedBookingRoomId)
      );
      setSelectedBookingRoomId(null);

      toast.success("Cancel Booking", {
        description: "Ruangan berhasil di cancel.",
        richColors: true,
        style: { backgroundColor: "#16a34a", color: "white" }, // bit green
      });
    } catch (error) {
      toast.error("Error Cancel Booking", {
        description: "Terjadi kesalahan saat melakukan cancel booking.",
        richColors: true,
        style: { backgroundColor: "#dc2626", color: "white" }, // bit dark red
        icon: <FileWarning className="text-white" />,
      });
    }
  };

  return (
    <div className="h-full flex gap-4">
      {/* Sebelah kiri */}
      <div className="w-3/4 py-4 px-10">
        <h2 className="text-xl font-bold mb-2">Daftar Booking</h2>
        {/* <pre>{JSON.stringify(bookings, null, 2)}</pre> */}

        <div className="grid grid-cols-4 gap-6">
          {loading ? (
            <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />
          ) : (
            <>
              {bookings.map((booking, index) => {
                return (
                  <CardRoom
                    key={booking?.id}
                    title={booking?.ruangan?.namaRuangan}
                    status={booking?.status}
                    imageUrl={
                      booking.ruangan.imageUrl ||
                      "https://placehold.co/600x400?text=No Image%0AFound"
                    }
                    onSelected={() => setSelectedBookingRoomId(booking?.id)}
                    selected={selectedBookingRoomId === booking?.id}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Sebelah kanan */}
      <div className="w-1/3 p-4 border-l sticky h-screen top-0">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-black mb-2">Edit Jadwal</h2>
          <Button
            variant="ghost"
            size="icon"
            disabled={
              selectedBookingData?.status !== "Submit" || isLoadingBooking
            }
            onClick={handleDelete}
            className="w-20 bg-red-500 text-white hover:bg-red-600 hover:text-white"
          >
            <span>
              {isLoadingBookingDelete ? (
                <OrbitProgress style={{ fontSize: "4px" }} color="white" />
              ) : (
                <div>
                  <p>Cancel</p>
                </div>
              )}
            </span>
          </Button>
        </div>
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
          <div className="flex items-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        {/* Durasi */}
        <div className="mb-2 flex gap-2  items-center">
          <p className="text-sm font-medium text-neutral-800">
            Durasi Peminjaman
          </p>
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
            onClick={handleUpdateBooking}
            disabled={
              selectedBookingData?.status !== "Submit" || isLoadingBooking
            }
            className="w-full bg-black text-white hover:bg-neutral-800 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex items-center gap-2">
              Simpan Perubahan{" "}
              <span>
                {isLoadingBooking && (
                  <OrbitProgress style={{ fontSize: "4px" }} color="white" />
                )}
              </span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DaftarBooking;
