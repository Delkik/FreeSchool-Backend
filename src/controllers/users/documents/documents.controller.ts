import {
  getDocumentsService,
  replaceDocumentService,
  uploadDocumentService,
  uploadIHIPService,
} from "@services/documentsService";
import { Request, Response } from "express";

export const getDocuments = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const grades = await getDocumentsService(userId);

    res.status(201).json({ grades, message: "Course saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const grades = await uploadDocumentService(userId, "");

    res.status(201).json({ grades, message: "Course saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getDocument = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const grades = await getDocumentsService(userId);

    res.status(201).json({ grades, message: "Course saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const replaceDocument = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const documentId = req.params.documentId;
    const { document } = req.body;

    const grades = await replaceDocumentService(userId, documentId, document);

    res.status(201).json({ grades, message: "Course saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadIHIP = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { grade, childName } = req.body;

    const file = await uploadIHIPService(userId, grade, childName);

    res
      .status(201)
      .json({ metadata: file, message: "Course saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
