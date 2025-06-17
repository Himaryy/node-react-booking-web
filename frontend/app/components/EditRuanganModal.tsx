import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { OrbitProgress } from "react-loading-indicators";
import { FaEdit } from "react-icons/fa";

interface RoomProps {
  id: number;
  namaRuangan: string;
  imageUrl: string;
}

interface EditModalProps {
  ruangan: RoomProps;
  onSubmit: (data: {
    namaRuangan: string;
    imageFile: File | null;
  }) => Promise<void>;
  isLoading: boolean;
}

const EditRuanganModal = ({
  ruangan,
  onSubmit,
  isLoading,
}: Omit<EditModalProps, "isOpen" | "onOpenChange">) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [roomName, setRoomName] = useState<string>(ruangan.namaRuangan);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setRoomName(ruangan.namaRuangan);
    setImageFile(null); // reset file saat ruangan berubah
    setImagePreview(ruangan.imageUrl);
  }, [ruangan]);

  // Preview Image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);

      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit({
      namaRuangan: roomName,
      imageFile,
    });

    if (success!) {
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <FaEdit />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Edit "{ruangan.namaRuangan}"
          </DialogTitle>
        </DialogHeader>

        {/* Layout Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="namaRuangan" className="text-sm">
                Nama Ruangan
              </Label>
              <Input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Contoh : VIP ROOM"
                className="bg-gray-800 border-gray-600 text-white mt-1"
              />
            </div>

            <div>
              <Label className="text-sm">
                Upload Gambar{" "}
                <span className="text-gray-400 text-xs">(opsional)</span>
              </Label>
              <Input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleImageChange}
                className="bg-gray-800 border-gray-600 text-white mt-1 file:text-muted-foreground file:pr-2"
              />
            </div>
          </div>
          <div className="flex justify-center items-center bg-gray-800 rounded-lg border border-gray-700 overflow-hidden h-40">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview Image"
                className="object-contain w-full h-full"
              />
            ) : (
              <span className="text-gray-500 text-sm">Preview Gambar</span>
            )}
          </div>
        </div>

        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white mt-6"
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

export default EditRuanganModal;
