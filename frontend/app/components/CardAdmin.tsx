import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaBuilding,
} from "react-icons/fa";

const stats = [
  {
    label: "Submit",
    value: 12,
    icon: <FaCheckCircle className="text-blue-500 w-5 h-5" />,
    bg: "bg-blue-100",
  },
  {
    label: "Approve",
    value: 8,
    icon: <FaHourglassHalf className="text-green-600 w-5 h-5" />,
    bg: "bg-green-100",
  },
  {
    label: "Rejected",
    value: 3,
    icon: <FaTimesCircle className="text-red-600 w-5 h-5" />,
    bg: "bg-red-100",
  },
  {
    label: "Ruangan",
    value: 15,
    icon: <FaBuilding className="text-purple-600 w-5 h-5" />,
    bg: "bg-purple-100",
  },
];

const CardAdmin = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`rounded-xl p-4 flex items-center gap-3 shadow-md ${stat.bg}`}
        >
          <div className="p-2 bg-white rounded-full shadow">{stat.icon}</div>
          <div>
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-sm font-semibold text-gray-700">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardAdmin;
