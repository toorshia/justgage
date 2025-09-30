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
  },
  {
    name: 'onAnimationEnd',
    type: 'function|null',
    default: 'null',
    description: 'Function applied after animation is done',
  },
  {
    name: 'defaults',
    type: 'object',
    default: '{}',
    description: 'Default configuration to merge',
  },
  {
    name: 'startAngle',
    type: 'number',
    default: '135',
    description: 'Gauge start angle',
  },
  {
    name: 'endAngle',
    type: 'number',
    default: '45',
    description: 'Gauge end angle',
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
</style>
