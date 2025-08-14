import { useState, useEffect, useCallback } from "react";
import type { Tripping } from "@/lib/types/tripping";
import * as trippingService from "@/lib/services/tripping";

export const useTrippings = () => {
  const [trippings, setTrippings] = useState<Tripping[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all trippings
  const fetchTrippings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await trippingService.fetchTrippings();
      setTrippings(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch trippings");
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new tripping
  const createTripping = useCallback(async (newTripping: Omit<Tripping, "id">) => {
    setLoading(true);
    setError(null);
    try {
      const created = await trippingService.createTripping(newTripping);
      setTrippings((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err.message || "Failed to create tripping");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrippings();
  }, [fetchTrippings]);

  return {
    trippings,
    loading,
    error,
    fetchTrippings,
    createTripping,
    setTrippings,
  };
};
