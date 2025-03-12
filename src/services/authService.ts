import cognitoClient from "@clients/cognito/client";
import {
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ResendConfirmationCodeCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { generateSecretHash } from "@utils/generateSecretHash";

export const signUpUser = async (
  email: string,
  password: string,
  lastName: string,
  firstName: string
) => {
  const secretHash = generateSecretHash(email);

  const command = new SignUpCommand({
    ClientId: process.env.COGNITO_CLIENT_ID,
    SecretHash: secretHash,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "given_name", Value: firstName },
      { Name: "family_name", Value: lastName },
    ],
  });

  return await cognitoClient.send(command);
};

export const sendConfirmation = async (email: string) => {
  const secretHash = generateSecretHash(email);

  const command = new ResendConfirmationCodeCommand({
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
    SecretHash: secretHash,
  });

  return await cognitoClient.send(command);
};

export const confirmUser = async (email: string, confirmationCode: string) => {
  const secretHash = generateSecretHash(email);

  const command = new ConfirmSignUpCommand({
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
    ConfirmationCode: confirmationCode,
    SecretHash: secretHash,
  });

  return await cognitoClient.send(command);
};

export const loginUser = async (email: string, password: string) => {
  const secretHash = generateSecretHash(email);

  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  });

  return await cognitoClient.send(command);
};
