import { PutCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@clients/dynamodb/client";
import { Assignment } from "@schemas/Assignment";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = "FreeSchool2";

export const createAssignmentService = async (
  name: string,
  description: string,
  section: number,
  courseId: string,
  maxGrade?: number,
  due?: string
) => {
  const id = uuidv4();

  const assignment: Assignment = {
    id,
    courseId,
    name,
    description,
    maxGrade,
    section,
    due,
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `COURSE#${assignment.courseId}`,
        SK: `ASSIGNMENT#${assignment.id}`,
        ...assignment,
      },
      ConditionExpression: "attribute_not_exists(SK)",
    })
  );

  return assignment;
};

export const submitAssignmentService = async (
  courseId: string,
  userId: string,
  assignmentId: string,
  submission: string
) => {
  return await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `USER#${userId}`,
        SK: `COURSE#${courseId}#ASSIGNMENT#${assignmentId}`,
        userId,
        submission,
        submitDate: new Date().toISOString(),
      },
    })
  );
};

export const updateAssignmentService = async (assignment: Assignment) => {
  return await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `COURSE#${assignment.courseId}`,
        SK: `ASSIGNMENT#${assignment.id}`,
        ...assignment,
      },
    })
  );
};

export const getAssignmentService = async (
  courseId: string,
  assignmentId: string
) => {
  return await docClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `COURSE#${courseId}`,
        SK: `ASSIGNMENT#${assignmentId}`,
      },
    })
  );
};

export const getAssignmentsService = async (courseId: string) => {
  return await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression:
        "PK = :course AND begins_with(SK, :assignmentPrefix)",
      ExpressionAttributeValues: {
        ":course": `COURSE#${courseId}`,
        ":assignmentPrefix": "ASSIGNMENT#",
      },
    })
  );
};

export const getSubmittedAssignmentService = async (
  courseId: string,
  userId: string,
  assignmentId: string
) => {
  return await docClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `USER#${userId}`,
        SK: `COURSE#${courseId}#ASSIGNMENT#${assignmentId}`,
      },
    })
  );
};
