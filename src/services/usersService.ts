import { PutCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@clients/dynamodb/client";
import { BaseUser, Role } from "@schemas/User";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = "FreeSchool";

export const createUserService = async (
  firstName: string,
  lastName: string,
  email: string,
  role: Role,
  parentId?: string,
  grade?: string,
  rating?: number
) => {
  const id = uuidv4();

  const user: BaseUser = {
    id,
    firstName,
    lastName,
    email,
    role,
    isFirstTime: true,
    parentId,
    grade,
    rating,
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `USER#${user.id}`,
        SK: "PROFILE",
        ...user,
      },
      ConditionExpression: "attribute_not_exists(email)",
    })
  );

  return user;
};

export const updateUserService = async (user: BaseUser) => {
  return await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `USER#${user.id}`,
        SK: "PROFILE",
        ...user,
      },
    })
  );
};

export const getUserService = async (id: string) => {
  return await docClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `USER#${id}`,
        SK: "PROFILE",
      },
    })
  );
};

export const getUsersService = async () => {
  return await docClient.send(
    new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: "begins_with(PK, :userPrefix) AND SK = :profile",
      ExpressionAttributeValues: {
        ":userPrefix": "USER#",
        ":profile": "PROFILE",
      },
    })
  );
};

export const getChildrenService = async (id: string) => {
  return await docClient.send(
    new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: "SK = :profile AND parentId = :parentId",
      ExpressionAttributeValues: {
        ":profile": "PROFILE",
        ":parentId": id,
      },
    })
  );
};

export const queryUserService = async (query: Partial<BaseUser>) => {
  const filterExpressions = Object.keys(query)
    .map((key) => `${key} = :${key}`)
    .join(" AND ");

  const expressionAttributeValues = Object.fromEntries(
    Object.entries(query).map(([key, value]) => [`:${key}`, value])
  );

  return await docClient.send(
    new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: `begins_with(PK, :userPrefix) AND SK = :profile ${
        // need the "AND" only if we have filter expressions
        filterExpressions ? " AND " + filterExpressions : ""
      }`,
      ExpressionAttributeValues: {
        ":userPrefix": "USER#",
        ":profile": "PROFILE",
        ...expressionAttributeValues,
      },
    })
  );
};
