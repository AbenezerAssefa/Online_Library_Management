import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';  
import axios from 'axios';  
import { Book, CheckinBookPayload, CheckoutBookPayload } from '../../models/Book';  
import { PageInfo } from '../../models/Page';

interface BookSliceState {
  loading: boolean;
  error: boolean;
  books: Book[];
  currentBook: Book | undefined;
  pagingInformation: PageInfo | null;
}

const initialState: BookSliceState = {
  loading: true,
  error: false,
  books: [],
  currentBook: undefined,
  pagingInformation: null,
};

// Async thunk for fetching all books
export const fetchAllBooks = createAsyncThunk(
  'book/all',
  async (payload, thunkAPI) => {
    try {
      let req = await axios.get('http://localhost:8000/book/');
      return req.data.books; 
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// Async thunk for querying books based on the query string
export const queryBooks = createAsyncThunk(
  'book/query',
  async (payload: string, thunkAPI) => {
    try {
      let req = await axios.get(`http://localhost:8000/book/query${payload}`);
      return req.data.page;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// Async thunk for checking out a book
export const checkoutBook = createAsyncThunk(
  'book/checkout',
  async (payload: CheckoutBookPayload, thunkAPI) => {
    try {
      const returnedDate = new Date();
      returnedDate.setDate(returnedDate.getDate() + 14);

      const getPatron = await axios.get(`http://localhost:8000/card/${payload.libraryCard}`);
      let patronId = getPatron.data.libraryCard.user._id;

      const record = {
        status: 'LOANED',
        loanedDate: new Date(),
        dueDate: returnedDate,
        patron: patronId,
        employeeOut: payload.employee._id,
        item: payload.book._id,
      };

      const loadReq = await axios.post('http://localhost:8000/loan', record);
      const loan = loadReq.data.record;
      return loan;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// Async thunk for checking in a book
export const checkinBook = createAsyncThunk(
  'book/checkin',
  async (payload: CheckinBookPayload, thunkAPI) => {
    try {
      let record = payload.book.records[0];
      let updateRecord = {
        status: 'AVAILABLE',
        loanedDate: record.loanedDate,
        dueDate: record.dueDate,
        returnedDate: new Date(),
        patron: record.patron,
        employeeOut: record.employeeOut,
        employeeIn: payload.employee._id,
        item: record.item,
        _id: record._id,
      };

      let loan = await axios.put('http://localhost:8000/loan/', updateRecord);
      return loan.data.record;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// Async thunk for loading book by barcode
export const loadBookByBarcode = createAsyncThunk(
  'book/id',
  async (payload: string, thunkAPI) => {
    try {
      let res = await axios.get(`http://localhost:8000/book/query?barcode=${payload}`);
      let book = res.data.page.items[0];
      if (!book || book.barcode !== payload) {
        throw new Error();
      }
      return book;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// Create slice for books
export const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setCurrentBook(state, action: PayloadAction<Book | undefined>) {
      state = {
        ...state,
        currentBook: action.payload
      }
      return state;
    },
  },

  extraReducers: (builder) => {
    // Handle fetchAllBooks pending state
    builder.addCase(fetchAllBooks.pending, (state, action) => {
      state = {
        ...state,
       books: [],
       loading: true
      }
      return state;
  })

    // Handle queryBooks pending state
    builder.addCase(queryBooks.pending, (state, action) => {
      state = {
        ...state,
       books: [],
       loading: true
      }
      return state;
  })

    // Handle checkoutBook pending state
    builder.addCase(checkoutBook.pending, (state, action) => {
      state = {
        ...state,
       loading: true
      }
      return state;
  })

    // Handle checkinBook pending state
    builder.addCase(checkinBook.pending, (state) => {
      state = {
        ...state,
       loading: true
      }
      return state;
  })

    builder.addCase(loadBookByBarcode.pending, (state, action) => {
      state = {
        ...state,
      
       loading: true
      }
      return state;
  })

    // Handle fetchAllBooks fulfilled state
    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      state = {
        ...state,
       books:action.payload,
       loading: false
      }
      return state;
  })

    // Handle queryBooks fulfilled state
    builder.addCase(queryBooks.fulfilled, (state, action) => {
      state = {
        ...state,
        books: action.payload.items,
      pagingInformation : {
        totalCount: action.payload.totalCount,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        limit: action.payload.limit,
        pageCount: action.payload.pageCount,
      },
      loading:false
    }
    return state;

  })

    // Handle checkoutBook fulfilled state
    builder.addCase(checkoutBook.fulfilled, (state, action) => {
      let bookList: Book[] = JSON.parse(JSON.stringify(state.books));

      bookList = bookList.map((book) => {
        if (book._id === action.payload.item) {
          book.records = [action.payload, ...book.records];
          return book;
        }
        return book;
      });

      state = {
        ...state,
   
       loading: false,
       books: bookList
      }
      return state;
  })
  

    // Handle checkinBook fulfilled state
    builder.addCase(checkinBook.fulfilled, (state, action) => {
      let bookList: Book[] = JSON.parse(JSON.stringify(state.books));

      bookList = bookList.map((book) => {
        if (book._id === action.payload.item) {
          book.records.splice(0, 1, action.payload);
          return book;
        }
        return book;
      });

      state = {
        ...state,
    
       loading: false,
       books: bookList
      }
      return state;
  })

  builder.addCase(loadBookByBarcode.fulfilled, (state, action) => {
    state = {
      ...state,
  
     loading: false,
     currentBook: action.payload
    }
    return state;
})

builder.addCase(loadBookByBarcode.rejected, (state) => {
  state = {
    ...state,

   loading: false,
   error: true
  }
  return state;
})
   
  }
})

// Export actions and reducer
export const { setCurrentBook } = BookSlice.actions;
export default BookSlice.reducer;
