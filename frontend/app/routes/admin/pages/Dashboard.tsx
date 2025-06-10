import axios from "axios";
import { useAuth } from "hooks/AuthProvider";
import { FileWarning } from "lucide-react";
import type { ay } from "node_modules/react-router/dist/development/route-data-C6QaL0wu.mjs";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";
import { withMinimumLoading } from "utils/MinimumTime";
import CardAdmin from "~/components/CardAdmin";
import CardAdminSkeleton from "~/components/CardAdminSkeleton";
import DataTableAdmin from "~/components/DataTableAdmin";
import DataTableSkeleton from "~/components/DataTableAdminSkeleton";

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

interface RoomsProps {
  id: number;
  namaRuangan: string;
}

const Dashboard = () => {
  const { admin, isLoadingAdmin } = useAuth();
  const [bookingRooms, setBookingRooms] = useState<BookingProps[]>([]);
  const [ruangans, setRuangans] = useState<RoomsProps[]>([]);
  const [dateInput, setDateInput] = useState<Date | undefined>(undefined);
  const [jumlahSubmit, setJumlahSubmit] = useState(0);
  const [jumlahApproved, setJumlahApproved] = useState(0);
  const [jumlahRejected, setJumlahRejected] = useState(0);
  const [jumlahRuangan, setJumlahRuangan] = useState(0);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Fetch data Booking
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        await withMinimumLoading(
          async () => {
            const token = localStorage.getItem("token");

            if (!token) {
              console.error("Token not found in localStorage");
              return;
            }

            const response = await axios.get(
              "http://localhost:8000/admin/booking-admin",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const bookings = response.data.data;
            const sortedBookings = bookings.sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            setBookingRooms(sortedBookings);
            // console.log(bookings);

            const submitCount = bookings.filter(
              (booking: any) => booking.status === "Submit"
            ).length;

            const ApproveCount = bookings.filter(
              (booking: any) => booking.status === "Approved"
            ).length;

            const RejectedCount = bookings.filter(
              (booking: any) => booking.status === "Rejected"
            ).length;

            setJumlahSubmit(submitCount);
            setJumlahApproved(ApproveCount);
            setJumlahRejected(RejectedCount);
            // console.log("jumlha:", jumlahSubmit);
            // console.log("Booking admin", response.data.data);
          },
          setLoading,
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

    fetchBooking();
  }, []);

  // Fetch data all ruangan for count total ruangan
  useEffect(() => {
    const fetchRuangan = async () => {
      try {
        await withMinimumLoading(
          async () => {
            const token = localStorage.getItem("token");

            if (!token) {
              console.error("Token not found in localStorage");
              return;
            }

            const response = await axios.get(
              "http://localhost:8000/admin/ruangan",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const ruangans = response.data.data;
            setRuangans(ruangans);
            // console.log("ini", ruangans);

            const totalRuangans = ruangans.length;
            // console.log(totalRuangans);
            setJumlahRuangan(totalRuangans);
          },
          setLoading,
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

    fetchRuangan();
  }, []);

  const statCount = [
    { label: "Submit", value: jumlahSubmit },
    { label: "Approved", value: jumlahApproved },
    { label: "Rejected", value: jumlahRejected },
    { label: "Ruangan", value: jumlahRuangan },
  ];

  if (isLoadingAdmin) return null;

  if (!admin) {
    return <Navigate to="/login-admin" state={{ from: location }} replace />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 ">
      {/* Main Content */}

      <div className="w-full p-6 space-y-6">
        <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
        {/* <pre>{JSON.stringify(bookingRooms, null, 2)}</pre> */}
        {loading ? <CardAdminSkeleton /> : <CardAdmin stats={statCount} />}

        <div className="bg-gray-800 p-4 rounded-lg shadow text-white">
          <p>Konten daftar ruangan atau statistik lainnya</p>
        </div>

        {loading ? (
          <DataTableSkeleton />
        ) : (
          <DataTableAdmin bookings={bookingRooms} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
