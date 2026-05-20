<template>
  <div class="home">
    <section class="home__hero" aria-label="Publication header">
      <div class="home__hero-eyebrow">{{ todayFormatted }}</div>
      <h1 class="home__hero-title">The Daily Read</h1>
      <p class="home__hero-tagline">
        Curated perspectives on the world that matters
      </p>
      <div class="home__hero-rule" aria-hidden="true">
        <span /><span class="home__hero-rule-diamond">◆</span><span />
      </div>
    </section>

    <section class="home__posts container" aria-label="Blog posts">
      <div class="home__section-header">
        <span class="home__section-label">Latest Stories</span>
        <span v-if="!loading" class="home__post-count"
          >{{ posts.length }} articles</span
        >
      </div>

      <!-- Skeleton while fetching -->
      <div v-if="loading" class="home__grid" aria-busy="true">
        <div
          v-for="i in 9"
          :key="i"
          class="home__skeleton-card"
          :style="{ animationDelay: `${i * 50}ms` }"
          aria-hidden="true"
        >
          <div class="home__skeleton-bar" style="width: 50px; height: 10px" />
          <div class="home__skeleton-bar" style="width: 100%; height: 20px" />
          <div class="home__skeleton-bar" style="width: 85%; height: 14px" />
          <div class="home__skeleton-bar" style="width: 70%; height: 14px" />
        </div>
      </div>

      <!-- Cards animate in with stagger via TransitionGroup -->
      <TransitionGroup v-else name="cards" tag="div" class="home__grid">
        <PostCard
          v-for="(post, index) in posts"
          :key="post.id"
          :post="post"
          :featured="index === 0"
          :style="{ '--card-index': index }"
        />
      </TransitionGroup>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import PostCard from "@/components/PostCard.vue";
import { usePosts } from "@/composables/usePosts.js";

const { posts, loading, fetchPosts } = usePosts();

onMounted(async () => {
  await fetchPosts();
});

const todayFormatted = computed(() =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
);
</script>

<style scoped>
.home__hero {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-16) var(--space-8) var(--space-12);
  text-align: center;
  position: relative;
  overflow: hidden;
}
/* Grid texture overlay */
.home__hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.15;
  pointer-events: none;
}
.home__hero-eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
  font-weight: 500;
  margin-bottom: var(--space-4);
  position: relative;
}
.home__hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: var(--space-4);
  position: relative;
}
.home__hero-tagline {
  font-size: 1rem;
  color: var(--color-text-2);
  font-weight: 300;
  position: relative;
}
.home__hero-rule {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  max-width: 280px;
  margin: var(--space-8) auto 0;
  position: relative;
}
.home__hero-rule span:not(.home__hero-rule-diamond) {
  flex: 1;
  height: 1px;
  background: var(--color-border-2);
}
.home__hero-rule-diamond {
  font-size: 0.6rem;
  color: var(--color-accent);
}

.home__posts {
  padding-top: var(--space-12);
  padding-bottom: var(--space-16);
}
.home__section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}
.home__section-label {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-3);
  font-weight: 500;
}
.home__post-count {
  font-size: 0.72rem;
  color: var(--color-text-3);
}

.home__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1px;
  background: var(--color-border);
  border: 1px solid var(--color-border);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}
.home__skeleton-card {
  background: var(--color-bg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  animation: pulse 1.6s ease-in-out infinite;
}
.home__skeleton-bar {
  background: var(--color-surface-2);
  border-radius: 2px;
  flex-shrink: 0;
}

/* TransitionGroup stagger */
.cards-enter-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
  transition-delay: calc(var(--card-index, 0) * 30ms);
}
.cards-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

@media (max-width: 640px) {
  .home__hero {
    padding: var(--space-12) var(--space-6) var(--space-8);
  }
  .home__grid {
    grid-template-columns: 1fr;
  }
}
</style>
