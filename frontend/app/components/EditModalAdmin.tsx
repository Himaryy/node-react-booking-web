import { FaEdit } from "react-icons/fa";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";
import { DurationInput } from "./DurationInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useState, type Dispatch, type SetStateAction } from "react";
import { OrbitProgress } from "react-loading-indicators";

interface BookingProps {
  id: number;
  ruangan: {
    id: number;
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

interface EditModalProps {
  booking: BookingProps;
  handleEdit: (booking: BookingProps) => void;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  startTime: Date | undefined;
  setStartTime: Dispatch<SetStateAction<Date | undefined>>;
  durationTime: number | undefined;
  setDurationTime: Dispatch<SetStateAction<number | undefined>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  editedBooking: BookingProps | null;
  isLoading: boolean;
  setEditedBooking: Dispatch<SetStateAction<BookingProps | null>>;
  onSave: (booking: BookingProps) => Promise<void>;
}

const EditModalAdmin = ({
  booking,
  handleEdit,
  date,
  setDate,
  startTime,
  setStartTime,
  durationTime,
  setDurationTime,
  status,
  setStatus,
  isLoading,
  setEditedBooking,
  onSave,
}: Omit<EditModalProps, "isOpen" | "onOpenChange">) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            handleEdit(booking);
            setIsOpen(true);
          }}
          variant="secondary"
          className="text-xs"
        >
          <FaEdit />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 text-gray-100 border border-gray-700">
        <DialogHeader>
          <DialogTitle>Edit Booking for "{booking.user.name}"</DialogTitle>
          <DialogDescription className="text-gray-400">
            Edit detail peminjaman ruangan
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label className="mb-2 text-gray-300">Nama Peminjam</Label>
              <Input
                className="bg-gray-800 border-gray-600 text-gray-100"
                value={booking?.user?.name ?? ""}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2 text-gray-300">Nama Ruangan</Label>
              <Input
                className="bg-gray-800 border-gray-600 text-gray-100"
                value={booking?.ruangan?.namaRuangan}
                readOnly
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col">
              <Label className="mb-2 text-gray-300">Tanggal</Label>
              <DatePicker
                className="bg-gray-800 border-gray-600 text-gray-100 hover:bg-gray-800 hover:text-gray-100"
                value={date}
                onChange={(newDate: Date) => {
                  setDate(newDate);
                  setEditedBooking((prev: any) =>
                    prev
                      ? { ...prev, tanggalPeminjaman: newDate?.toISOString() }
                      : null
                  );
                }}
              />
            </div>

            <div className="flex flex-col">
              <Label className="mb-2 text-gray-300">Jam</Label>
              <div className="flex items-center gap-2">
                <TimePicker
                  inputClassName="bg-gray-800 border-gray-600 caret-gray-100"
                  date={startTime}
                  setDate={(newStartTime) => {
                    setStartTime(newStartTime);

                    setEditedBooking((prev: any) =>
                      prev
                        ? { ...prev, waktuMulai: newStartTime?.toISOString() }
                        : null
                    );
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <Label className="mb-2 text-gray-300">Durasi</Label>
              <div className="flex items-center gap-2">
                <DurationInput
                  className="bg-gray-800 border-gray-600"
                  value={durationTime}
                  onChange={(newDuration: number | undefined) => {
                    setDurationTime(newDuration);

                    setEditedBooking((prev: any) =>
                      prev
                        ? {
                            ...prev,
                            durasiPeminjaman: newDuration,
                          }
                        : null
                    );
                  }}
                />
                <span className="text-sm text-gray-300">Jam</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label className="mb-2 text-gray-300">Status Peminjaman</Label>
              <Select
                value={status}
                onValueChange={(newStatus) => {
                  setStatus(newStatus);

                  setEditedBooking((prev: any) =>
                    prev ? { ...prev, status: newStatus } : null
                  );
                }}
              >
                <SelectTrigger className="bg-gray-800 border border-gray-600 text-gray-100 w-[180px] rounded-lg">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>

                <SelectContent className="bg-gray-800 text-gray-100 border border-gray-600 shadow-md">
                  <SelectGroup>
                    <SelectLabel className="text-sm font-semibold text-gray-300 px-2 py-1">
                      Status Peminjaman
                    </SelectLabel>
                    <SelectItem
                      value="Submit"
                      className="hover:bg-gray-700 cursor-pointer text-sm"
                    >
                      Submit
                    </SelectItem>
                    <SelectItem
                      value="Approved"
                      className="hover:bg-gray-700 cursor-pointer text-sm"
                    >
                      Approved
                    </SelectItem>
                    <SelectItem
                      value="Rejected"
                      className="hover:bg-gray-700 cursor-pointer text-sm"
                    >
                      Rejected
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col">
            <Label className="mb-2 text-gray-300">Keperluan Ruangan</Label>
            <Textarea
              className="bg-gray-800 border-gray-600 text-gray-100 shadow-sm"
              value={booking.keperluanRuangan}
              readOnly
            />
          </div>
        </div>

        <Button
          onClick={async () => {
            await onSave(booking); // tunggu proses simpan selesai
            setIsOpen(false); // tutup modal
          }}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 mt-4"
        >
          <span className="flex items-center gap-2">
            Simpan Perubahan
            <span>
              {isLoading && (
                <OrbitProgress style={{ fontSize: "4px" }} color="white" />
              )}
            </span>
          </span>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditModalAdmin;
