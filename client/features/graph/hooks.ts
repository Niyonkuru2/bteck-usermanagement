import { useQuery } from "@tanstack/react-query";
import { getGraph } from "./apicall";

export const useGraph = () => {
  return useQuery({
    queryKey: ["graph"],
    queryFn: getGraph,
  });
};