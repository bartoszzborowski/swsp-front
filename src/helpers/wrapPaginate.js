import { getValue } from './getValue';

export const wrapPaginate = (data, paginate) => {
  return {
    data,
    total: getValue(paginate.total),
    page: getValue(paginate.current_page),
  };
};
