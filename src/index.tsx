import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect } from 'react';
import './style.css';

// Set a higher z-index for all SweetAlert dialogs globally
Swal.mixin({
  customClass: {
    container: 'swal-container'
  },
  didOpen: (modal) => {
    const swalContainer = modal.querySelector(
      '.swal-container'
    ) as HTMLElement | null;
    if (swalContainer) {
      swalContainer.style.zIndex = '10000';
    }
  }
});

axios.interceptors.request.use(
  (config) => {
    // alert(config.headers['Authorization']);
    config.headers['Authorization'] = `Bearer ${localStorage.getItem(
      'AuthToken'
    )}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // alert(JSON.stringify(error));

    if (error.response.status === 401 || error.response.status === 403) {
      // Redirect to the login page
      window.location.href = '/login';
    }

    // if (
    //   error.code == 'ERR_NETWORK' &&
    //   error.status == null &&
    //   error.config.headers.Authorization != null
    // ) {
    //   window.location.href = '/login';
    // }

    return Promise.reject(error);
  }
);

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
