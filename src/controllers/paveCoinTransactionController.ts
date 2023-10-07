import { Request, Response } from "express";
import PaveCoinTransaction from "../models/paveCoinTransaction";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = new PaveCoinTransaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await PaveCoinTransaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.json(transaction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await PaveCoinTransaction.find();
    res.json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const transactions = await PaveCoinTransaction.find({ user: userId });

    if (!transactions.length) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }

    res.json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const updatedTransaction = await PaveCoinTransaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTransaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.json(updatedTransaction);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const deletedTransaction = await PaveCoinTransaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};
