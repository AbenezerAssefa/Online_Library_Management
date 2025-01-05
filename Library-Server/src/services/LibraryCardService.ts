import LibraryCardDao, { ILibraryCardModel } from '../daos/LibraryCardDao';
import { ILibraryCard } from '../models/LibraryCard';
import {  LibraryCardDoesNotExistError } from '../utils/LibraryErrors';

export async function registerLibraryCard(card: ILibraryCard): Promise<ILibraryCardModel> {
  try {
    const savedCard = new LibraryCardDao(card);
    return await savedCard.save();
  } catch (error: any) {
    let existingCard = await LibraryCardDao.findOne({ user: card.user }).populate('user');
    if (existingCard) return existingCard;
    throw error;
  }
}

export async function findLibraryCard(libraryCardId: string): Promise<ILibraryCardModel> {
  try {
    let card = await LibraryCardDao.findOne({ _id: libraryCardId }).populate('user');
    if (card) return card;
    throw new LibraryCardDoesNotExistError('The Library Card Specified Does Not Exist');
  } catch (error: any) {
    throw error;
  }
}
