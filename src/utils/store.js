import { load } from "@tauri-apps/plugin-store";

export async function setData(key, value) {
  const store = await load("store.json", { autoSave: false });
  await store.set(key, value);
  await store.save(); // Lưu vào file
  return await store.get(key);
}

export async function getData(key) {
  const store = await load("store.json", { autoSave: false });
  const data = await store.get(key);
  return data;
}

export async function removeData(key) {
  const store = await load("store.json", { autoSave: false });
  await store.delete(key);
  await store.save();
}
