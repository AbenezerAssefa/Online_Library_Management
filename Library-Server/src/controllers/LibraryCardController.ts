import { Request, Response } from 'express';
import { findLibraryCard, registerLibraryCard } from '../services/LibraryCardService';
import { ILibraryCard } from '../models/LibraryCard';
import { LibraryCardDoesNotExistError } from '../utils/LibraryErrors';

export async function getLibraryCard(req: Request, res: Response){
  const {cardId} = req.params;  // Ensure the case matches with your route parameter
  try {
    let libraryCard = await findLibraryCard(cardId);
    
      res.status(200).json({ message: "Retrieved the user's card", libraryCard });
   
  } catch (error) {
    if(error instanceof LibraryCardDoesNotExistError){
      res.status(404).json({ message: "The Specified Library Card Does NOt Exist" });
    }else{
    res.status(500).json({ message: "Unable to retrieve the library card", error });
    }
  }
}

 async function createLibraryCard(req: Request, res: Response) {
  const card: ILibraryCard = req.body;
  try {
    let libraryCard = await registerLibraryCard(card);
    res.status(201).json({ message: "Library card created", libraryCard });
  } catch (error) {
   
    res.status(500).json({ message: "Unable to create library card at this time" });
  }
}

export default { getLibraryCard, createLibraryCard };
