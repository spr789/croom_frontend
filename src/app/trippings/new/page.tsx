"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/services/api";
import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function NewTripping() {
  useAuth();
  const router = useRouter();

  const [dropdownData, setDropdownData] = useState({
    element_types: [],
    substations: [],
    voltage_levels: [],
  });

  const [formData, setFormData] = useState({
    element_type: "",
    from_ss: "",
    to_ss: "",
    voltage_level: "",
    number: "",
    tripping_datetime: "",
    remarks: "",
  });

  const [error, setError] = useState("");

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const res = await axios.get("trippings/dropdown-options/");
        setDropdownData(res.data);
      } catch (err) {
        console.error("Failed to fetch dropdown values", err);
      }
    };
    fetchDropdownData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("trippings/trippings/", formData);
      router.push("/trippings");
    } catch (err) {
      console.error(err);
      setError("Failed to submit tripping entry.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">New Tripping Entry</h1>

      <div className="space-y-4">
        {/* Element Type */}
        <select
          name="element_type"
          value={formData.element_type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Element Type</option>
          {dropdownData.element_types.map((el: any) => (
            <option key={el.id} value={el.id}>
              {el.element_type}
            </option>
          ))}
        </select>

        {/* From Substation */}
        <select
          name="from_ss"
          value={formData.from_ss}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select From Substation</option>
          {dropdownData.substations.map((ss: any) => (
            <option key={ss.id} value={ss.id}>
              {ss.name}
            </option>
          ))}
        </select>

        {/* To Substation */}
        <select
          name="to_ss"
          value={formData.to_ss}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select To Substation</option>
          {dropdownData.substations.map((ss: any) => (
            <option key={ss.id} value={ss.id}>
              {ss.name}
            </option>
          ))}
        </select>

        {/* Voltage Level */}
        <select
          name="voltage_level"
          value={formData.voltage_level}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Voltage Level</option>
          {dropdownData.voltage_levels.map((vl: any) => (
            <option key={vl.id} value={vl.id}>
              {vl.voltage_level}
            </option>
          ))}
        </select>

        {/* Number */}
        <input
          type="number"
          name="number"
          placeholder="Element Number (1-8)"
          value={formData.number}
          onChange={handleChange}
          min="1"
          max="8"
          className="w-full p-2 border rounded"
        />

        {/* Tripping Datetime */}
        <input
          type="datetime-local"
          name="tripping_datetime"
          value={formData.tripping_datetime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Remarks */}
        <textarea
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Tripping
        </button>
      </div>
    </div>
  );
}
