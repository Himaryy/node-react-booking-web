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
import type { Dispatch, SetStateAction } from "react";

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
  setEditedBooking: Dispatch<SetStateAction<BookingProps | null>>;
  onSave: () => void;
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
  editedBooking,
  setEditedBooking,
  onSave,
}: EditModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => handleEdit(booking)}
          variant="secondary"
          className="text-xs"
        >
          <FaEdit />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900">
        <DialogHeader>
          <DialogTitle>Edit Booking {booking.user.name}</DialogTitle>
          <DialogDescription>Edit detail peminjaman ruangan</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label className="mb-2">Nama Peminjam</Label>
              <Input value={booking?.user?.name ?? ""} readOnly />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2">Nama Ruangan</Label>
              <Input value={booking?.ruangan?.namaRuangan} readOnly />
            </div>
          </div>

          <div className="flex gap-4 ">
            <div className="flex flex-col">
              <Label className="mb-2">Tanggal</Label>
              <DatePicker
                value={date}
                onChange={(newDate: Date) => {
                  setDate(newDate);
                  setEditedBooking((prev: any) =>
                    prev
                      ? {
                          ...prev,
                          tanggalPeminjaman: newDate.toISOString(),
                        }
                      : null
                  );
                }}
              />
            </div>

            <div className="flex flex-col">
              <Label className="mb-2">Jam</Label>
              <div className="flex items-center gap-2">
                <TimePicker
                  className="w-full"
                  date={startTime}
                  setDate={setStartTime}
                />
                {/* <span className="text-gray-700">-</span> */}
                {/* <TimePicker
                  className="w-full"
                  date={endTime}
                  setDate={setEndTime}
                /> */}
              </div>
            </div>

            <div className="flex flex-col">
              <Label className="mb-2">Durasi</Label>
              <div className="flex items-center gap-2">
                <DurationInput
                  value={durationTime}
                  onChange={setDurationTime}
                />
                <span className="text-sm">Jam</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label className="mb-2">Status Peminjaman</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-white border border-gray-300 text-gray-900 w-[180px] rounded-lg">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>

                <SelectContent className="bg-white text-gray-900 border border-gray-300 shadow-md">
                  <SelectGroup>
                    <SelectLabel className="text-sm font-semibold text-gray-700 px-2 py-1">
                      Status Peminjaman
                    </SelectLabel>
                    <SelectItem
                      value="Submit"
                      className="hover:bg-gray-200 cursor-pointer text-sm "
                    >
                      Submit
                    </SelectItem>
                    <SelectItem
                      value="Approved"
                      className="hover:bg-gray-200 cursor-pointer text-sm "
                    >
                      Approved
                    </SelectItem>
                    <SelectItem
                      value="Rejected"
                      className="hover:bg-gray-200 cursor-pointer text-sm"
                    >
                      Rejected
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col">
            <Label className="mb-2">Keperluan Ruangan</Label>
            <Textarea className="shadow-sm" value={booking.keperluanRuangan} />
          </div>
        </div>

        <Button
          onClick={onSave}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50"
        >
          Simpan Perubahan
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditModalAdmin;
