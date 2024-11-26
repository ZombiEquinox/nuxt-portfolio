<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from '@portabletext/vue';

const POST_QUERY = groq`*[_type == "web" && slug.current == $slug][0]`;
const { params } = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, params);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
  <main v-if="post" class="container mx-auto min-h-screen p-8 flex flex-col gap-4">
    <div v-if="post.mainImage">
    <img :src="urlFor(post?.mainImage)?.width(550)?.height(310)?.url()" :alt="post?.title"
          class="aspect-video rounded-xl" width="550" height="310" />
    </div>
    <h1 v-if="post.title" class="text-4xl font-bold mb-8" v-text="post.title"></h1>
     <p>Company: {{ post.company }}</p>
     <p>Position: {{ post.position }}</p>
     <p>Technology: {{ post.technology }}</p>
     <p v-if="post.url">URL: <NuxtLink :to="post.url" external target="_blank" rel="noopener">{{ post.url }}</NuxtLink></p>
     <p v-if="post.notes">Notes: {{ post.notes }}</p>
    <div class="prose">
      <PortableText v-if="post.body" :value="post.body" />
    </div>
  </main>
</template>