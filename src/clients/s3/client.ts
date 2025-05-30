import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const client = new S3Client({
  region: process.env.SERVER_AWS_REGION,
  credentials: {
    accessKeyId: process.env.SERVER_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SERVER_AWS_SECRET_ACCESS_KEY!,
  },
});

export { client as s3Client };
