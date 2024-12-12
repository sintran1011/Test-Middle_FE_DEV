import { useQuery } from "@tanstack/react-query";

import apiClient from "@/agent/apiClient";
import { IRepo, IUser } from "@/global/types/common.types";
import { toast } from "react-toastify";

const useGetRepoList = (userName: string) => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await apiClient.get(`${userName}/repos`);
        if (res) {
          const data: IRepo[] = res.data;
          return data;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // out of limit query
        toast.error("Not found repo");
      }
    },
    enabled: !!userName,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useGetRepoList;
