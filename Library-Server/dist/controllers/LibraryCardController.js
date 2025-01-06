"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLibraryCard = getLibraryCard;
const LibraryCardService_1 = require("../services/LibraryCardService");
const LibraryErrors_1 = require("../utils/LibraryErrors");
function getLibraryCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cardId } = req.params; // Ensure the case matches with your route parameter
        try {
            let libraryCard = yield (0, LibraryCardService_1.findLibraryCard)(cardId);
            res.status(200).json({ message: "Retrieved the user's card", libraryCard });
        }
        catch (error) {
            if (error instanceof LibraryErrors_1.LibraryCardDoesNotExistError) {
                res.status(404).json({ message: "The Specified Library Card Does NOt Exist" });
            }
            else {
                res.status(500).json({ message: "Unable to retrieve the library card", error });
            }
        }
    });
}
function createLibraryCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = req.body;
        try {
            let libraryCard = yield (0, LibraryCardService_1.registerLibraryCard)(card);
            res.status(201).json({ message: "Library card created", libraryCard });
        }
        catch (error) {
            res.status(500).json({ message: "Unable to create library card at this time" });
        }
    });
}
exports.default = { getLibraryCard, createLibraryCard };
