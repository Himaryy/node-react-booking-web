import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface RoomProps {
  id: number;
  namaRuangan: string;
  imageUrl: string;
}

interface EditModalProps {
  ruangan: RoomProps;
  onSubmit: (ruangan: RoomProps, imageFile?: File | null) => Promise<void>;
}

const EditRuanganModal = ({
  ruangan,
  onSubmit,
}: Omit<EditModalProps, "isOpen" | "onOpenChange">) => {
  const [roomName, setRoomName] = useState<string>(ruangan.namaRuangan);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setRoomName(ruangan.namaRuangan);
    setImageFile(null); // reset file saat ruangan berubah
  }, [ruangan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ ...ruangan, namaRuangan: roomName }, imageFile);
  };

  return (
    <Dialog>
      <DialogContent className="bg-gray-900 text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle>Edit Ruangan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div>
            <Label htmlFor="nama">Nama Ruangan</Label>
            <Input
              id="nama"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div>
            <Label htmlFor="image">Ganti Gambar (opsional)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <Button type="submit" className="mt-4">
            Simpan Perubahan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRuanganModal;
