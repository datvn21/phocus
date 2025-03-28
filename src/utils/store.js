import { load } from "@tauri-apps/plugin-store";
// when using `"withGlobalTauri": true`, you may use
// const { load } = window.__TAURI__.store;

// Create a new store or load the existing one,
// note that the options will be ignored if a `Store` with that path has already been created
const store = await load("store.json", { autoSave: false });

// Hàm lưu dữ liệu
export async function setData(key, value) {
  await store.set(key, value);
  await store.save(); // Lưu vào file
}

// Hàm lấy dữ liệu
export async function getData(key) {
  return await store.get(key);
}

// Hàm xóa dữ liệu
export async function removeData(key) {
  await store.delete(key);
  await store.save();
}
