import CardRoom from "components/CardRoom";
import { DatePicker } from "components/DatePicker";
import { TimePicker } from "components/TimePicker";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";
import { Separator } from "~/components/ui/separator";

interface RoomsProps {
  id: number;
  namaRuangan: string;
}

const HomePage = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [rooms, setRooms] = useState<RoomsProps[]>([]);
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
      .get("http://localhost:8000/ruangan")
      .then((res) => {
        // console.log("Data API:", res.data);
        setRooms(res.data.data);
      })
      .catch((error) => console.error("Error Fetching Ruangan: ", error))
      .finally(() => setIsLoading(false));
  }, []);

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  return (
    <>
      {/* <pre>{JSON.stringify(rooms, null, 2)}</pre> */}
      <div className="h-full flex gap-4">
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

        <div className="w-1/3 p-5 bg-gray-100 sticky top-1 h-screen">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Tentukan Jadwal
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Silahkan isi tanggal, jam, dan keperluan peminjaman ruangan.
          </p>
          <div className="flex gap-4">
            <div className="text-sm mb-3">
              <p className="text-gray-600">ID Ruangan:</p>
              <p className="font-medium text-blue-600">{selectedRoomId}</p>
            </div>

            <div className="text-sm mb-3">
              <p className="text-gray-600">Nama Ruangan:</p>
              <p className="font-semibold text-green-500">
                {selectedRoom?.namaRuangan}
              </p>
            </div>
          </div>

          <div className="mb-4 flex gap-4 items-center">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Pilih Tanggal
              </label>
            </div>
            <div>
              <DatePicker />
            </div>
          </div>

          <div className="mb-4 flex gap-4 items-center">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Durasi Peminjaman
              </label>
            </div>
            <div>
              <TimePicker date={date} setDate={setDate} />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm text-gray-700 mb-1">
              Keperluan
            </label>
            <Textarea
              className={cn("bg-white focus:outline-green-500")}
              placeholder="Contoh: Rapat Proyek A"
            />
          </div>

          {/* Button */}
          <div className="flex justify-end my-4">
            <Button>Booking</Button>
          </div>

          <Separator className={cn("bg-gray-300")} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
