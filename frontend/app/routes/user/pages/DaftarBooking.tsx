import { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import CardRoom from "~/components/CardRoom";
import { DatePicker } from "~/components/DatePicker";
import { TimePicker } from "~/components/TimePicker";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";

//  const [isLoading, setIsLoading] = useState(true);

const DaftarBooking = () => {
  return (
    // <div>
    //   <CardRoom
    //     title="Cek Ruangan"
    //     status="Submit"
    //     imageUrl="https://placehold.co/600x400"
    //     onSelected={() => console.log("Selected Room")}
    //     selected={false} // Change this to true if you want to show the selected state
    //   />
    // </div>
    <div className="h-full flex gap-4">
      {/* Sebelah kiri */}
      <div className="w-3/4 py-4 px-10">
        <h2 className="text-xl font-bold mb-2">Daftar Booking</h2>
        <div className="grid grid-cols-4 gap-6">
          {/* {isLoading ? (
            <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />
          ) : ( */}
          {/* <> */}
          <CardRoom
            title="Cek Ruangan"
            status="Submit"
            imageUrl="https://placehold.co/600x400"
            onSelected={() => console.log("Selected Room")}
            selected={false}
          />

          <CardRoom
            title="Cek Ruangan"
            status="Approved"
            imageUrl="https://placehold.co/600x400"
            onSelected={() => console.log("Selected Room")}
            selected={false}
          />

          <CardRoom
            title="Cek Ruangan"
            status="Approved"
            imageUrl="https://placehold.co/600x400"
            onSelected={() => console.log("Selected Room")}
            selected={false}
          />

          <CardRoom
            title="Cek Ruangan"
            status="Rejected"
            imageUrl="https://placehold.co/600x400"
            onSelected={() => console.log("Selected Room")}
            selected={false}
          />
          {/* </> */}
          {/* )} */}
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
              {/* {selectedRoom?.namaRuangan} */}
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
          {/* <TimePicker  /> */}
        </div>

        {/* Durasi */}
        <div className="mb-2 flex gap-2  items-center">
          <p className="text-sm font-medium text-neutral-800">
            Durasi Peminjaman
          </p>
          {/* <TimePicker date={hourDuration} setDate={setHourDuration} /> */}
        </div>

        {/* Keperluan */}
        <div className="mb-4">
          <p className="text-sm font-medium text-neutral-800 mb-1">Keperluan</p>
          <Textarea
            className={cn(
              "w-full border border-neutral-300 bg-white text-black text-sm p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            )}
            placeholder="Contoh: Rapat Proyek A"
          />
        </div>

        {/* Tombol */}
        <div className="mt-auto pt-4">
          <Button
            onClick={() => {}}
            className="w-full bg-black text-white hover:bg-neutral-800 transition"
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DaftarBooking;
