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

    <!-- Live Gauges Section -->
    <v-row class="py-16">
      <v-col cols="12">
        <h2 class="text-h3 text-center font-weight-bold mb-12">Live Examples</h2>
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-4" style="min-height: 260px">
              <div class="text-subtitle-1 text-center mb-2">Default Gauge</div>
              <div ref="g1El" style="height: 220px"></div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-4" style="min-height: 260px">
              <div class="text-subtitle-1 text-center mb-2">Donut Gauge</div>
              <div ref="g2El" style="height: 220px"></div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-4" style="min-height: 260px">
              <div class="text-subtitle-1 text-center mb-2">Custom Sectors + Pointer</div>
              <div ref="g3El" style="height: 220px"></div>
            </v-card>
          </v-col>
        </v-row>
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { JustGage } from 'justgage';

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

// Gauge element refs
const g1El = ref<HTMLElement | null>(null);
const g2El = ref<HTMLElement | null>(null);
const g3El = ref<HTMLElement | null>(null);

// Gauge instances
let g1: any, g2: any, g3: any;
let timer: any;

onMounted(() => {
  // Default gauge
  g1 = new JustGage({
    parentNode: g1El.value!,
    value: 62,
    min: 0,
    max: 100,
    title: 'CPU Load',
    titlePosition: 'above',
    relativeGaugeSize: true,
    gaugeWidthScale: 1,
    valueFontColor: '#111',
    gaugeColor: '#e6e6e6',
    levelColors: ['#a9d70b', '#f9c802', '#ff0000'],
    noGradient: true,
  });

  // Donut gauge (slightly smaller)
  g2 = new JustGage({
    parentNode: g2El.value!,
    value: 45,
    min: 0,
    max: 100,
    title: 'Storage',
    titlePosition: 'above',
    donut: true,
    relativeGaugeSize: true,
    gaugeWidthScale: 0.85,
    gaugeColor: '#e6e6e6',
    levelColors: ['#00bcd4', '#2196f3', '#3f51b5'],
    noGradient: true,
  });

  // Custom sectors + pointer
  g3 = new JustGage({
    parentNode: g3El.value!,
    value: 78,
    min: 0,
    max: 100,
    title: 'Throughput',
    titlePosition: 'above',
    relativeGaugeSize: true,
    showSectorColors: true,
    customSectors: {
      percents: false,
      ranges: [
        { lo: 0, hi: 30, color: '#ff3b30' },
        { lo: 30, hi: 60, color: '#ffcc00' },
        { lo: 60, hi: 85, color: '#34c759' },
        { lo: 85, hi: 100, color: '#0b66ff' },
      ],
    },
    pointer: true,
    pointerOptions: {
      toplength: 0.9,
      bottomlength: 0.05,
      bottomwidth: 6,
      color: '#333',
    },
    noGradient: true,
  });

  // Random refresh loop
  const rand = () => Math.round(Math.random() * 100);
  timer = setInterval(() => {
    g1?.refresh(rand());
    g2?.refresh(rand());
    g3?.refresh(rand());
  }, 2000);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
  try {
    g1?.destroy();
  } catch {}
  try {
    g2?.destroy();
  } catch {}
  try {
    g3?.destroy();
  } catch {}
});
</script>
