<template>
  <RouterLink
    :to="`/post/${post.id}`"
    class="post-card"
    :class="{ 'post-card--featured': featured }"
  >
    <span class="post-card__num">№ {{ String(post.id).padStart(2, "0") }}</span>
    <span class="post-card__tag">{{ category }}</span>
    <h2 class="post-card__title">{{ formattedTitle }}</h2>
    <p class="post-card__excerpt">{{ excerpt }}</p>
    <div class="post-card__footer">
      <span class="post-card__author">{{ author }}</span>
      <span class="post-card__read-more" aria-hidden="true">Read →</span>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  post: { type: Object, required: true },
  featured: { type: Boolean, default: false },
});

const CATEGORIES = [
  "Culture",
  "Politics",
  "Science",
  "Tech",
  "Arts",
  "World",
  "Opinion",
  "Sports",
];
const AUTHORS = [
  "E. Whitmore",
  "J. Calloway",
  "S. Park",
  "M. Osei",
  "A. Reyes",
  "T. Novak",
  "C. Dumont",
  "L. Chen",
];

const category = computed(
  () => CATEGORIES[(props.post.id - 1) % CATEGORIES.length],
);
const author = computed(() => AUTHORS[(props.post.id - 1) % AUTHORS.length]);
const formattedTitle = computed(() => {
  const t = props.post.title;
  return t.charAt(0).toUpperCase() + t.slice(1);
});
const excerpt = computed(() => {
  const body = props.post.body.split("\n")[0];
  return body.length > 120 ? body.slice(0, 120) + "…" : body;
});
</script>

<style scoped>
.post-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  background: var(--color-bg);
  position: relative;
  transition: background var(--transition-fast);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

/* Accent left border reveals on hover */
.post-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-accent);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform var(--transition-base);
}
.post-card:hover {
  background: var(--color-surface);
}
.post-card:hover::before {
  transform: scaleY(1);
}

/* Featured: first card spans two columns */
.post-card--featured {
  grid-column: span 2;
  background: var(--color-surface);
}
.post-card--featured .post-card__title {
  font-size: 1.5rem;
}

.post-card__num {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--color-accent);
}
.post-card__tag {
  display: inline-block;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-3);
  border: 1px solid var(--color-border);
  padding: 0.15rem 0.5rem;
  align-self: flex-start;
  transition:
    border-color var(--transition-fast),
    color var(--transition-fast);
}
.post-card:hover .post-card__tag {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.post-card__title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-white);
  flex: 1;
  transition: color var(--transition-fast);
}
.post-card:hover .post-card__title {
  color: var(--color-accent);
}

.post-card__excerpt {
  font-size: 0.85rem;
  color: var(--color-text-2);
  line-height: 1.65;
}

.post-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-2);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
}
.post-card__author {
  font-size: 0.72rem;
  color: var(--color-text-3);
}
.post-card__read-more {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  transition: letter-spacing var(--transition-base);
}
.post-card:hover .post-card__read-more {
  letter-spacing: 0.16em;
}

@media (max-width: 700px) {
  .post-card--featured {
    grid-column: span 1;
  }
}
</style>
