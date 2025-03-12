import { PutCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@clients/dynamodb/client";
import { BaseUser, Role } from "@schemas/User";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = "Users";

export const createUserService = async (
  firstName: string,
  lastName: string,
  email: string,
  role: Role,
  data: any
) => {
  const id = uuidv4();

  const user: BaseUser = {
    id,
    firstName,
    lastName,
    email,
    role,
    isFirstTime: true,
    ...data,
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: user,
      ConditionExpression: "attribute_not_exists(email)",
    })
  );
};

export const getUserService = async (id: string) => {
  return await docClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { id },
    })
  );
};

export const getUsersService = async () => {
  return await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
};
