<script setup lang="ts">

const homeItems = ref([
  { title: 'Web Design and Development', href: '/web' },
  { title: 'Videography', href: '/video' },
  { title: 'Painting', href: '/painting' },
  { title: 'Drawing', href: '/drawing' },
  { title: 'Graphic Design', href: '/design' },
])

</script>

<template>
    <main class="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 class="text-4xl font-bold mb-8">Posts</h1>
      <ul class="flex flex-col gap-y-4">
        <li v-for="(item, key) in homeItems" :key="key">
          <nuxt-link :to="`${item.href}`">
            <h2 class="text-xl font-semibold">{{ item.title }}</h2>
          </nuxt-link>
        </li>
      </ul>
    </main>
</template>