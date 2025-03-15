// @ts-nocheck
import { writable } from "svelte/store";

const createAlertStore = () => {
  const { subscribe, update, set } = writable([]);

  return {
    subscribe,
    // @ts-ignore
    addAlert: (message) =>
      update((messages) => {
        const newMessages = [...messages, message];
        showAlert.set(newMessages.length > 0);
        return newMessages;
      }),
    removeAlert: (index) =>
      update((messages) => {
        messages.splice(index, 1);
        showAlert.set(messages.length > 0);
        return messages;
      }),
    clearAlerts: () => {
      set([]);
      showAlert.set(false);
    },
  };
};

export const alertMessages = createAlertStore();
export const showAlert = writable(false);
