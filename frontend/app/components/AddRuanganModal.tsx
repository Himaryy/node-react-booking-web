import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FaPlus } from "react-icons/fa";
import { Label } from "./ui/label";
import { useRef, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";

interface AddRuanganModalProps {
  onSubmit: (data: {
    namaRuangan: string;
    imageFile: File | null;
  }) => Promise<boolean>;
  isLoading: boolean;
}

const AddRuanganModal = ({
  onSubmit,
  isLoading,
}: Omit<AddRuanganModalProps, "isOpen" | "onOpenChange">) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [roomName, setRoomName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);

      setImageFile(file);
    }
  };

  // Handle save new room
  const handleSubmit = async () => {
    const response = await onSubmit({ namaRuangan: roomName, imageFile });

    if (response) {
      setRoomName("");
      setImageFile(null);
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 rounded-2xl text-white flex gap-2 items-center mt-2">
          <FaPlus /> <span>Ruangan</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 border border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Tambah Ruangan
          </DialogTitle>
        </DialogHeader>

        {/* Layout form dan preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Form Area */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="namaRuangan" className="text-sm">
                Nama Ruangan
              </Label>
              <Input
                // id="namaRuangan"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Contoh: Ruang Meeting 3"
                className="bg-gray-800 border-gray-600 text-white mt-1"
              />
            </div>

            <div>
              <Label className="text-sm">
                Upload Gambar{" "}
                <span className="text-gray-400 text-xs">(opsional)</span>
              </Label>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleImageChange}
                className="bg-gray-800 border-gray-600 text-white mt-1 file:text-muted-foreground file:pr-2"
              />
            </div>
          </div>

          {/* Preview Image */}
          <div className="flex justify-center items-center bg-gray-800 rounded-lg border border-gray-700 overflow-hidden h-40">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
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
            Tambah Ruangan
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

export default AddRuanganModal;
