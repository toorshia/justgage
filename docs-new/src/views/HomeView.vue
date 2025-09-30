<template>
  <v-container fluid>
    <!-- Hero Section -->
    <v-row class="py-16">
      <v-col cols="12" class="text-center">
        <v-img src="/logo.png" alt="JustGage Logo" max-width="120" class="mx-auto mb-6"></v-img>
        <h1 class="text-h2 font-weight-bold mb-4">JustGage</h1>
        <p class="text-h5 text-grey-darken-1 mb-8 mx-auto" style="max-width: 600px">
          Modern ES6+ JavaScript library for creating animated dashboard gauges using native SVG
          APIs. Zero dependencies, resolution independent, and self-adjusting.
        </p>
        <div class="d-flex justify-center flex-wrap ga-4">
          <v-btn to="/playground" color="primary" size="large" prepend-icon="mdi-play">
            Try Playground
          </v-btn>
          <v-btn to="/docs" variant="outlined" color="primary" size="large" prepend-icon="mdi-book">
            Documentation
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Features Section -->
    <v-row class="py-16">
      <v-col cols="12">
        <h2 class="text-h3 text-center font-weight-bold mb-12">Why Choose JustGage?</h2>
        <v-row>
          <v-col v-for="feature in features" :key="feature.title" cols="12" md="4" class="d-flex">
            <v-card class="flex-grow-1 pa-6 text-center">
              <v-icon :icon="feature.icon" size="48" color="primary" class="mb-4"></v-icon>
              <h3 class="text-h5 font-weight-bold mb-3">{{ feature.title }}</h3>
              <p class="text-body-1">{{ feature.description }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Quick Start Section -->
    <v-row class="py-16">
      <v-col cols="12">
        <h2 class="text-h3 text-center font-weight-bold mb-12">Quick Start</h2>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="pa-6">
              <h3 class="text-h5 font-weight-bold mb-4">Installation</h3>
              <v-tabs v-model="installTab" class="mb-4">
                <v-tab value="npm">NPM</v-tab>
                <v-tab value="cdn">CDN</v-tab>
              </v-tabs>
              <v-window v-model="installTab">
                <v-window-item value="npm">
                  <pre
                    class="d-block pa-3 bg-grey-darken-4 text-green-accent-2 overflow-x-auto text-caption"
                    style="border-radius: 4px; margin: 0"
                  >
npm install justgage</pre
                  >
                </v-window-item>
                <v-window-item value="cdn">
                  <pre
                    class="d-block pa-3 bg-grey-darken-4 text-green-accent-2 overflow-x-auto text-caption"
                    style="border-radius: 4px; margin: 0"
                  >
&lt;script src="https://unpkg.com/justgage"&gt;&lt;/script&gt;</pre
                  >
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="pa-6">
              <h3 class="text-h5 font-weight-bold mb-4">Basic Usage</h3>
              <pre
                class="d-block pa-3 bg-grey-darken-4 text-green-accent-2 overflow-x-auto text-caption"
                style="border-radius: 4px"
              >
import JustGage from 'justgage';

const gauge = new JustGage({
  id: 'gauge',
  value: 67,
  min: 0,
  max: 100,
  title: 'Target'
});</pre
              >
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Call to Action -->
    <v-row class="py-16 text-center">
      <v-col cols="12">
        <h2 class="text-h3 font-weight-bold mb-6">Ready to Get Started?</h2>
        <p class="text-h6 text-grey-darken-1 mb-8 mx-auto" style="max-width: 500px">
          Explore our interactive playground or dive into the comprehensive documentation.
        </p>
        <div class="d-flex justify-center flex-wrap ga-4">
          <v-btn to="/playground" color="primary" size="large" prepend-icon="mdi-play-circle">
            Interactive Playground
          </v-btn>
          <v-btn
            href="https://github.com/toorshia/justgage"
            target="_blank"
            variant="outlined"
            size="large"
            prepend-icon="mdi-github"
          >
            View on GitHub
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const installTab = ref('npm');

const features = [
  {
    title: 'Zero Dependencies',
    description: 'Built with native SVG APIs. No external libraries required.',
    icon: 'mdi-flash',
  },
  {
    title: 'Modern ES6+',
    description: 'Built with modern JavaScript. Supports ESM, CJS, and UMD formats.',
    icon: 'mdi-heart',
  },
  {
    title: 'Highly Customizable',
    description: 'Extensive configuration options for colors, animations, and styling.',
    icon: 'mdi-tune',
  },
  {
    title: 'Responsive Design',
    description: 'Scales perfectly across all devices and screen sizes.',
    icon: 'mdi-responsive',
  },
  {
    title: 'High Performance',
    description: 'Optimized for smooth animations and minimal resource usage.',
    icon: 'mdi-speedometer',
  },
  {
    title: 'Battle Tested',
    description: 'Used by thousands of developers in production applications.',
    icon: 'mdi-shield-check',
  },
];
</script>
