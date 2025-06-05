import { useAuth } from "hooks/AuthProvider";
import { Navigate, useLocation } from "react-router";
import CardAdmin from "~/components/CardAdmin";
import DataTableAdmin from "~/components/DataTableAdmin";

const Dashboard = () => {
  const { admin, isLoadingAdmin } = useAuth();
  const location = useLocation();

  if (isLoadingAdmin) return null;

  if (!admin) {
    return <Navigate to="/login-admin" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-900 ">
      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>

        <CardAdmin />

        <div className="bg-gray-800 p-4 rounded-lg shadow text-white">
          <p>Konten daftar ruangan atau statistik lainnya</p>
        </div>

        <DataTableAdmin />
      </div>

      {/* Sidebar kanan */}
      {/* <aside className="w-64 bg-gray-800 h-screen p-6 border-l border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Tambah Ruangan</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Nama Ruangan
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Kapasitas
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          >
            Simpan
          </button>
        </form>
      </aside> */}
    </div>
  );
};

export default Dashboard;
