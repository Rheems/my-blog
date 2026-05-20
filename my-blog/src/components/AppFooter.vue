<template>
  <footer class="footer" role="contentinfo">
    <div class="footer__inner container">
      <span class="footer__brand">
        The Daily<span class="footer__dot">.</span>Read
      </span>
      <span class="footer__copy"
        >Built with Vue 3 + Vue Router · JSONPlaceholder API</span
      >
      <span class="footer__year">© {{ year }}</span>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: var(--space-6) 0;
  margin-top: auto;
}
.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
}
.footer__brand {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-white);
}
.footer__dot {
  color: var(--color-accent);
}
.footer__copy,
.footer__year {
  font-size: 0.75rem;
  color: var(--color-text-3);
  letter-spacing: 0.04em;
}
</style>
