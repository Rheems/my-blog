import { ref } from "vue";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Lives OUTSIDE the function — persists across all component instances
const cache = new Map();

async function fetchWithCache(url) {
  if (cache.has(url)) return cache.get(url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  cache.set(url, data);
  return data;
}

// ── Fetch all posts ──────────────────────────────────────────
export function usePosts() {
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchPosts() {
    loading.value = true;
    error.value = null;
    try {
      posts.value = await fetchWithCache(`${BASE_URL}/posts`);
    } catch (err) {
      error.value = err;
      throw err; // re-throw so ErrorBoundary can catch it too
    } finally {
      loading.value = false; // always runs, success or failure
    }
  }

  return { posts, loading, error, fetchPosts };
}

// ── Fetch single post + comments ─────────────────────────────
export function usePost() {
  const post = ref(null);
  const comments = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchPost(id) {
    loading.value = true;
    error.value = null;
    post.value = null;
    comments.value = [];

    try {
      // Parallel fetch — faster than two sequential awaits
      const [postData, commentsData] = await Promise.all([
        fetchWithCache(`${BASE_URL}/posts/${id}`),
        fetchWithCache(`${BASE_URL}/posts/${id}/comments`),
      ]);
      post.value = postData;
      comments.value = commentsData.slice(0, 3);
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return { post, comments, loading, error, fetchPost };
}
