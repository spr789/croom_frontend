"use client";

import React from "react";

interface TrippingCardProps {
  id: number;
  element_name: string;
  substation: string;
  voltage_level: string;
  tripping_time: string;
  remarks: string;
}

export default function TrippingCard({
  id,
  element_name,
  substation,
  voltage_level,
  tripping_time,
  remarks,
}: TrippingCardProps) {
  return (
    <tr className="border-b text-sm">
      <td className="p-3 border">{id}</td>
      <td className="p-3 border">{element_name}</td>
      <td className="p-3 border">{substation}</td>
      <td className="p-3 border">{voltage_level}</td>
      <td className="p-3 border">{new Date(tripping_time).toLocaleString()}</td>
      <td className="p-3 border">{remarks}</td>
    </tr>
  );
}
