import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { format, parseISO } from 'date-fns';
import {
  CustomResultBase,
  CustomResultBasePaginated
} from '../ResultBase/ResultBase';
import { Pagination } from '../pagination';

export class InsertOrder {
  RentStart: Date;

  RentEnd: Date;

  IdUser: string; // Assuming Guid is represented as a string in TypeScript

  IdLapangan: number;

  NamaLapangan: string;

  Catatan: string;

  TotalHarga: number;

  constructor() {
    this.RentStart = new Date();
    this.RentEnd = new Date();
    this.IdUser = '';
    this.IdLapangan = 0;
    this.NamaLapangan = '';
    this.Catatan = '';
    this.TotalHarga = 0;
  }

  public async insertOrder(): Promise<CustomResultBase<ResultInsert> | null> {
    try {
      const date1 = format(this.RentStart, 'yyyy-MM-dd HH:mm');
      const date2 = format(this.RentEnd, 'yyyy-MM-dd HH:mm');

      const response = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}api/Order/InsertOrder`,
        {
          RentStart: date1,

          RentEnd: date2,

          IdUser: this.IdUser,

          IdLapangan: this.IdLapangan,

          Catatan: this.Catatan
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.resultMessage
        });
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

  public async SetTotalHarga(): Promise<number> {
    try {
      const date1 = format(this.RentStart, 'yyyy-MM-dd HH:mm');
      const date2 = format(this.RentEnd, 'yyyy-MM-dd HH:mm');

      const response = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}api/Order/GetEstimatePrice`,
        {
          params: {
            startDate: date1,
            endDate: date2,
            idLapangan: this.IdLapangan
          }
        }
      );

      if (response.status === 200) {
        this.TotalHarga = response.data.data;
        return response.data.data;
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

export class ResultInsert {
  IdOrder: number;

  RentStart: Date | null;

  RentEnd: Date | null;

  EstimatedPrice: number | null;

  Renter: string | null;

  Catatan: string | null;

  IsBuy: boolean | null;

  IdUser: string | null; // Assuming Guid is represented as a string in TypeScript

  CreatedAt: Date | null;

  constructor(
    idOrder: number,
    rentStart: Date | null,
    rentEnd: Date | null,
    estimatedPrice: number | null,
    renter: string | null,
    catatan: string | null,
    isBuy: boolean | null,
    idUser: string | null,
    createdAt: Date | null
  ) {
    this.IdOrder = idOrder;
    this.RentStart = rentStart;
    this.RentEnd = rentEnd;
    this.EstimatedPrice = estimatedPrice;
    this.Renter = renter;
    this.Catatan = catatan;
    this.IsBuy = isBuy;
    this.IdUser = idUser;
    this.CreatedAt = createdAt;
  }
}

export class Order {
  public idOrder: number;

  public idLapangan: number;

  public rentStart?: Date | null;

  public rentEnd?: Date | null;

  public estimatedPrice?: number | null;

  public namaLapangan?: string | null;

  public renter?: string | null;

  public catatan?: string | null;

  public isBuy?: boolean | null;

  public otherOrder?: number | null;

  public idUser?: string | null;

  public createdAt?: Date | null;

  public async fetchOrders(
    request: Pagination
  ): Promise<CustomResultBasePaginated<Order[]>> {
    try {
      const response = await axios.get<CustomResultBasePaginated<Order[]>>(
        `${process.env.REACT_APP_API_DOMAIN}` + 'api/Order/GetCurrentOrder',
        {
          params: {
            // Additional DataSourceRequest parameters
            page: request.page,
            size: request.size
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  public async ConfirmOrder(
    request: RequestInsertApprove
  ): Promise<CustomResultBase<boolean>> {
    // alert(JSON.stringify(request));
    try {
      const response = await axios.post<CustomResultBase<boolean>>(
        `${process.env.REACT_APP_API_DOMAIN}` + 'api/Order/ApprovePaymentOrder',
        {
          IdOrder: request.IdOrder,
          Catatan: request.Catatan
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.resultMessage
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response.data.resultMessage
      });
      console.error('Error fetching orders:', error);
    }
  }

  public async RejectOrder(
    request: RequestRejectOrder
  ): Promise<CustomResultBase<boolean>> {
    // alert(JSON.stringify(request));
    try {
      const response = await axios.post<CustomResultBase<boolean>>(
        `${process.env.REACT_APP_API_DOMAIN}` + 'api/Order/RejectOrder',
        {
          IdOrder: request.IdOrder,
          Catatan: request.Catatan,
          Status: request.Status
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.resultMessage
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response.data.resultMessage
      });
      console.error('Error fetching orders:', error);
    }
  }

  public async uploadProofOfPayment(
    idOrder?: number,
    pop?: File
  ): Promise<CustomResultBase<boolean>> {
    try {
      // Create FormData to send the file
      const formData = new FormData();
      formData.append('IdOrder', idOrder?.toString() || '');
      formData.append('pop', pop as Blob); // Use 'as Blob' to satisfy the type

      // alert(JSON.stringify(formData));

      const response = await axios.post<CustomResultBase<boolean>>(
        `${process.env.REACT_APP_API_DOMAIN}api/Order/UpdatePaymentOrder?idOrder=${idOrder}`,
        formData, // Send FormData as the body
        {
          headers: {
            'Content-Type': 'multipart/form-data' // Set the content type for file uploads
          }
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.resultMessage
      });

      return response.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response?.data?.resultMessage || 'An error occurred.'
      });

      console.error('Error uploading proof of payment:', error);
      throw error; // Re-throw the error so that the calling code can handle it if needed
    }
  }

  public async DownloadPOP(idOrder: number): Promise<void> {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}api/Order/DownloadPOP`,
        {
          params: {
            idOrder: idOrder
          },
          responseType: 'json' // Ensure that the response is treated as JSON
        }
      );

      const result = response.data.data;

      // Decode the base64 string to a Uint8Array
      const decodedFile = new Uint8Array(
        atob(result.file)
          .split('')
          .map((char) => char.charCodeAt(0))
      );

      // Create a Blob from the Uint8Array
      const blob = new Blob([decodedFile], { type: result.fileType });

      // Create a File object from the Blob
      const file = new File([blob], result.fileName, { type: result.fileType });

      // Create a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);

      // Set the download attribute with the filename
      link.download = file.name;

      // Append the link to the document body and trigger the click event
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document body
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }
}

export class RequestInsertApprove {
  public IdOrder: number;

  public Catatan?: string | null;
}

export class RequestRejectOrder {
  public IdOrder: number;

  public Catatan?: string | null;

  public Status?: string | null;
}
