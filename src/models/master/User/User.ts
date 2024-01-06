import axios from 'axios';
import {
  CustomResultBase,
  CustomResultBasePaginated
} from 'src/models/ResultBase/ResultBase';
import { DataSourceRequest } from 'src/models/datasourcerequest';

export class MReqUser {
  public Username: string;

  public Nama: string;

  public Alamat: string;

  public NomorTelefon: string;

  public Email: string;

  public Role: string;

  public async Register(request: MReqUser): Promise<CustomResultBase<boolean>> {
    try {
      const response = await axios.post<CustomResultBase<boolean>>(
        `${process.env.REACT_APP_API_DOMAIN}api/Authentication/RegisterUser`,
        request
      );

      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }
}

export class MResUser {
  public idUser: string;

  public username: string;

  public password: string;

  public nama: string;

  public alamat: string;

  public nomorTelefon: string;

  public email: string;

  public role: string;

  public status: boolean;

  public async GetListUsers(
    request: DataSourceRequest
  ): Promise<CustomResultBasePaginated<MResUser[]>> {
    try {
      const response = await axios.get<CustomResultBasePaginated<MResUser[]>>(
        `${process.env.REACT_APP_API_DOMAIN}api/Authentication/GetListUsers`,
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
      console.error('Error fetching users:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }
}

export const GetCurrentUser = () => {
  // Create a new instance of MResUser
  var result = new MResUser();

  // Retrieve user information from local storage
  var user = localStorage.getItem('Profile');

  // Check if user information exists in local storage
  if (user) {
    // If user information exists, parse it and assign it to the result
    result = JSON.parse(user);
  }

  // Return the user information
  return result;
};

export class MReqUpdateFlagPeserta {
  public IdPeserta: string;

  public Status: boolean;

  public async updateFlagPeserta(
    request: MReqUpdateFlagPeserta
  ): Promise<CustomResultBase<boolean>> {
    try {
      const response = await axios.post<CustomResultBase<boolean>>(
        `${process.env.REACT_APP_API_DOMAIN}api/Authentication/UpdateFlagPeserta`,
        request
      );

      return response.data;
    } catch (error) {
      console.error('Error updating flag peserta:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }
}

export class MReqUpdateRolePeserta {
  public IdPeserta: string;

  public Role: string;

  public async updateRolePeserta(
    request: MReqUpdateRolePeserta
  ): Promise<CustomResultBase<boolean>> {
    try {
      const response = await axios.post<CustomResultBase<boolean>>(
        `${process.env.REACT_APP_API_DOMAIN}api/Authentication/UpdateRolePeserta`,
        request
      );

      return response.data;
    } catch (error) {
      console.error('Error updating flag peserta:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }
}
