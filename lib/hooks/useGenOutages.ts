// lib/hooks/useGenOutages.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { genOutageService } from "../services/genOutage";
import type { GenOutage, GenOutageCreate } from "../types/genOutage";

// Unique key for caching GenOutages
const GEN_OUTAGES_KEY = ["genOutages"];

// ✅ Fetch all generation outages
export function useGenOutages() {
  return useQuery<GenOutage[]>({
    queryKey: GEN_OUTAGES_KEY,
    queryFn: genOutageService.list,
  });
}

// ✅ Create new generation outage
export function useCreateGenOutage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GenOutageCreate) => genOutageService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GEN_OUTAGES_KEY });
    },
  });
}

// ✅ Update existing outage
export function useUpdateGenOutage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<GenOutageCreate>;
    }) => genOutageService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GEN_OUTAGES_KEY });
    },
  });
}

// ✅ Delete outage
export function useDeleteGenOutage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => genOutageService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GEN_OUTAGES_KEY });
    },
  });
}
