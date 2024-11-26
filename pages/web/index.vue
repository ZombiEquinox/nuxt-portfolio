<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from '@portabletext/vue';

const MAIN_WEB_QUERY = groq`*[_type == "web" && category->title == "Web Design and Development"]|order(company asc){_id, title, slug, category, mainImage}`;
const SECOND_WEB_QUERY = groq`*[_type == "web" && category->title == "Other Work"]|order(company desc){_id, title, technology, company, position, notes}`;
const EARLY_WEB_QUERY = groq`*[_type == "web" && category->title == "Early Work"]|order(company asc){_id, title, technology, company, position, url, body, notes}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(MAIN_WEB_QUERY);
const { data: additional } = await useSanityQuery<SanityDocument[]>(SECOND_WEB_QUERY);
const { data: early } = await useSanityQuery<SanityDocument[]>(EARLY_WEB_QUERY);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
    <main class="container mx-auto min-h-screen p-8">
      <section>
      <h1 class="text-4xl font-bold mb-8">Web Design and Development</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="post in posts" :key="post._id" class="hover:underline">
          
          <NuxtLink :to="`/web/${post.slug.current}`">
            <img :src="urlFor(post?.mainImage)?.width(550)?.height(310)?.url()" :alt="post?.title"
          class="aspect-video rounded-xl" width="550" height="310" />
            <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          </NuxtLink>
        </div>
      </div>
      </section>
      <section>
        <h2 class="text-2xl font-bold mt-8">Early Work</h2>
        <ul class="flex flex-col gap-4">
          <li v-for="post in early" :key="post._id">
              <p class="text-lg font-semibold">{{ post.title }}</p>
              <p>Technology: {{ post.technology }}</p>
              <p>Company: {{ post.company }}</p>
              <p>Position: {{ post.position }}</p>
              <p v-if="post.notes" class="text-xs italic">{{ post.notes }}</p>
              <p v-if="post.url">URL: <NuxtLink :to="post.url" external target="_blank" rel="noopener">{{ post.url }}</NuxtLink></p>
               <Accordion v-if="post.body" type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Additional Info</AccordionTrigger>
                  <AccordionContent>
                    <div class="prose">
      <PortableText :value="post.body" />
    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
          </li>
        </ul>
      </section>
      <section>
        <h2 class="text-2xl font-bold mt-8">Other Work</h2>
        <ul>
          <li v-for="post in additional" :key="post._id">
              <p class="text-lg font-semibold">{{ post.title }}</p>
              <p>Technology: {{ post.technology }}</p>
              <p>Company: {{ post.company }}</p>
              <p>Position: {{ post.position }}</p>
              <p v-if="post.notes" class="text-xs italic">{{ post.notes }}</p>
          </li>
        </ul>
      </section>
    </main>
</template>