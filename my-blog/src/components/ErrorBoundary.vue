<template>
  <div v-if="error" class="error-boundary" role="alert" aria-live="assertive">
    <div class="error-boundary__inner">
      <div class="error-boundary__icon" aria-hidden="true">⚡</div>
      <div class="error-boundary__content">
        <h2 class="error-boundary__title">Something went wrong</h2>
        <p class="error-boundary__message">{{ friendlyMessage }}</p>

        <!-- Stack trace only visible in dev mode -->
        <details v-if="isDev" class="error-boundary__details">
          <summary>Technical details</summary>
          <pre class="error-boundary__stack">{{
            error.stack || error.message
          }}</pre>
        </details>

        <div class="error-boundary__actions">
          <button class="btn btn--outline" @click="retry">↻ Try again</button>
          <RouterLink to="/" class="btn btn--primary" @click="retry"
            >← Back to Home</RouterLink
          >
        </div>
      </div>
    </div>
  </div>

  <slot v-else />
</template>

<script setup>
import { ref, computed, onErrorCaptured } from "vue";

const error = ref(null);
const isDev = import.meta.env.DEV;

const friendlyMessage = computed(() => {
  if (!error.value) return "";
  const msg = error.value.message?.toLowerCase() || "";
  if (msg.includes("fetch") || msg.includes("network"))
    return "Unable to connect to the server. Check your internet connection and try again.";
  if (msg.includes("not found") || msg.includes("404"))
    return "The content you requested could not be found.";
  return "An unexpected error occurred. Please try again.";
});

onErrorCaptured((err, instance, info) => {
  console.error("[ErrorBoundary] Caught:", err);
  console.error("[ErrorBoundary] Component:", instance);
  console.error("[ErrorBoundary] Info:", info);
  error.value = err;
  return false; // stop the error propagating any further up
});

function retry() {
  error.value = null;
}
</script>

<style scoped>
.error-boundary {
  min-height: calc(100vh - var(--navbar-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
}
.error-boundary__inner {
  max-width: 520px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}
.error-boundary__icon {
  font-size: 3rem;
}
.error-boundary__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}
.error-boundary__title {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--color-white);
}
.error-boundary__message {
  color: var(--color-text-2);
  font-size: 0.95rem;
  line-height: 1.7;
  max-width: 400px;
}
.error-boundary__details {
  width: 100%;
  text-align: left;
}
.error-boundary__details summary {
  font-size: 0.78rem;
  color: var(--color-text-3);
  cursor: pointer;
}
.error-boundary__stack {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: var(--space-4);
  font-size: 0.72rem;
  color: var(--color-text-2);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  margin-top: var(--space-2);
}
.error-boundary__actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--space-2);
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.6rem 1.4rem;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: var(--font-body);
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
}
.btn--outline {
  background: transparent;
  border: 1px solid var(--color-border-2);
  color: var(--color-text-2);
}
.btn--outline:hover {
  border-color: var(--color-text);
  color: var(--color-white);
}
.btn--primary {
  background: var(--color-accent);
  color: var(--color-bg);
  font-weight: 600;
}
.btn--primary:hover {
  background: var(--color-accent-2);
}
</style>
