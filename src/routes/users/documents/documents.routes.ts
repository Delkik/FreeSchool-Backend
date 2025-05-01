import {
  getDocument,
  getDocuments,
  replaceDocument,
  uploadDocument,
  uploadIHIP,
} from "@controllers/users/documents/documents.controller";
import { Router } from "express";

const router = Router({ mergeParams: true });

router.get("/", getDocuments);
router.post("/", uploadDocument);

router.post("/ihip", uploadIHIP);

router.get("/:documentId", getDocument);
router.post("/:documentId", replaceDocument);

export default router;
