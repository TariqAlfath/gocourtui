export interface DataSourceRequest {
  page?: number;
  size?: number;
  searchType?: string;
  searchVal?: string;
  field?: string;
  isAsc?: boolean;
  method?: string;
}

export const formatDateFromString = (date) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Bangkok' // Adjust the timezone if needed
  };

  return date.toLocaleString('en-US', options);
};
