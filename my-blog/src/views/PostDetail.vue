<template>
  <div class="detail">
    <div class="detail__inner container--prose">
      <nav class="detail__nav" aria-label="Page navigation">
        <button class="detail__back-btn" @click="goBack">
          <span aria-hidden="true">←</span>
          <span>{{ canGoBack ? "Previous page" : "All stories" }}</span>
        </button>
      </nav>

      <article v-if="post" class="detail__article">
        <div class="detail__meta">
          <span class="detail__tag">{{ category }}</span>
          <span class="detail__divider" aria-hidden="true">·</span>
          <time class="detail__date">{{ publishDate }}</time>
          <span class="detail__divider" aria-hidden="true">·</span>
          <span class="detail__read-time">{{ readTime }} min read</span>
        </div>

        <h1 class="detail__title">{{ formattedTitle }}</h1>

        <div class="detail__byline">
          <div class="detail__avatar" aria-hidden="true">
            {{ author.charAt(0) }}
          </div>
          <div class="detail__author-info">
            <span class="detail__author-name">{{ author }}</span>
            <span class="detail__author-role"
              >{{ category }} Correspondent</span
            >
          </div>
        </div>

        <div class="detail__rule" aria-hidden="true" />

        <div class="detail__body" role="article">
          <p
            v-for="(paragraph, i) in bodyParagraphs"
            :key="i"
            :class="{ 'detail__body-lead': i === 0 }"
          >
            {{ paragraph }}
          </p>
        </div>

        <div class="detail__tags" aria-label="Article tags">
          <span
            v-for="tag in articleTags"
            :key="tag"
            class="detail__tag-pill"
            >{{ tag }}</span
          >
        </div>
      </article>

      <section
        v-if="comments.length"
        class="detail__comments"
        aria-label="Reader responses"
      >
        <h2 class="detail__comments-title">
          Reader Responses
          <span class="detail__comments-count">({{ comments.length }})</span>
        </h2>
        <div class="detail__comments-list">
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="detail__comment"
          >
            <div class="detail__comment-avatar" aria-hidden="true">
              {{ comment.name.charAt(0).toUpperCase() }}
            </div>
            <div class="detail__comment-body">
              <div class="detail__comment-header">
                <span class="detail__comment-name">{{
                  comment.name.split(" ").slice(0, 3).join(" ")
                }}</span>
                <span class="detail__comment-email">{{ comment.email }}</span>
              </div>
              <p class="detail__comment-text">{{ comment.body }}</p>
            </div>
          </div>
        </div>
      </section>

      <div class="detail__bottom-nav">
        <button class="btn btn--outline" @click="goBack">
          ← {{ canGoBack ? "Go back" : "All stories" }}
        </button>
        <RouterLink to="/" class="btn btn--ghost">⌂ Home</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePost } from "@/composables/usePosts.js";

const route = useRoute();
const router = useRouter();
const { post, comments, fetchPost } = usePost();

onMounted(async () => {
  await fetchPost(route.params.id);
});

// history.length > 2 = user got here from within the app, not by typing URL
const canGoBack = computed(() => window.history.length > 2);
function goBack() {
  canGoBack.value ? router.back() : router.push("/");
}

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
  () => CATEGORIES[((post.value?.id ?? 1) - 1) % CATEGORIES.length],
);
const author = computed(
  () => AUTHORS[((post.value?.id ?? 1) - 1) % AUTHORS.length],
);
const formattedTitle = computed(() => {
  if (!post.value) return "";
  return post.value.title.charAt(0).toUpperCase() + post.value.title.slice(1);
});
const publishDate = computed(() => {
  const d = new Date();
  d.setDate(d.getDate() - ((post.value?.id ?? 1) % 30));
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
const bodyParagraphs = computed(() => {
  if (!post.value) return [];
  const base = post.value.body.split("\n").filter(Boolean);
  const generated = [
    `The implications of this development extend well beyond what initial reports suggested. Analysts tracking the situation say the reverberations will be felt across multiple sectors simultaneously.`,
    `"We have not seen anything quite like this in recent memory," said one senior official who requested anonymity. "The variables at play are more complex and interconnected than the public record indicates."`,
    `What is certain is that the debate will continue well into the coming season. Voices from across the political and cultural spectrum have weighed in, each arriving at starkly different conclusions.`,
    `Historically, comparable situations resolved through a combination of institutional negotiation and public pressure. Whether that pattern holds in the current climate remains to be seen.`,
    `For those directly affected, the human dimension remains paramount. Behind every data point are individuals navigating real uncertainty — a fact that can be lost when discourse rises to abstraction.`,
    `The coming weeks will be critical. Multiple parties have indicated they are prepared to take further action. We will continue to report as developments occur.`,
  ];
  return [...base, ...generated];
});
const readTime = computed(() =>
  Math.ceil(bodyParagraphs.value.join(" ").split(" ").length / 200),
);
const articleTags = computed(() => {
  const extras = ["Policy", "Society", "Investigation", "Feature", "Long Read"];
  return [
    category.value,
    "Analysis",
    extras[(post.value?.id ?? 1) % extras.length],
  ];
});
</script>

<style scoped>
.detail {
  padding: var(--space-8) 0 var(--space-16);
  min-height: calc(100vh - var(--navbar-height));
}
.detail__inner {
  padding-top: var(--space-8);
}

.detail__nav {
  margin-bottom: var(--space-8);
}
.detail__back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-2);
  background: transparent;
  border: 1px solid var(--color-border);
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: var(--font-body);
  transition: all var(--transition-fast);
}
.detail__back-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.detail__article {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}
.detail__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.detail__tag {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-bg);
  background: var(--color-accent);
  padding: 0.2rem 0.6rem;
}
.detail__date,
.detail__read-time {
  font-size: 0.78rem;
  color: var(--color-text-3);
}
.detail__divider {
  color: var(--color-border-2);
}

.detail__title {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--color-white);
}

.detail__byline {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}
.detail__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-accent);
  flex-shrink: 0;
}
.detail__author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.detail__author-name {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--color-white);
}
.detail__author-role {
  font-size: 0.72rem;
  color: var(--color-text-3);
}

.detail__rule {
  height: 1px;
  background: linear-gradient(
    to right,
    var(--color-accent),
    var(--color-border),
    transparent
  );
}

.detail__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.detail__body p {
  font-family: var(--font-display);
  font-size: 1.1rem;
  line-height: 1.85;
  color: var(--color-text);
  font-weight: 300;
}
/* Drop cap */
.detail__body-lead::first-letter {
  font-size: 4rem;
  font-weight: 700;
  line-height: 0.75;
  float: left;
  margin: 0.08em 0.1em 0 0;
  color: var(--color-accent);
}

.detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}
.detail__tag-pill {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-3);
  border: 1px solid var(--color-border);
  padding: 0.2rem 0.65rem;
  transition: all var(--transition-fast);
}
.detail__tag-pill:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.detail__comments {
  margin-top: var(--space-12);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
}
.detail__comments-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: var(--space-6);
}
.detail__comments-count {
  font-size: 0.9rem;
  color: var(--color-text-3);
  font-weight: 300;
}
.detail__comment {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5) 0;
  border-bottom: 1px solid var(--color-border);
}
.detail__comment-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-text-2);
  flex-shrink: 0;
}
.detail__comment-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.detail__comment-header {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.detail__comment-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-white);
}
.detail__comment-email {
  font-size: 0.72rem;
  color: var(--color-text-3);
}
.detail__comment-text {
  font-size: 0.88rem;
  color: var(--color-text-2);
  line-height: 1.65;
}

.detail__bottom-nav {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-top: var(--space-12);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
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
  border-color: var(--color-accent);
  color: var(--color-accent);
}
.btn--ghost {
  background: var(--color-surface);
  color: var(--color-text-2);
  border: 1px solid transparent;
}
.btn--ghost:hover {
  background: var(--color-surface-2);
  color: var(--color-white);
}
</style>
