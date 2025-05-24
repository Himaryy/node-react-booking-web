import { LucideCalendarCheck } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface Props {
  // id: number;
  tanggal: string;
  waktuMulai: string;
  waktuAkhir: string;
}

const RoomScheduleBadge = ({ tanggal, waktuMulai, waktuAkhir }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4 ">
      <Card>
        <CardContent>
          <div className="flex justify-center items-center gap-2">
            <div>
              <LucideCalendarCheck />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold">{tanggal}</p>
              <p className="text-xs font-semibold text-gray-500">
                {waktuMulai} - {waktuAkhir}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomScheduleBadge;
