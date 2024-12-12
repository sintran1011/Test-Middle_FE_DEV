import { useQuery } from "@tanstack/react-query";

import apiClient from "@/agent/apiClient";
import { IUser } from "@/global/types/common.types";
import { toast } from "react-toastify";

const useGetUserProfile = (userName: string, enabled: boolean) => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await apiClient.get(`${userName}`);
        if (res) {
          const data: IUser = res.data;
          return data;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // out of limit query
        console.log(error, "error");
        toast.error("Not found user");
      }
    },
    enabled: !!enabled,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useGetUserProfile;
