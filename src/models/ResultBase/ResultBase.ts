class CustomResultBase<T> {
  resultCode: string;

  resultMessage: string;

  resultCountData: number | null;

  data: T | null;

  constructor() {
    this.resultCode = '1000';
    this.resultMessage = 'Success';
    this.resultCountData = 0;
    this.data = null;
  }
}

class CustomResultBasePaginated<T> extends CustomResultBase<T> {
  pagination: CustomPaginated | null;

  constructor() {
    super();
    this.pagination = null;
  }
}

class CustomPaginated {
  page: number;

  size: number;

  total: number;

  totalPage: number;
}

export { CustomResultBase, CustomResultBasePaginated, CustomPaginated };
