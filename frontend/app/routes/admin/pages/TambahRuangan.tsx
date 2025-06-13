import axios from "axios";
import { useAuth } from "hooks/AuthProvider";
import { FileWarning } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { withMinimumLoading } from "utils/MinimumTime";
import AdminRoom from "~/components/AdminRoom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import AddRuanganModal from "~/components/AddRuanganModal";

interface RoomsProps {
  id: number;
  namaRuangan: string;
  imageUrl?: string;
}

const TambahRuangan = () => {
  const { admin, isLoadingAdmin } = useAuth();
  const [ruangans, setRuangans] = useState<RoomsProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [namaBaru, setNamaBaru] = useState("");

  // Fetch All Ruangan
  useEffect(() => {
    const fetchRuangans = async () => {
      try {
        await withMinimumLoading(
          async () => {
            const token = localStorage.getItem("token");
            if (!token) {
              console.error("token not found");
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
            setRuangans(response.data.data);
          },
          setIsLoading,
          1000
        );
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Gagal memuat data ruangan", {
          description: "Terjadi kesalahan saat mengambil data ruangan.",
          richColors: true,
          style: { backgroundColor: "#dc2626", color: "white" },
          icon: <FileWarning className="text-white" />,
        });
      }
    };
    fetchRuangans();
  }, []);

  // Handle submit ruangan baru
  // const handleTambahRuangan = async () => {
  //   if (!namaBaru) return;

  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.post(
  //       "http://localhost:8000/admin/ruangan",
  //       { namaRuangan: namaBaru },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     toast.success("Ruangan berhasil ditambahkan!");
  //     setNamaBaru("");
  //     // refresh list
  //     const refreshed = await axios.get("http://localhost:8000/admin/ruangan", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setRuangans(refreshed.data.data);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Gagal menambahkan ruangan.");
  //   }
  // };

  return (
    <div className="w-full min-h-screen">
      {/* Header dengan tombol tambah */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Tambah Ruangan Baru
            </h1>
            <p className="font-semibold text-muted-foreground text-sm">
              Silakan lengkapi formulir berikut untuk menambahkan data ruangan
              ke sistem.
            </p>
          </div>

          {/* Dialog Tambah */}
          <AddRuanganModal />
        </div>
      </div>

      {/* Daftar Ruangan */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-6 pb-6">
        {ruangans.map((ruangan) => (
          <AdminRoom
            key={ruangan.id}
            id={ruangan.id}
            title={ruangan.namaRuangan}
            imageUrl={ruangan.imageUrl || "test.jpg"}
          />
        ))}
      </div>
    </div>
  );
};

export default TambahRuangan;
