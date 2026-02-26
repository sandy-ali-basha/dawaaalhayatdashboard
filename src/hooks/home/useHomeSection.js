import { useQuery } from "react-query";
import { _Home } from "api/home/home";

const normalizeSectionResponse = (response, id) => {
  if (!response) return response;

  const sectionId = Number(id);

  if (Array.isArray(response)) {
    return response.find((section) => Number(section?.id) === sectionId) || null;
  }

  if (Array.isArray(response?.home_sections)) {
    return (
      response.home_sections.find((section) => Number(section?.id) === sectionId) ||
      null
    );
  }

  if (Array.isArray(response?.sections)) {
    return (
      response.sections.find((section) => Number(section?.id) === sectionId) ||
      null
    );
  }

  return response;
};

export const useHomeSection = (id) => {

  const { data, isLoading, refetch } = useQuery(
    ["getHomeSection", id], // 👈 include id in key
    () =>
      _Home.getSection({
        id     // 👈 pass id to API
      }).then((res) => normalizeSectionResponse(res, id)),
    {
      enabled: !!id, // query runs only when id exists
    }
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
