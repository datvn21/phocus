<script>
  // @ts-nocheck

  import { Alert, Button } from "flowbite-svelte";
  import { fly } from "svelte/transition";
  import { alertMessages, showAlert } from "../utils/alertStore"; // Change to alertMessages
  import { onDestroy } from "svelte";

  let messages = [];
  let visible = false;

  const unsubscribeMessages = alertMessages.subscribe((value) => {
    messages = value;
    if (messages.length > 0) {
      showAlert.set(true);
      messages.forEach((_, index) => {
        setTimeout(() => close(index), 5000);
      });
    }
  });

  const unsubscribeVisible = showAlert.subscribe((value) => {
    visible = value;
  });

  onDestroy(() => {
    unsubscribeMessages();
    unsubscribeVisible();
  });

  function close(index) {
    messages.splice(index, 1);
    alertMessages.set(messages);
    if (messages.length === 0) {
      showAlert.set(false);
    }
  }
</script>

<div class="fixed bottom-4 right-4 flex flex-col gap-4">
  {#if visible}
    {#each messages as message, index}
      <Alert
        class="group w-48 flex flex-col gap-4"
        color="dark"
        transition={fly}
        dismissable
      >
        <div class="flex flex-col gap-2">
          <h1 class="text-lg font-bold">{message.title}</h1>
          <span>{message.content}</span>
        </div>
        <Button
          slot="close-button"
          size="xs"
          let:close
          on:click={() => close(index)}
          class="ms-auto">Dismiss</Button
        >
      </Alert>
    {/each}
  {/if}
</div>
