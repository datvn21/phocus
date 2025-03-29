import { getData, setData } from "./store";

export async function getUser() {
  const user = await getData("user");
  return user;
}

export async function setUser(user) {
  await setData("user", user);
  return true;
}

export async function removeUser() {
  await setData("user", null);
}

export async function updateUser(user) {
  await setData("user", user);
}
