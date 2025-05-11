import { PutObjectCommand } from "@aws-sdk/client-s3";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@clients/dynamodb/client";
import { Document } from "@schemas/Document";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import { s3Client } from "@clients/s3/client";

const TABLE_NAME = "FreeSchool2";
const BUCKET_NAME = "free-school-bucket-2";

export const getDocumentsService = async (userId: string) => {
  return (
    await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :user AND begins_with(SK, :document)",
        ExpressionAttributeValues: {
          ":user": `USER#${userId}`,
          ":document": `DOCUMENT#`,
        },
      })
    )
  ).Items;
};

export const uploadDocumentService = async (
  userId: string,
  courseId: string
) => {
  return (
    await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :user AND begins_with(SK, :grade)",
        ExpressionAttributeValues: {
          ":user": `USER#${userId}`,
          ":grade": `DOCUMENT#${courseId}#ASSIGNMENT#`,
        },
      })
    )
  ).Items;
};

export const getDocumentMetadataService = async (
  userId: string,
  documentId: string
) => {
  return (
    await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :user AND SK = :document",
        ExpressionAttributeValues: {
          ":user": `USER#${userId}`,
          ":document": `DOCUMENT#${documentId}`,
        },
      })
    )
  ).Items?.[0];
};

export const getDocumentFileService = async (
  userId: string,
  documentId: string
) => {
  return (
    await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :user AND SK = :grade",
        ExpressionAttributeValues: {
          ":user": `USER#${userId}`,
          ":grade": `DOCUMENT#${documentId}`,
        },
      })
    )
  ).Items?.[0];
};

// grades/courses/id
export const replaceDocumentService = async (
  userId: string,
  documentId: string,
  document: Document
) => {
  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `USER#${userId}`,
        SK: `DOCUMENT#${documentId}`,
        ...document,
      },
    })
  );
};

// grades/courses/id/assignments/id
export const uploadIHIPService = async (
  userId: string,
  grade: string,
  childName: string
) => {
  let filePath = "";
  try {
    const g = grade === "K" ? 0 : Number(grade);
    if (g < 7) {
      filePath = path.resolve(__dirname, "../files/ihip/ihip-1-6.pdf");
    } else if (g < 9) {
      filePath = path.resolve(__dirname, "../files/ihip/ihip-7-8.pdf");
    } else {
      filePath = path.resolve(__dirname, "../files/ihip/ihip-9-12.pdf");
    }
  } catch {
    filePath = path.resolve(__dirname, "../files/ihip/ihip-1-6.pdf");
  }

  const file = fs.createReadStream(filePath);

  const id = uuidv4();

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `users/${userId}/${id}.pdf`, // set your own user-specific path
    Body: file,
    ContentType: "application/pdf",
  });

  try {
    const response = await s3Client.send(command);
    console.log("Upload successful:", response);
  } catch (error) {
    throw new Error("Upload failed:" + error);
  }

  const doc: Document = {
    id,
    title: `${childName}'s IHIP`,
    description: `An IHIP for Grade ${grade}`,
    link: `https://${BUCKET_NAME}.s3.${process.env.SERVER_AWS_REGION}.amazonaws.com/users/${userId}/${id}.pdf`,
    ownerId: userId,
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `USER#${userId}`,
        SK: `DOCUMENT#${id}`,
        ...doc,
      },
      ConditionExpression: `attribute_not_exists(SK)`,
    })
  );

  return doc;
};
