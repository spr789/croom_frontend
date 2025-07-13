"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/services/api";
import { useRouter } from "next/navigation";

interface DropdownData {
  id: number;
  name?: string;
  element_type?: string;
  voltage_level?: string;
}

export default function TrippingForm() {
  const router = useRouter();

  const [dropdownData, setDropdownData] = useState({
    element_types: [] as DropdownData[],
    substations: [] as DropdownData[],
    voltage_levels: [] as DropdownData[],
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
  const [submitting, setSubmitting] = useState(false);

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

  const isFeederSelected = () => {
    const selected = dropdownData.element_types.find(
      (el) => el.id.toString() === formData.element_type
    );
    return selected?.element_type?.toLowerCase() === "feeder";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "element_type") {
      const selected = dropdownData.element_types.find(
        (el) => el.id.toString() === value
      );
      // If not Feeder, reset to_ss
      if (selected?.element_type?.toLowerCase() !== "feeder") {
        setFormData({ ...formData, element_type: value, to_ss: "" });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError("");

      await axios.post("trippings/trippings/", formData);

      router.push("/trippings");
    } catch (err) {
      console.error(err);
      setError("Failed to submit tripping entry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Element Type */}
      <select
        name="element_type"
        value={formData.element_type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Element Type</option>
        {dropdownData.element_types.map((el) => (
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
        {dropdownData.substations.map((ss) => (
          <option key={ss.id} value={ss.id}>
            {ss.name}
          </option>
        ))}
      </select>

      {/* To Substation (only if Feeder selected) */}
      {isFeederSelected() && (
        <select
          name="to_ss"
          value={formData.to_ss}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select To Substation</option>
          {dropdownData.substations.map((ss) => (
            <option key={ss.id} value={ss.id}>
              {ss.name}
            </option>
          ))}
        </select>
      )}

      {/* Voltage Level */}
      <select
        name="voltage_level"
        value={formData.voltage_level}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Voltage Level</option>
        {dropdownData.voltage_levels.map((vl) => (
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

      {/* Error */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className={`${
          submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white px-4 py-2 rounded`}
      >
        {submitting ? "Submitting..." : "Submit Tripping"}
      </button>
    </div>
  );
}
