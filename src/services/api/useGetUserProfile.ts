import { useQuery } from "@tanstack/react-query";

import apiClient from "@/agent/apiClient";

const useGetUserProfile = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await apiClient.get("/auth");
      if (res) return res;
    },
  });
  return query;
};

export default useGetUserProfile;
