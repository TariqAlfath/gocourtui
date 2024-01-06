import axios from 'axios';
import {
  CustomResultBase,
  CustomResultBasePaginated
} from '../../ResultBase/ResultBase';
import { DataSourceRequest } from 'src/models/datasourcerequest';

export class MReqUpdateJenisLapangan {
  public IdJenisLapangan: number;

  public NamaJenisLapangan: string;

  public async UpdateJenisLapangan(
    request: MReqUpdateJenisLapangan
  ): Promise<CustomResultBase<boolean>> {
    try {
      const response = await axios.post<CustomResultBase<boolean>>(
        `${process.env.REACT_APP_API_DOMAIN}api/JenisLapangan/UpdateJenisLapangan`,
        request
      );
      return response.data;
    } catch (error) {
      console.error('Error updating jenis lapangan:', error);
      throw error;
    }
  }
}

export class MReqInsertJenisLapangan {
  public NamaJenisLapangan: string;

  public async InsertJenisLapangan(
    request: MReqInsertJenisLapangan
  ): Promise<CustomResultBase<boolean>> {
    try {
      const response = await axios.post<CustomResultBase<boolean>>(
        `${process.env.REACT_APP_API_DOMAIN}api/JenisLapangan/InsertJenisLapangan?namaJenisLapangan=${request.NamaJenisLapangan}`,
        {}
      );
      return response.data;
    } catch (error) {
      console.error('Error inserting jenis lapangan:', error);
      throw error;
    }
  }
}

export class JenisLapangan {
  public idJenisLapangan: number;

  public namaJenisLapangan: string;

  public status: boolean;

  public async fetchJenisLapanganDataSourceRequest(
    request: DataSourceRequest
  ): Promise<CustomResultBasePaginated<JenisLapangan[]>> {
    try {
      const response = await axios.get<
        CustomResultBasePaginated<JenisLapangan[]>
      >(
        `${process.env.REACT_APP_API_DOMAIN}api/JenisLapangan/GetJenisLapanganPagination`,
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

      return response.data;
    } catch (error) {
      console.error('Error fetching jenis lapangan:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  public async fetchJenisLapangan(): Promise<CustomResultBase<
    JenisLapangan[]
  > | null> {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}api/JenisLapangan/GetJenisLapangan`,
        {}
      );

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Failed to fetch data. Server returned:', response);
        return null;
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
      return null;
    }
  }
}

export class MReqUpdateStatusJenisLapangan {
  public IdJenisLapangan: number;

  public Status: boolean;

  public async updateStatusJenisLapangan(
    request: MReqUpdateStatusJenisLapangan
  ): Promise<CustomResultBase<boolean>> {
    try {
      const response = await axios.post<CustomResultBase<boolean>>(
        `${process.env.REACT_APP_API_DOMAIN}api/JenisLapangan/DisableJenisLapangan`,
        request
      );

      return response.data;
    } catch (error) {
      console.error('Error updating flag peserta:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }
}
