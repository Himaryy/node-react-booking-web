import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaBuilding,
} from "react-icons/fa";

interface StatItem {
  label: string;
  value: number;
}

interface CardAdminProps {
  stats: StatItem[];
}

const CardAdmin = ({ stats }: CardAdminProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
      {stats.map((stat, idx) => {
        const icon =
          stat.label === "Submit" ? (
            <FaHourglassHalf className="text-yellow-500 w-5 h-5" />
          ) : stat.label === "Approved" ? (
            <FaCheckCircle className="text-green-600 w-5 h-5" />
          ) : stat.label === "Rejected" ? (
            <FaTimesCircle className="text-red-600 w-5 h-5" />
          ) : (
            <FaBuilding className="text-purple-600 w-5 h-5" />
          );

        return (
          <div
            key={idx}
            className={`rounded-xl p-4 flex items-center gap-3 shadow-md bg-gray-800 `}
          >
            <div className="p-2 rounded-full shadow">{icon}</div>
            <div>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-sm font-semibold text-white">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardAdmin;
