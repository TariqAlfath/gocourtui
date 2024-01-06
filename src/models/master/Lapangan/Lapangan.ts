import React from 'react';
import axios from 'axios';
import { DataSourceRequest } from 'src/models/datasourcerequest';
import {
  CustomResultBasePaginated,
  CustomResultBase
} from 'src/models/ResultBase/ResultBase';

export class Lapangan {
  idLapangan: number;

  idJenisLapangan: number;

  namaJenisLapangan: string;

  namaLapangan: string;

  hargaLapangan: number;

  status: boolean;

  public async getAllLapanganPagination(
    request: DataSourceRequest
  ): Promise<CustomResultBasePaginated<Lapangan[]> | null> {
    try {
      const response = await axios.get<CustomResultBasePaginated<Lapangan[]>>(
        `${process.env.REACT_APP_API_DOMAIN}api/Lapangan/GetLapanganPagination`,
        {
          params: {
            page: request.page,
            size: request.size,
            searchType: request.searchType,
            searchVal: request.searchVal,
            field: request.field,
            isAsc: request.isAsc,
            method: request.method
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

export class MReqUpdateLapangan {
  IdLapangan: number;

  IdJenisLapangan: number;

  NamaLapangan: string;

  HargaLapangan: number;

  public async updateLapangan(
    request: MReqUpdateLapangan
  ): Promise<CustomResultBase<boolean> | null> {
    try {
      const response = await axios.post<CustomResultBase<boolean>>(
        `${process.env.REACT_APP_API_DOMAIN}api/Lapangan/UpdateLapangan`,
        request
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

export class MReqInsertLapangan {
  IdJenisLapangan: number;

  NamaLapangan: string;

  HargaLapangan: number;

  public async insertLapangan(
    request: MReqInsertLapangan
  ): Promise<CustomResultBase<boolean> | null> {
    try {
      const response = await axios.post<CustomResultBase<boolean>>(
        `${process.env.REACT_APP_API_DOMAIN}api/Lapangan/InsertLapangan`,
        request
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

export class MReqUpdateStatusLapangan {
  public IdLapangan: number;

  public Status: boolean;

  public async updateStatusLapangan(
    request: MReqUpdateStatusLapangan
  ): Promise<CustomResultBase<boolean>> {
    try {
      const response = await axios.post<CustomResultBase<boolean>>(
        `${process.env.REACT_APP_API_DOMAIN}api/Lapangan/DisableLapangan`,
        request
      );

      return response.data;
    } catch (error) {
      console.error('Error updating flag peserta:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }
}
