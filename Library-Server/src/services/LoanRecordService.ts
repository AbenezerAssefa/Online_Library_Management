import LoanRecordDao, { ILoanRecordModel } from '../daos/LoanRecordDao';
import { findBookById, modifyBook } from './BookService';
import { ILoanRecord } from '../models/LoanRecord';
import { LoanRecordDoesNotExist } from '../utils/LibraryErrors';

// Function to generate a new loan record
export async function generateRecord(record: ILoanRecord): Promise<ILoanRecordModel> {
  try {
    let createdRecord = new LoanRecordDao(record);
    createdRecord = await createdRecord.save();

    let book = await findBookById(record.item);
    let records = book.records;

    records = [createdRecord, ...records];
    book.records = records;

    await modifyBook(book);

    return createdRecord;

  } catch (error) {
    throw error;
  }
  
}

// Function to modify an existing loan record
export async function modifyRecord(record: ILoanRecordModel): Promise<ILoanRecordModel> {
  try {
    let updatedRecord = await LoanRecordDao.findOneAndUpdate(
      { _id: record._id },
      record,
      { new: true }
    );
 
    if (updatedRecord) {
      let book = await findBookById(record.item);
      
      let records = book.records;
      
        records[0] = updatedRecord;
        book.records = records;

      await modifyBook(book);

      return updatedRecord;
    } 
      throw new LoanRecordDoesNotExist("The record does not exit")
  } catch (error) {
    throw error;
  }
}

// Function to retrieve all loan records
export async function findAllRecords(): Promise<ILoanRecordModel[]> {
  try {
    return await LoanRecordDao.find();
  } catch (error) {
    throw error;
  }
}

// Function to query loan records by a specific property (e.g., 'status', 'loanedDate')
export async function queryRecords(params: { property: string, value: string | Date }): Promise<ILoanRecordModel[]> {
  try {
    return await LoanRecordDao.find({ [params.property]: params.value })
      .populate("item")
      .sort( "-loanedDate");
  } catch (error) {
    throw error;
  }
}
