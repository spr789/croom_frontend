"use client";

type TrippingCardProps = {
  station: string;
  reason: string;
  time: string;
};

export default function TrippingCard({ station, reason, time }: TrippingCardProps) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{station}</h3>
      <p className="text-gray-600">Reason: {reason}</p>
      <p className="text-gray-500 text-sm">Time: {time}</p>
    </div>
  );
}
