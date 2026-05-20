<template>
  <div class="notfound" role="main" aria-label="Page not found">
    <!-- Giant decorative 404 sits behind the content -->
    <div class="notfound__number" aria-hidden="true">404</div>

    <div class="notfound__content">
      <div class="notfound__rule" aria-hidden="true" />
      <h1 class="notfound__title">Page not found</h1>
      <p class="notfound__message">
        The story you're looking for seems to have gone to print — or perhaps it
        never existed. Double-check the URL and try again.
      </p>

      <!-- Shows the URL they actually tried -->
      <div
        v-if="attemptedPath"
        class="notfound__path"
        aria-label="Attempted URL"
      >
        <span class="notfound__path-label">You tried:</span>
        <code class="notfound__path-value">{{ attemptedPath }}</code>
      </div>

      <div class="notfound__actions">
        <RouterLink to="/" class="btn btn--primary"
          >← Return to Front Page</RouterLink
        >
        <button class="btn btn--outline" @click="goBack">Go back</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// pathMatch is an array when the catch-all /:pathMatch(.*)*  fires
const attemptedPath = computed(() => {
  const match = route.params.pathMatch;
  if (!match) return null;
  return "/" + (Array.isArray(match) ? match.join("/") : match);
});

function goBack() {
  window.history.length > 2 ? router.back() : router.push("/");
}
</script>

<style scoped>
.notfound {
  min-height: calc(100vh - var(--navbar-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Outlined ghost number — sits behind content */
.notfound__number {
  font-family: var(--font-display);
  font-size: clamp(8rem, 22vw, 18rem);
  font-weight: 700;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px var(--color-border);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.notfound__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
  max-width: 480px;
}

.notfound__rule {
  width: 48px;
  height: 3px;
  background: var(--color-accent);
}
.notfound__title {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 600;
  color: var(--color-white);
}
.notfound__message {
  font-size: 0.95rem;
  color: var(--color-text-2);
  line-height: 1.7;
}

.notfound__path {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: var(--space-2) var(--space-4);
  flex-wrap: wrap;
  justify-content: center;
}
.notfound__path-label {
  font-size: 0.72rem;
  color: var(--color-text-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.notfound__path-value {
  font-family: "Courier New", monospace;
  font-size: 0.82rem;
  color: var(--color-accent);
  word-break: break-all;
}

.notfound__actions {
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
  padding: 0.65rem 1.5rem;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: var(--font-body);
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
}
.btn--primary {
  background: var(--color-accent);
  color: var(--color-bg);
  font-weight: 600;
}
.btn--primary:hover {
  background: var(--color-accent-2);
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
</style>
