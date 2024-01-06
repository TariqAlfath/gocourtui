import axios from 'axios';
import { CustomResultBase } from '../ResultBase/ResultBase';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

class ActiveCourt {
  public idLapangan: number;

  public namaLapangan: string;

  public idJenisLapangan: number;

  public namaJenisLapangan: string;

  public hargaLapangan: number;
  // Add other attributes if needed

  public async fetchAvailableCourt(
    startDate?: Date | null,
    endDate?: Date | null,
    idJenisLapangan?: number | null
  ): Promise<CustomResultBase<ActiveCourt[]> | null> {
    try {
      const formatDate = (date) => {
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

      var date1 = formatDate(startDate);
      var date2 = formatDate(endDate);
      const response = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}api/Lapangan/GetAvailableCourt`,
        {
          params: {
            startDate: date1,
            endDate: date2,
            idJenisLapangan
          }
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Failed to fetch data. Server returned:', response);
        return null;
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.resultMessage,
          customClass: {
            container: 'swal-container' // Add a custom class to the container
          },
          didOpen: (modal) => {
            // Set a higher z-index for the SweetAlert container
            const swalContainer = modal.querySelector(
              '.swal-container'
            ) as HTMLElement | null;
            if (swalContainer) {
              swalContainer.style.zIndex = '9999';
            }
          }
        });

        return error.response.data;
      }
      console.error('An error occurred while fetching data:', error);
      return null;
    }
  }
}

export default ActiveCourt;
