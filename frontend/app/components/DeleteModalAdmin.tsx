import React from "react";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface DeletePropsAdmin {
  onDelete?: () => void;
}

const DeleteModalAdmin = ({ onDelete }: DeletePropsAdmin) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => {}} variant="destructive" size="icon">
          <FaTrash />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 text-gray-100 border border-gray-700">
        <DialogHeader>
          <DialogTitle>Delete Booking By</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin menghapus data ini ?
          </DialogDescription>
        </DialogHeader>

        <Button onClick={() => {}} variant="destructive">
          {/* {isLoading ? (
            <OrbitProgress style={{ fontSize: "4px" }} color="white" />
          ) : (
            "Ya !"
          )} */}
          Ya!
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModalAdmin;
