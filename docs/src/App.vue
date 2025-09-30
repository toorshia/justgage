<template>
  <v-app>
    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="mobileDrawer"
      temporary
      location="left"
      width="280"
      class="d-md-none"
    >
      <v-list nav density="compact">
        <div class="d-flex align-center pa-4 mb-2">
          <v-img src="/logo.png" alt="JustGage Logo" max-width="40" class="mr-3"></v-img>
          <span class="text-h6 font-weight-bold text-primary">JustGage</span>
        </div>
        <v-divider class="mb-4" />
        <!-- Main Navigation -->
        <v-list-item
          to="/"
          prepend-icon="mdi-home"
          title="Home"
          @click="mobileDrawer = false"
          class="rounded-lg mb-1"
          color="primary"
        />
        <v-list-item
          to="/playground"
          prepend-icon="mdi-play-circle"
          title="Playground"
          @click="mobileDrawer = false"
          class="rounded-lg mb-1"
          color="primary"
        />
        <v-list-item
          to="/docs"
          prepend-icon="mdi-file-document"
          title="Documentation"
          @click="mobileDrawer = false"
          class="rounded-lg mb-1"
          color="primary"
        />

        <!-- Documentation Sections (only shown when on docs page) -->
        <template v-if="isDocsPage">
          <v-divider class="my-4" />
          <v-list-subheader class="text-primary font-weight-bold">Contents</v-list-subheader>
          <v-list-item
            v-for="section in docsSections"
            :key="section.id"
            :prepend-icon="section.icon"
            :title="section.title"
            @click="scrollToSection(section.id)"
            class="rounded-lg mb-1"
            color="primary"
          />
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" dark>
      <!-- Mobile Menu Button -->
      <v-btn icon="mdi-menu" variant="text" class="d-md-none mr-2" @click="mobileDrawer = true" />

      <v-toolbar-title>
        <router-link to="/" class="text-decoration-none text-white"> JustGage </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation Menu -->
      <div class="d-none d-md-flex">
        <v-btn to="/" text color="white"> Home </v-btn>
        <v-btn to="/playground" text color="white"> Playground </v-btn>
        <v-btn to="/docs" text color="white"> Documentation </v-btn>
      </div>

      <!-- GitHub Button (always visible) -->
      <v-btn
        href="https://github.com/toorshia/justgage"
        target="_blank"
        text
        color="white"
        prepend-icon="mdi-github"
        class="ml-2"
      >
        <span class="d-none d-sm-inline">GitHub</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const mobileDrawer = ref(false);
const route = useRoute();

const isDocsPage = computed(() => route.path === '/docs');

const docsSections = [
  { id: 'installation', title: 'Installation', icon: 'mdi-download' },
  { id: 'quickstart', title: 'Quick Start', icon: 'mdi-rocket-launch' },
  { id: 'configuration', title: 'Configuration', icon: 'mdi-cog' },
  { id: 'methods', title: 'Methods', icon: 'mdi-function' },
  { id: 'migration', title: 'Migration', icon: 'mdi-update' },
];

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  mobileDrawer.value = false;
};
</script>
