import React from 'react';
import axios from 'axios';
import { DataSourceRequest, formatDateFromString } from '../datasourcerequest';
import {
  CustomResultBasePaginated,
  CustomResultBase
} from '../ResultBase/ResultBase';
import { Pagination } from '../pagination';

export class MResGetHistoryOrder {
  id: number;

  renter?: string | null;

  status?: string | null;

  editedBy?: string | null;

  total?: number | null;

  public async GetHistoryOrderAsync(
    request: Pagination,
    startDate?: Date | null,
    endDate?: Date | null
  ): Promise<CustomResultBasePaginated<MResGetHistoryOrder[]> | null> {
    try {
      //   alert(JSON.stringify(request));
      const response = await axios.get<
        CustomResultBasePaginated<MResGetHistoryOrder[]>
      >(`${process.env.REACT_APP_API_DOMAIN}api/Report/GetOrderHistory`, {
        params: {
          page: request.page,
          size: request.size,
          stDate: formatDateFromString(startDate),
          enDate: formatDateFromString(endDate)
        }
      });
      //   alert(JSON.stringify(response));
      if (response.data.resultCode === '1000') {
        return response.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}

export class MResMostOrderedCourt {
  number: number;

  idCourt?: number | null;

  namaLapangan?: string | null;

  total?: number | null;

  public async GetMostOrderedCourt(
    request: Pagination
  ): Promise<CustomResultBasePaginated<MResMostOrderedCourt[]> | null> {
    try {
      const response = await axios.get<
        CustomResultBasePaginated<MResMostOrderedCourt[]>
      >(`${process.env.REACT_APP_API_DOMAIN}api/Report/GetMostOrderedCourt`, {
        params: {
          page: request.page,
          size: request.size
        }
      });

      if (response.data.resultCode === '1000') {
        return response.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}

export class MResGetRevenueEachMonth {
  tahun: string;

  data: DataRevenue[];

  /**
   *
   */
  constructor() {
    this.data = [];
  }

  public async GetRevenueEachMonth(
    year?: Date | null
  ): Promise<CustomResultBase<MResGetRevenueEachMonth> | null> {
    try {
      const response = await axios.get<
        CustomResultBase<MResGetRevenueEachMonth>
      >(`${process.env.REACT_APP_API_DOMAIN}api/Report/GetRevenueEachMonth`, {
        params: {
          year: formatDateFromString(year)
        }
      });

      if (response.data.resultCode === '1000') {
        return response.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}

class DataRevenue {
  dataKey: number;

  label: string;
}

export class MResGetGrouppedStatus {
  rejectedCount: number;

  acceptedCount: number;

  pendingCount: number;

  public async GetGrouppedStatus(
    date?: Date | null
  ): Promise<CustomResultBase<MResGetGrouppedStatus> | null> {
    try {
      const response = await axios.get<CustomResultBase<MResGetGrouppedStatus>>(
        `${process.env.REACT_APP_API_DOMAIN}api/Report/GetGrouppedStatusCount`,
        {
          params: {
            date: formatDateFromString(date)
          }
        }
      );

      if (response.data.resultCode === '1000') {
        return response.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}
