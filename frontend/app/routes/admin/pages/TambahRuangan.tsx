import axios from "axios";
import { useAuth } from "hooks/AuthProvider";
import { FileWarning } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { withMinimumLoading } from "utils/MinimumTime";
import AdminRoom from "~/components/AdminRoom";
import AddRuanganModal from "~/components/AddRuanganModal";
import RuanganCardSkeleton from "~/components/RuanganSkeleton";

interface RoomsProps {
  id: number;
  namaRuangan: string;
  imageUrl: string;
}

interface AddRoomProps {
  ruangan: RoomsProps;
}

const TambahRuangan = ({ ruangan }: AddRoomProps) => {
  const { admin, isLoadingAdmin } = useAuth();
  const [ruangans, setRuangans] = useState<RoomsProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  // const [roomName, setRoomName] = useState<string>("");
  // const [imageFile, setImageFile] = useState<string | null>("");

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
            const sortedData = response.data.data.sort(
              (a: any, b: any) => a.id - b.id
            );
            setRuangans(sortedData);
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
  const handleTambahRuangan = async ({
    namaRuangan,
    imageFile,
  }: {
    namaRuangan: string;
    imageFile: File | null;
  }) => {
    if (!namaRuangan) {
      toast.error("Field Kosong", {
        description: "Pastikan semua field terisi dengan benar.",
        richColors: true,
        style: { backgroundColor: "#facc15", color: "black" }, // bit dark red
      });
      return false;
    }

    try {
      await withMinimumLoading(
        async () => {
          const token = localStorage.getItem("token");
          const formData = new FormData();

          formData.append("id", namaRuangan);
          formData.append("namaRuangan", namaRuangan);
          if (imageFile) {
            formData.append("imageUrl", imageFile);
          }

          // for (const pair of formData.entries()) {
          //   console.log(pair[0] + ": ", pair[1]);
          // }

          const response = await axios.post(
            "http://localhost:8000/admin/ruangan",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          setRuangans((prev) => [...prev, response.data.data]);
        },
        setIsLoading,
        1000
      );

      toast.success("Berhasil", {
        description: `${namaRuangan} berhasil ditambah`,
        richColors: true,
        style: { backgroundColor: "#16a34a", color: "white" }, // bit green
      });
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Error Add Ruangan", {
        description: "Terjadi kesalahan saat menambah ruangan.",
        richColors: true,
        style: { backgroundColor: "#dc2626", color: "white" }, // bit dark red
        icon: <FileWarning className="text-white" />,
      });

      return false;
    }
  };

  const handleEditRuangan = async ({
    id,
    namaRuangan,
    imageFile,
  }: {
    id: number;
    namaRuangan: string;
    imageFile: File | null;
  }) => {
    if (!namaRuangan) {
      toast.error("Field Kosong", {
        description: "Pastikan semua field terisi dengan benar.",
        richColors: true,
        style: { backgroundColor: "#facc15", color: "black" }, // bit dark red
      });
      return;
    }

    try {
      await withMinimumLoading(
        async () => {
          const token = localStorage.getItem("token");

          const formData = new FormData();

          formData.append("namaRuangan", namaRuangan);
          if (imageFile) {
            formData.append("imageUrl", imageFile);
          }

          const response = await axios.patch(
            `http://localhost:8000/admin/ruangan/${id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          const updateRuangan = response.data.data;

          // update tanpa refresh page
          setRuangans((prev) =>
            prev.map((ruangan) =>
              ruangan.id === updateRuangan.id ? updateRuangan : ruangan
            )
          );
          // console.log("Response data", response.data);
          // console.log("Updated ruangan", updateRuangan);
        },
        setIsLoadingUpdate,
        1000
      );

      toast.success("Update Ruangan", {
        description: `${namaRuangan} berhasil di update`,
        richColors: true,
        style: { backgroundColor: "#16a34a", color: "white" }, // bit green
      });
    } catch (error) {
      console.error(error);
      toast.error("Error Update Ruangan", {
        description: "Terjadi kesalahan saat update data ruangan.",
        richColors: true,
        style: { backgroundColor: "#dc2626", color: "white" }, // bit dark red
        icon: <FileWarning className="text-white" />,
      });
    }
  };

  const handleDeleteRuangan = async (ruangan: RoomsProps) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found ");
        return;
      }

      await withMinimumLoading(
        async () => {
          await axios.delete(
            `http://localhost:8000/admin/ruangan/${ruangan.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        },
        setIsLoadingDelete,
        1000
      );

      setRuangans((prev) => prev.filter((room) => room.id !== ruangan.id));
      toast.success("Delete", {
        description: `${ruangan.namaRuangan} berhasil di hapus !`,
        richColors: true,
        style: { backgroundColor: "#16a34a", color: "white" }, // bit green
      });
    } catch (error) {
      toast.error("Error Delete Ruangan", {
        description: "Terjadi kesalahan saat melakukan delete ruangan.",
        richColors: true,
        style: { backgroundColor: "#dc2626", color: "white" }, // bit dark red
        icon: <FileWarning className="text-white" />,
      });
    }
  };

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
          <AddRuanganModal
            isLoading={isLoading}
            onSubmit={handleTambahRuangan}
          />
        </div>
      </div>

      {/* Daftar Ruangan */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-6 pb-6">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <RuanganCardSkeleton key={i} />
            ))
          : ruangans.map((ruangan) => (
              <AdminRoom
                key={`${ruangan.id}-${ruangan.namaRuangan}`}
                ruangan={ruangan}
                handleUpdate={handleEditRuangan}
                handleDelete={handleDeleteRuangan}
              />
            ))}
      </div>
    </div>
  );
};

export default TambahRuangan;
