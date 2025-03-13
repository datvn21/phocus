<script>
  // @ts-nocheck

  export let w = 1;
  export let h = 1;
</script>

<div class="grid-stack-item" gs-w={w} gs-h={h}>
  <div class="grid-stack-item-content"><slot></slot></div>
</div>
