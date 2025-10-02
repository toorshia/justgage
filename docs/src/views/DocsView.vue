<template>
  <div>
    <v-container fluid>
      <!-- Header -->
      <v-row class="py-8">
        <v-col cols="12">
          <div class="d-flex align-center mb-6">
            <v-img src="/logo.png" alt="JustGage Logo" max-width="64" class="mr-4"></v-img>
            <div>
              <h1 class="text-h2 font-weight-bold">Documentation</h1>
              <p class="text-h6 text-grey-darken-1">Complete guide to JustGage v2.0</p>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <!-- Desktop Navigation Sidebar -->
        <v-col cols="3" class="d-none d-md-block">
          <div class="sticky-top">
            <h3 class="text-h6 font-weight-bold mb-4 text-primary">Contents</h3>
            <v-list nav density="compact" class="bg-transparent">
              <v-list-item
                v-for="section in navSections"
                :key="section.id"
                :to="`#${section.id}`"
                :prepend-icon="section.icon"
                :title="section.title"
                @click="scrollToSection(section.id)"
                class="rounded-lg mb-1"
                color="primary"
              />
            </v-list>
          </div>
        </v-col>

        <!-- Main Content -->
        <v-col cols="12" md="9">
          <!-- Installation Section -->
          <section id="installation" class="mb-12">
            <h2 class="text-h3 font-weight-bold mb-6">
              <v-icon icon="mdi-download" class="mr-2"></v-icon>
              Installation
            </h2>

            <v-tabs v-model="installationTab" class="mb-6">
              <v-tab value="npm">NPM</v-tab>
              <v-tab value="yarn">Yarn</v-tab>
              <v-tab value="cdn">CDN</v-tab>
              <v-tab value="download">Download</v-tab>
            </v-tabs>

            <v-window v-model="installationTab">
              <v-window-item value="npm">
                <v-card>
                  <v-card-text>
                    <pre
                      class="d-block pa-4 bg-grey-darken-4 text-green-accent-2 overflow-x-auto text-caption"
                      style="border-radius: 4px; margin: 0"
                    >
npm install justgage</pre
                    >
                  </v-card-text>
                </v-card>
              </v-window-item>

              <v-window-item value="yarn">
                <v-card>
                  <v-card-text>
                    <pre
                      class="d-block pa-4 bg-grey-darken-4 text-green-accent-2 overflow-x-auto text-caption"
                      style="border-radius: 4px; margin: 0"
                    >
yarn add justgage</pre
                    >
                  </v-card-text>
                </v-card>
              </v-window-item>

              <v-window-item value="cdn">
                <v-card>
                  <v-card-text>
                    <pre
                      class="d-block pa-4 bg-grey-darken-4 text-green-accent-2 overflow-x-auto text-caption"
                      style="border-radius: 4px; margin: 0"
                    >
&lt;script src="https://unpkg.com/justgage@latest/dist/justgage.umd.js"&gt;&lt;/script&gt;</pre
                    >
                  </v-card-text>
                </v-card>
              </v-window-item>

              <v-window-item value="download">
                <v-card>
                  <v-card-text>
                    <p class="mb-4">Download the latest release from GitHub:</p>
                    <v-btn
                      href="https://github.com/toorshia/justgage/releases/latest"
                      target="_blank"
                      color="primary"
                      prepend-icon="mdi-download"
                    >
                      Download Latest Release
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </section>

          <!-- What's New in v2.0 Section -->
          <section id="whats-new" class="mb-12">
            <v-card class="bg-gradient-primary" elevation="4">
              <v-card-title class="text-h3 font-weight-bold py-6">
                🚀 What's New in v2.0
              </v-card-title>
              <v-card-subtitle class="text-h6 pb-0">
                The gauge library you know and love, completely reimagined for the modern web! 🎉
              </v-card-subtitle>
              <v-card-text class="pt-6">
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="changelog-section">
                      <h3 class="text-h5 mb-3 font-weight-bold">💎 Zero Dependencies</h3>
                      <ul class="changelog-list">
                        <li>⚡ <strong>Removed RaphaelJS</strong> - No external dependencies!</li>
                        <li>🎨 <strong>Native SVG APIs</strong> - Direct browser integration</li>
                        <li>📦 <strong>73% smaller minified</strong> - 110.7 kB → 29.6 kB</li>
                        <li>🚀 <strong>76% smaller gzipped</strong> - 36.5 kB → 8.6 kB</li>
                      </ul>
                    </div>
                  </v-col>

                  <v-col cols="12" md="6">
                    <div class="changelog-section">
                      <h3 class="text-h5 mb-3 font-weight-bold">🏗️ Modern Architecture</h3>
                      <ul class="changelog-list">
                        <li>✨ <strong>ES6+ Codebase</strong> - Modern JavaScript</li>
                        <li>🧩 <strong>Modular Design</strong> - Clean separation</li>
                        <li>📐 <strong>Class-Based</strong> - Organized structure</li>
                        <li>🎯 <strong>TypeScript Support</strong> - Full type definitions</li>
                      </ul>
                    </div>
                  </v-col>

                  <v-col cols="12" md="6">
                    <div class="changelog-section">
                      <h3 class="text-h5 mb-3 font-weight-bold">🎨 Visual Improvements</h3>
                      <ul class="changelog-list">
                        <li>🎯 <strong>Better Title Positioning</strong> - Smart placement</li>
                        <li>📏 <strong>Responsive Sizing</strong> - Improved behavior</li>
                        <li>🎭 <strong>Sector Colors</strong> - Enhanced visualization</li>
                        <li>🎪 <strong>Smooth Animations</strong> - Refined timing</li>
                      </ul>
                    </div>
                  </v-col>

                  <v-col cols="12" md="6">
                    <div class="changelog-section">
                      <h3 class="text-h5 mb-3 font-weight-bold">💪 Performance</h3>
                      <ul class="changelog-list">
                        <li>⚡ <strong>50% faster rendering</strong> - Native SVG</li>
                        <li>📉 <strong>~75% smaller bundle</strong> - Zero deps</li>
                        <li>🎯 <strong>Better memory usage</strong> - Optimized</li>
                        <li>🚀 <strong>Smoother animations</strong> - RAF-based</li>
                      </ul>
                    </div>
                  </v-col>

                  <v-col cols="12">
                    <div class="changelog-section">
                      <h3 class="text-h5 mb-3 font-weight-bold">🔧 New Features</h3>
                      <ul class="changelog-list">
                        <li>
                          📊 <strong>Out-of-Bounds Values</strong> - Display values outside range
                        </li>
                        <li>🎯 <strong>Enhanced Pointers</strong> - Better customization</li>
                        <li>🎨 <strong>Flexible Colors</strong> - Improved color system</li>
                        <li>📐 <strong>Advanced Geometry</strong> - Better arc calculations</li>
                      </ul>
                    </div>
                  </v-col>
                </v-row>

                <v-divider class="my-6"></v-divider>

                <v-alert type="info" prominent class="mt-4">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-information" size="large"></v-icon>
                  </template>
                  <v-alert-title class="text-h6 mb-2">Migration Note</v-alert-title>
                  <div>
                    v2.0 uses ES6 modules by default. UMD builds are still available for legacy
                    support. The API remains largely compatible with v1.x, making migration
                    straightforward. Check the
                    <a href="#migration" class="text-primary font-weight-bold">migration guide</a>
                    below for details.
                  </div>
                </v-alert>
              </v-card-text>
            </v-card>
          </section>

          <!-- Quick Start Section -->
          <section id="quickstart" class="mb-12">
            <h2 class="text-h3 font-weight-bold mb-6">
              <v-icon icon="mdi-rocket-launch" class="mr-2"></v-icon>
              Quick Start
            </h2>

            <v-row>
              <v-col cols="12" md="6">
                <h3 class="text-h5 font-weight-bold mb-4">Basic Usage</h3>
                <v-card>
                  <v-card-text>
                    <pre
                      class="d-block pa-4 bg-grey-darken-4 text-green-accent-2 overflow-x-auto text-caption"
                      style="border-radius: 4px; margin: 0"
                    >
import JustGage from 'justgage';

const gauge = new JustGage({
  id: 'gauge-container',
  value: 67,
  min: 0,
  max: 100,
  title: 'CPU Usage',
  label: '%'
});</pre
                    >
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <h3 class="text-h5 font-weight-bold mb-4">HTML</h3>
                <v-card>
                  <v-card-text>
                    <pre
                      class="d-block pa-4 bg-grey-darken-4 text-green-accent-2 overflow-x-auto text-caption"
                      style="border-radius: 4px; margin: 0"
                    >
&lt;div id="gauge-container" style="width: 400px; height: 320px;"&gt;
&lt;/div&gt;</pre
                    >
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </section>

          <!-- Configuration Section -->
          <section id="configuration" class="mb-12">
            <h2 class="text-h3 font-weight-bold mb-6">
              <v-icon icon="mdi-cog" class="mr-2"></v-icon>
              Configuration Options
            </h2>

            <v-table class="elevation-1">
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                  <th>Example/Interface</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="option in configOptions" :key="option.name">
                  <td>
                    <code class="text-primary">{{ option.name }}</code>
                  </td>
                  <td>
                    <v-chip size="small" variant="outlined">{{ option.type }}</v-chip>
                  </td>
                  <td>
                    <code>{{ option.default }}</code>
                  </td>
                  <td>{{ option.description }}</td>
                  <td>
                    <div v-if="option.example" class="text-caption">
                      <pre class="example-code">{{ option.example }}</pre>
                    </div>
                    <span v-else class="text-grey">-</span>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </section>

          <!-- Methods Section -->
          <section id="methods" class="mb-12">
            <h2 class="text-h3 font-weight-bold mb-6">
              <v-icon icon="mdi-function" class="mr-2"></v-icon>
              Methods
            </h2>

            <v-expansion-panels variant="accordion">
              <v-expansion-panel v-for="method in methods" :key="method.name" :title="method.name">
                <v-expansion-panel-text>
                  <div class="mb-4"><strong>Description:</strong> {{ method.description }}</div>

                  <div class="mb-4" v-if="method.parameters.length">
                    <strong>Parameters:</strong>
                    <ul class="mt-2">
                      <li v-for="param in method.parameters" :key="param.name">
                        <code>{{ param.name }}</code> ({{ param.type }}) - {{ param.description }}
                      </li>
                    </ul>
                  </div>

                  <div class="mb-4">
                    <strong>Example:</strong>
                    <pre
                      class="d-block pa-3 bg-grey-darken-4 text-green-accent-2 overflow-x-auto text-caption mt-2"
                      style="border-radius: 4px; margin-bottom: 0"
                      >{{ method.example }}</pre
                    >
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </section>

          <!-- Migration Section -->
          <section id="migration" class="mb-12">
            <h2 class="text-h3 font-weight-bold mb-6">
              <v-icon icon="mdi-update" class="mr-2"></v-icon>
              Migration from v1.x
            </h2>

            <v-alert type="info" class="mb-6">
              <v-alert-title>Breaking Changes in v2.0</v-alert-title>
              JustGage v2.0 introduces modern ES6+ modules and removes the RaphaelJS dependency in
              favor of native SVG APIs.
            </v-alert>

            <v-row>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title class="text-red">v1.x (Legacy)</v-card-title>
                  <v-card-text>
                    <pre
                      class="d-block pa-3 bg-grey-darken-4 text-red-accent-2 overflow-x-auto text-caption"
                      style="border-radius: 4px; margin: 0"
                    >
&lt;script src="raphael.min.js"&gt;&lt;/script&gt;
&lt;script src="justgage.js"&gt;&lt;/script&gt;

var gauge = new JustGage({
  id: 'gauge',
  value: 67,
  min: 0,
  max: 100
});</pre
                    >
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title class="text-green">v2.0 (Modern)</v-card-title>
                  <v-card-text>
                    <pre
                      class="d-block pa-3 bg-grey-darken-4 text-green-accent-2 overflow-x-auto text-caption"
                      style="border-radius: 4px; margin: 0"
                    >
import JustGage from 'justgage';

const gauge = new JustGage({
  id: 'gauge',
  value: 67,
  min: 0,
  max: 100
});</pre
                    >
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </section>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const installationTab = ref('npm');

const navSections = [
  { id: 'installation', title: 'Installation', icon: 'mdi-download' },
  { id: 'whats-new', title: "What's New", icon: 'mdi-star' },
  { id: 'quickstart', title: 'Quick Start', icon: 'mdi-rocket-launch' },
  { id: 'configuration', title: 'Configuration', icon: 'mdi-cog' },
  { id: 'methods', title: 'Methods', icon: 'mdi-function' },
  { id: 'migration', title: 'Migration', icon: 'mdi-update' },
];

const configHeaders = [
  { title: 'Option', key: 'name', sortable: true },
  { title: 'Type', key: 'type', sortable: true },
  { title: 'Default', key: 'default', sortable: false },
  { title: 'Description', key: 'description', sortable: false },
];

const configOptions = [
  {
    name: 'id',
    type: 'string',
    default: 'required',
    description: 'Container element ID',
  },
  {
    name: 'parentNode',
    type: 'HTMLElement',
    default: 'null',
    description: 'Container element object. Used if id is not present',
  },
  {
    name: 'value',
    type: 'number',
    default: '0',
    description: 'Current gauge value',
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    description: 'Minimum value',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'Maximum value',
  },
  {
    name: 'minTxt',
    type: 'string|false',
    default: 'false',
    description: 'Min value text override',
  },
  {
    name: 'maxTxt',
    type: 'string|false',
    default: 'false',
    description: 'Max value text override',
  },
  {
    name: 'reverse',
    type: 'boolean',
    default: 'false',
    description: 'Reverse min and max positions',
  },
  {
    name: 'width',
    type: 'number',
    default: 'null',
    description: 'Gauge width in pixels',
  },
  {
    name: 'height',
    type: 'number',
    default: 'null',
    description: 'Gauge height in pixels',
  },
  {
    name: 'gaugeWidthScale',
    type: 'number',
    default: '1.0',
    description: 'Width scale factor of the gauge element',
  },
  {
    name: 'gaugeColor',
    type: 'string',
    default: '#edebeb',
    description: 'Background color of gauge element',
  },
  {
    name: 'label',
    type: 'string',
    default: "''",
    description: 'Text to show below value',
  },
  {
    name: 'valueFontColor',
    type: 'string',
    default: '#010101',
    description: 'Color of value text',
  },
  {
    name: 'valueFontFamily',
    type: 'string',
    default: 'Arial',
    description: 'Font family of value text',
  },
  {
    name: 'valueFontWeight',
    type: 'string',
    default: 'normal',
    description: 'Font weight of value text',
  },
  {
    name: 'labelFontColor',
    type: 'string',
    default: '#b3b3b3',
    description: 'Color of label text',
  },
  {
    name: 'labelFontFamily',
    type: 'string',
    default: 'Arial',
    description: 'Font family of label text',
  },
  {
    name: 'labelFontWeight',
    type: 'string',
    default: 'normal',
    description: 'Font weight of label text',
  },
  {
    name: 'symbol',
    type: 'string',
    default: "''",
    description: 'Special symbol to show next to value',
  },
  {
    name: 'shadowOpacity',
    type: 'number',
    default: '0.2',
    description: 'Shadow opacity (0-1)',
  },
  {
    name: 'shadowSize',
    type: 'number',
    default: '5',
    description: 'Inner shadow size',
  },
  {
    name: 'shadowVerticalOffset',
    type: 'number',
    default: '3',
    description: 'Shadow vertical offset from top',
  },
  {
    name: 'levelColors',
    type: 'string[]',
    default: '["#a9d70b", "#f9c802", "#ff0000"]',
    description: 'Colors of indicator, from lower to upper',
  },
  {
    name: 'startAnimationTime',
    type: 'number',
    default: '700',
    description: 'Initial animation duration in milliseconds',
  },
  {
    name: 'startAnimationType',
    type: 'string',
    default: '>',
    description: 'Type of initial animation (linear, >, <, <>, bounce)',
  },
  {
    name: 'refreshAnimationTime',
    type: 'number',
    default: '700',
    description: 'Refresh animation duration in milliseconds',
  },
  {
    name: 'refreshAnimationType',
    type: 'string',
    default: '>',
    description: 'Type of refresh animation (linear, >, <, <>, bounce)',
  },
  {
    name: 'donutStartAngle',
    type: 'number',
    default: '90',
    description: 'Angle to start from when in donut mode',
  },
  {
    name: 'valueMinFontSize',
    type: 'number',
    default: '16',
    description: 'Absolute minimum font size for the value label',
  },
  {
    name: 'labelMinFontSize',
    type: 'number',
    default: '10',
    description: 'Absolute minimum font size for the label',
  },
  {
    name: 'minLabelMinFontSize',
    type: 'number',
    default: '10',
    description: 'Absolute minimum font size for the min label',
  },
  {
    name: 'maxLabelMinFontSize',
    type: 'number',
    default: '10',
    description: 'Absolute minimum font size for the max label',
  },
  {
    name: 'titleMinFontSize',
    type: 'number',
    default: '10',
    description: 'Absolute minimum font size for the title',
  },
  {
    name: 'hideValue',
    type: 'boolean',
    default: 'false',
    description: 'Hide value text',
  },
  {
    name: 'hideMinMax',
    type: 'boolean',
    default: 'false',
    description: 'Hide min/max text',
  },
  {
    name: 'showMinMax',
    type: 'boolean',
    default: 'true',
    description: 'Show min/max labels',
  },
  {
    name: 'showInnerShadow',
    type: 'boolean',
    default: 'false',
    description: 'Show inner shadow',
  },
  {
    name: 'humanFriendly',
    type: 'boolean',
    default: 'false',
    description: 'Convert large numbers to human friendly format (e.g. 1234567 -> 1.23M)',
  },
  {
    name: 'humanFriendlyDecimal',
    type: 'number',
    default: '0',
    description: 'Number of decimal places for human friendly numbers',
  },
  {
    name: 'noGradient',
    type: 'boolean',
    default: 'false',
    description: 'Whether to use gradual color change for value, or sector-based',
  },
  {
    name: 'donut',
    type: 'boolean',
    default: 'false',
    description: 'Show donut gauge',
  },
  {
    name: 'differential',
    type: 'boolean',
    default: 'false',
    description: 'Gauge will fill starting from the center, rather than from the min value',
  },
  {
    name: 'relativeGaugeSize',
    type: 'boolean',
    default: 'false',
    description: 'Whether gauge size should follow changes in container element size',
  },
  {
    name: 'counter',
    type: 'boolean',
    default: 'false',
    description: 'Animate text value number change',
  },
  {
    name: 'decimals',
    type: 'number',
    default: '0',
    description: 'Number of digits after floating point',
  },
  {
    name: 'customSectors',
    type: 'object',
    default: '{}',
    description: 'Custom sectors colors configuration',
    example: `{
  percents: true,
  ranges: [
    { lo: 0, hi: 50, color: '#a9d70b' },
    { lo: 51, hi: 100, color: '#ff0000' }
  ]
}`,
  },
  {
    name: 'formatNumber',
    type: 'boolean',
    default: 'false',
    description: 'Formats numbers with commas where appropriate',
  },
  {
    name: 'pointer',
    type: 'boolean',
    default: 'false',
    description: 'Show value pointer',
  },
  {
    name: 'pointerOptions',
    type: 'object',
    default: '{}',
    description: 'Pointer configuration options',
    example: `{
  toplength: 15,
  bottomlength: 10,
  bottomwidth: 12,
  stroke: 'none',
  stroke_width: 0,
  stroke_linecap: 'square',
  color: '#000000'
}`,
  },
  {
    name: 'displayRemaining',
    type: 'boolean',
    default: 'false',
    description: 'Replace display number with the value remaining to reach max value',
  },
  {
    name: 'targetLine',
    type: 'number|null',
    default: 'null',
    description: 'Value where target line will display',
  },
  {
    name: 'targetLineColor',
    type: 'string',
    default: '#000000',
    description: 'Color of target line',
  },
  {
    name: 'targetLineWidth',
    type: 'number',
    default: '1.5',
    description: 'Width of target line',
  },
  {
    name: 'textRenderer',
    type: 'function|null',
    default: 'null',
    description: 'Function applied before rendering text',
    example: `(value) => {
  return value.toFixed(1) + '%';
  // Return false to use default formatting
}`,
  },
  {
    name: 'onAnimationEnd',
    type: 'function|null',
    default: 'null',
    description: 'Function applied after animation is done',
    example: `() => {
  console.log('Animation completed!');
  // Your custom logic here
}`,
  },
  {
    name: 'defaults',
    type: 'object',
    default: '{}',
    description: 'Default configuration to merge',
  },
  {
    name: 'title',
    type: 'string',
    default: "''",
    description: 'Title text displayed above or below the gauge',
  },
  {
    name: 'titleFontColor',
    type: 'string',
    default: '#999999',
    description: 'Title font color',
  },
  {
    name: 'titleFontFamily',
    type: 'string',
    default: 'Arial',
    description: 'Title font family',
  },
  {
    name: 'titleFontWeight',
    type: 'string',
    default: 'normal',
    description: 'Title font weight',
  },
  {
    name: 'titlePosition',
    type: 'string',
    default: 'above',
    description: 'Title position relative to gauge (above or below)',
  },
  {
    name: 'showSectorColors',
    type: 'boolean',
    default: 'false',
    description:
      'Show sector colors as filled gauge instead of current level. Requires customSectors to be defined.',
  },
];

const methods = [
  {
    name: 'refresh(value, max, min, label)',
    description: 'Updates the gauge with new values',
    parameters: [
      { name: 'value', type: 'number', description: 'New gauge value' },
      { name: 'max', type: 'number', description: 'New maximum value (optional)' },
      { name: 'min', type: 'number', description: 'New minimum value (optional)' },
      { name: 'label', type: 'string', description: 'New label text (optional)' },
    ],
    example: 'gauge.refresh(85, 100, 0, "CPU %");',
  },
  {
    name: 'update(options)',
    description: 'Updates gauge configuration options',
    parameters: [
      { name: 'options', type: 'object', description: 'Configuration object with new options' },
    ],
    example:
      'gauge.update({ gaugeColor: "#333", levelColors: ["#00ff00", "#ffff00", "#ff0000"] });',
  },
  {
    name: 'destroy()',
    description: 'Removes the gauge from DOM and cleans up resources',
    parameters: [],
    example: 'gauge.destroy();',
  },
];

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.sticky-top {
  position: sticky;
  top: 20px;
}

code {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
}

.example-code {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  font-size: 0.85em;
  line-height: 1.4;
  white-space: pre-wrap;
  overflow-x: auto;
  margin: 4px 0;
}

.v-theme--dark .example-code {
  background-color: #2d2d2d;
  border: 1px solid #555;
  color: #e0e0e0;
}

/* What's New in v2.0 Styles */
.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.bg-gradient-primary .v-card-title,
.bg-gradient-primary .v-card-subtitle,
.bg-gradient-primary .v-card-text {
  color: white;
}

.changelog-section {
  padding: 20px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  height: 100%;
}

.changelog-section h3 {
  color: white;
  margin-bottom: 16px;
}

.changelog-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.changelog-list li {
  padding: 10px 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: 15px;
  line-height: 1.6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.changelog-list li:last-child {
  border-bottom: none;
}

.changelog-list li strong {
  font-weight: 600;
  color: white;
}

.bg-gradient-primary .v-alert {
  background: rgba(255, 255, 255, 0.15) !important;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.bg-gradient-primary .v-alert a {
  text-decoration: underline;
  font-weight: 600;
  color: #ffd700 !important;
}

.bg-gradient-primary .v-alert a:hover {
  color: #ffed4e !important;
}
</style>
