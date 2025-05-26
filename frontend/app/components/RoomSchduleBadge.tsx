"use client";
import { LucideCalendarCheck } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { formatTanggal, formatWaktu } from "~/lib/utils";

interface Props {
  // id: number;
  tanggal: string;
  waktuMulai: string;
  waktuAkhir: string;
}

const RoomScheduleBadge = ({ tanggal, waktuMulai, waktuAkhir }: Props) => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-center items-center gap-2">
          <div>
            <LucideCalendarCheck />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">{formatTanggal(tanggal)}</p>
            <p className="text-xs font-semibold text-gray-500">
              {formatWaktu(waktuMulai)} - {formatWaktu(waktuAkhir)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomScheduleBadge;
