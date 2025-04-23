import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@clients/dynamodb/client";

const TABLE_NAME = "FreeSchool";

// grades
export const getGradesService = async (userId: string) => {
  return (
    await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :user AND begins_with(SK, :grade)",
        ExpressionAttributeValues: {
          ":user": `USER#${userId}`,
          ":grade": `GRADE#`,
        },
      })
    )
  ).Items;
};

// grades/courses
export const getCourseGradesService = async (
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
          ":grade": `GRADE#COURSE#${courseId}#ASSIGNMENT#`,
        },
      })
    )
  ).Items;
};

// grades/courses/id
export const getCourseGradeService = async (
  userId: string,
  courseId: string
) => {
  return (
    await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :user AND SK = :grade",
        ExpressionAttributeValues: {
          ":user": `USER#${userId}`,
          ":grade": `GRADE#COURSE#${courseId}`,
        },
      })
    )
  ).Items?.[0];
};

// grades/courses/id
export const putCourseGradeService = async (
  userId: string,
  courseId: string,
  grade: number
) => {
  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `USER#${userId}`,
        SK: `GRADE#COURSE#${courseId}`,
        grade,
        courseId,
        gradeDate: new Date(),
        id: userId,
      },
    })
  );
};

// grades/courses/id/assignments/id
export const getAssignmentGradeService = async (
  userId: string,
  courseId: string,
  assignmentId: string
) => {
  return (
    await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :user AND SK = :grade",
        ExpressionAttributeValues: {
          ":user": `USER#${userId}`,
          ":grade": `GRADE#COURSE#${courseId}#ASSIGNMENT#${assignmentId}`,
        },
      })
    )
  ).Items?.[0];
};

// grades/courses/id/assignments/id
export const putAssignmentGradeService = async (
  userId: string,
  courseId: string,
  assignmentId: string,
  numberGrade: number
) => {
  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `USER#${userId}`,
        SK: `GRADE#COURSE#${courseId}#ASSIGNMENT#${assignmentId}`,
        numberGrade,
        courseId,
        assignmentId,
        gradeDate: new Date(),
        id: userId,
      },
    })
  );
};
