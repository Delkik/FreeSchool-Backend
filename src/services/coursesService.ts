import {
  PutCommand,
  GetCommand,
  ScanCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "@clients/dynamodb/client";
import { Course } from "@schemas/Course";
import { BaseUser } from "@schemas/User";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = "FreeSchool";
const GSI_PK = "course-index";

export const createCourseService = async (
  courseName: string,
  description: string,
  maxCount: number,
  grade: string,
  teacher?: BaseUser
) => {
  const id = uuidv4();

  const course: Course = {
    id,
    courseName,
    description,
    teacher,
    maxCount,
    grade,
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `COURSE#${course.id}`,
        SK: "DETAILS",
        ...course,
      },
      ConditionExpression: "attribute_not_exists(PK)",
    })
  );

  return course;
};

export const enrollInCourseService = async (
  courseId: string,
  userId: string,
  title: string,
  description: string
) => {
  return await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `USER#${userId}`,
        SK: `COURSE#${courseId}#ENROLLED`,
        courseId,
        title,
        description,
        enrollDate: new Date().toISOString(),
        // TODO: add more data?
      },
      ConditionExpression: "attribute_not_exists(PK)", // Prevent duplicate borrowing
    })
  );
};

export const borrowCourseService = async (
  courseId: string,
  userId: string,
  title: string,
  description: string
) => {
  return await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `USER#${userId}`,
        SK: `COURSE#${courseId}#BORROWED`,
        courseId,
        title,
        description,
        borrowData: new Date().toISOString(),
        // TODO: add more data?
      },
      ConditionExpression: "attribute_not_exists(PK)", // Prevent duplicate borrowing
    })
  );
};

export const listUserCoursesService = async (userId: string) => {
  return await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "PK = :userId AND begins_with(SK, :prefix)",
      ExpressionAttributeValues: {
        ":userId": `USER#${userId}`,
        ":prefix": "COURSE#",
      },
    })
  );
};

// TODO:
export const getCourseGradeService = async (
  courseId: string,
  userId: string
) => {};

export const searchCoursesService = async (courseName: string) => {
  return await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: GSI_PK,
      KeyConditionExpression: "begins_with(courseName, :prefix)",
      ExpressionAttributeValues: {
        ":prefix": courseName,
      },
    })
  );
};

export const updateCourseService = async (course: Course) => {
  return await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `COURSE#${course.id}`,
        SK: "DETAILS",
        ...course,
      },
    })
  );
};

export const getCourseService = async (id: string) => {
  return await docClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `COURSE#${id}`,
        SK: "DETAILS",
      },
    })
  );
};

export const getCoursesService = async () => {
  return await docClient.send(
    new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: "begins_with(PK, :coursePrefix) AND SK = :details",
      ExpressionAttributeValues: {
        ":coursePrefix": "COURSE#",
        ":details": "DETAILS",
      },
    })
  );
};
