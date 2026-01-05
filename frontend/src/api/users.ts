import { get, handleAPIError, post, put } from "src/api/requests";

import type { APIResult } from "src/api/requests";

export type User = {
  _id: string;
  name: string;
  profilePictureUrl?: string | null;
};

export type CreateUserRequest = {
  name: string;
  profilePictureUrl?: string;
};

export type UpdateUserRequest = {
  _id: string;
  name: string;
  profilePictureUrl?: string | null;
};

export async function createUser(user: CreateUserRequest): Promise<APIResult<User>> {
  try {
    const response = await post("/api/user", user);
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getUser(id: string): Promise<APIResult<User>> {
  try {
    const response = await get(`/api/user/${id}`);
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getAllUsers(): Promise<APIResult<User[]>> {
  try {
    const response = await get("/api/users/");
    const json = (await response.json()) as User[];
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateUser(user: UpdateUserRequest): Promise<APIResult<User>> {
  try {
    const response = await put(`/api/user/${user._id}`, user);
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
