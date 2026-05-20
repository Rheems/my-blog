<template>
  <header class="navbar" role="banner">
    <div class="navbar__inner container">
      <RouterLink
        to="/"
        class="navbar__brand"
        aria-label="The Daily Read — Home"
      >
        The Daily<span class="navbar__brand-dot">.</span>Read
      </RouterLink>

      <nav class="navbar__nav" aria-label="Main navigation">
        <RouterLink
          to="/"
          class="navbar__link"
          :class="{ 'navbar__link--active': isHome }"
          exact-active-class="navbar__link--active"
        >
          Home
        </RouterLink>
        <span class="navbar__link navbar__link--static">Culture</span>
        <span class="navbar__link navbar__link--static">Science</span>
        <span class="navbar__link navbar__link--static">Politics</span>
      </nav>

      <div class="navbar__progress-wrap" aria-hidden="true">
        <div
          class="navbar__progress-bar"
          :style="{ width: scrollProgress + '%' }"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isHome = computed(() => route.path === "/");

const scrollProgress = ref(0);

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
}

onMounted(() => {
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
});

// Always clean up listeners — forgetting this causes memory leaks
onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollProgress);
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--navbar-height);
  background: rgba(13, 13, 13, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.navbar__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
  position: relative;
}

.navbar__brand {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.02em;
  white-space: nowrap;
  transition: opacity var(--transition-fast);
}
.navbar__brand:hover {
  opacity: 0.8;
}
.navbar__brand-dot {
  color: var(--color-accent);
}

.navbar__nav {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.navbar__link {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-2);
  transition: color var(--transition-fast);
  cursor: pointer;
  position: relative;
  padding-bottom: 2px;
}

/* Animated underline */
.navbar__link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-accent);
  transition: width var(--transition-base);
}
.navbar__link:hover {
  color: var(--color-white);
}
.navbar__link:hover::after,
.navbar__link--active::after {
  width: 100%;
}
.navbar__link--active {
  color: var(--color-white);
}
.navbar__link--static {
  cursor: default;
}
.navbar__link--static:hover {
  color: var(--color-text-2);
}
.navbar__link--static::after {
  display: none;
}

/* Reading progress bar */
.navbar__progress-wrap {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
}
.navbar__progress-bar {
  height: 100%;
  background: var(--color-accent);
  transition: width 100ms linear;
  max-width: 100%;
}

@media (max-width: 600px) {
  .navbar__link--static {
    display: none;
  }
}
</style>
