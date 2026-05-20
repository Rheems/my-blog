<template>
  <div
    class="skeleton"
    aria-label="Loading content"
    aria-busy="true"
    role="status"
  >
    <div class="skeleton__hero">
      <div class="skeleton__bar skeleton__bar--sm" style="width: 180px" />
      <div
        class="skeleton__bar skeleton__bar--xl"
        style="width: min(480px, 80vw)"
      />
      <div class="skeleton__bar skeleton__bar--sm" style="width: 260px" />
    </div>

    <div class="skeleton__body container">
      <div class="skeleton__label" />
      <div class="skeleton__grid">
        <div
          v-for="i in 9"
          :key="i"
          class="skeleton__card"
          :style="{ animationDelay: `${i * 60}ms` }"
        >
          <div class="skeleton__bar skeleton__bar--xs" style="width: 55px" />
          <div class="skeleton__bar skeleton__bar--md" style="width: 100%" />
          <div class="skeleton__bar skeleton__bar--sm" style="width: 90%" />
          <div class="skeleton__bar skeleton__bar--sm" style="width: 70%" />
          <div class="skeleton__card-footer">
            <div class="skeleton__bar skeleton__bar--xs" style="width: 80px" />
            <div class="skeleton__bar skeleton__bar--xs" style="width: 60px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Pure presentational — no logic needed
</script>

<style scoped>
@keyframes shimmer {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 0.7;
  }
}

.skeleton {
  min-height: calc(100vh - var(--navbar-height));
}
.skeleton__hero {
  background: var(--color-surface);
  padding: var(--space-16) var(--space-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}
.skeleton__body {
  padding: var(--space-12) 0;
}
.skeleton__label {
  width: 140px;
  height: 10px;
  background: var(--color-border);
  border-radius: 2px;
  margin-bottom: var(--space-6);
  animation: shimmer 1.6s ease-in-out infinite;
}
.skeleton__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1px;
  background: var(--color-border);
  border: 1px solid var(--color-border);
}
.skeleton__card {
  background: var(--color-bg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  animation: shimmer 1.6s ease-in-out infinite;
}
.skeleton__card-footer {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-2);
}
.skeleton__bar {
  background: var(--color-surface-2);
  border-radius: 2px;
  animation: shimmer 1.6s ease-in-out infinite;
  flex-shrink: 0;
}
.skeleton__bar--xs {
  height: 10px;
}
.skeleton__bar--sm {
  height: 14px;
}
.skeleton__bar--md {
  height: 20px;
}
.skeleton__bar--xl {
  height: 48px;
}
</style>
