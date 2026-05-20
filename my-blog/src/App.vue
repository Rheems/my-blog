<template>
  <!--
    App.vue — Root Component

    This is the top-level component Vue mounts.
    It wraps everything and provides the persistent layout shell.

    ARCHITECTURE:
      <Navbar>          — always visible, outside the route transition
      <ErrorBoundary>   — catches any error thrown by a child (view or component)
        <Suspense>      — shows <SkeletonLoader> while async components load
          <Transition>  — animates route changes (page-enter / page-leave)
            <RouterView>— renders whichever view matches the current URL
  -->

  <div id="app-shell">
    <Navbar />

    <main class="main-content" role="main">
      <ErrorBoundary>
        <!--
          <Suspense> is a built-in Vue component that works with async setup().
          It has two slots:
            #default  — what to show when ready
            #fallback — what to show while waiting (async components resolving)
        -->
        <Suspense>
          <template #default>
            <!--
              RouterView renders the component matched by the current route.
              v-slot gives us access to the matched Component so we can
              wrap it in a <Transition>.
            -->
            <RouterView v-slot="{ Component, route }">
              <!--
                mode="out-in":
                  1. Current page plays its leave animation
                  2. THEN new page plays its enter animation
                  Never shows two pages simultaneously.

                :key="route.path" forces Vue to treat each route as a
                completely new component instance, so the animation
                always fires even when navigating between two PostDetail pages.
              -->
              <Transition name="page" mode="out-in">
                <component :is="Component" :key="route.path" />
              </Transition>
            </RouterView>
          </template>

          <!-- Shown while the lazy-loaded route component chunk is downloading -->
          <template #fallback>
            <PageSkeleton />
          </template>
        </Suspense>
      </ErrorBoundary>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
/**
 * <script setup> is Vue 3's Composition API sugar.
 * Everything declared here is automatically available in the template.
 * No need to return anything — Vue handles that automatically.
 */
import Navbar from "@/components/Navbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import ErrorBoundary from "@/components/ErrorBoundary.vue";
import PageSkeleton from "@/components/PageSkeleton.vue";
</script>

<style scoped>
/**
 * <style scoped> means these styles ONLY apply to this component.
 * Vue adds a unique data attribute (e.g. data-v-3f9d2a) to all
 * elements in this component and scopes the CSS to match.
 */
#app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  /* Offset for the fixed navbar */
  padding-top: var(--navbar-height);
}
</style>
