import { useSearchParams } from "react-router-dom";

export const useFilterPagination = (
  filters?: string[],
  options?: { preFixer: string }
) => {
  const [searchParams] = useSearchParams();
  // console.log('searchParams *** : ', searchParams);
  return {
    searchQuery:
      searchParams?.get(options?.preFixer ? `${options?.preFixer}_q` : "q") ||
      "",
    appliedFilters: filters?.map((filter) => ({
      fieldName: filter,
      value: searchParams?.getAll(filter),
    })),
    page:
      searchParams?.get(
        options?.preFixer ? `${options?.preFixer}_page` : "page"
      ) || 1,
    limit:
      searchParams?.get(
        options?.preFixer ? `${options?.preFixer}_limit` : "limit"
      ) || 10,
    dateFilter: {
      startDate: searchParams?.get(
        options?.preFixer ? `${options?.preFixer}_startDate` : "startDate"
      ),
      endDate: searchParams?.get(
        options?.preFixer ? `${options?.preFixer}_endDate` : "endDate"
      ),
      // start_date: searchParams?.get(
      //   options?.preFixer ? `${options?.preFixer}_startDate` : "startDate"
      // ),
      // end_date: searchParams?.get(
      //   options?.preFixer ? `${options?.preFixer}_endDate` : "endDate"
      // ),
      dateFilterKey: "createdAt",
      // dateFilterKey: searchParams?.get(
      //   options?.preFixer
      //     ? `${options?.preFixer}_dateFilterKey`
      //     : "dateFilterKey"
      // ),
    },
    orderBy: searchParams?.get(
      options?.preFixer ? `${options?.preFixer}_sortBy` : "sortBy"
    ),
    orderValue: searchParams?.get(
      options?.preFixer ? `${options?.preFixer}_sortOrder` : "sortOrder"
    ),
    active: searchParams?.get(
      options?.preFixer ? `${options?.preFixer}_active` : "active"
    ),
  };
};
