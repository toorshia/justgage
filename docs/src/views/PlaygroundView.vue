<template>
  <v-container fluid>
    <!-- Header -->
    <v-row class="py-4">
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between mb-6">
          <div>
            <h1 class="text-h2 font-weight-bold">JustGage Playground</h1>
            <p class="text-h6 text-grey-darken-1">Interactive configuration and visual diff tool</p>
          </div>
          <div class="d-flex ga-2 flex-wrap">
            <v-btn
              :color="showGrid ? 'success' : 'grey'"
              :prepend-icon="showGrid ? 'mdi-grid' : 'mdi-grid-off'"
              @click="toggleGrid"
            >
              {{ showGrid ? 'Hide Grid' : 'Show Grid' }}
            </v-btn>
            <v-btn color="primary" prepend-icon="mdi-download" @click="exportConfig">
              Export Config
            </v-btn>
            <v-btn color="secondary" prepend-icon="mdi-upload" @click="importConfig">
              Import Config
            </v-btn>
          </div>
        </div>

        <!-- Responsive Testing Controls -->
        <div class="mb-4 pa-4 bg-blue-grey-lighten-5 rounded">
          <h3 class="text-h6 mb-3">
            <v-icon class="mr-2">mdi-resize</v-icon>
            📏 Responsive Testing Controls
          </h3>
          <p class="text-body-2 mb-3">
            Test relativeGaugeSize setting by changing container dimensions:
          </p>

          <v-switch
            v-model="config.relativeGaugeSize"
            label="Relative Gauge Size"
            color="primary"
            hide-details
            @update:model-value="debouncedUpdateGauges"
            class="mb-3"
          />

          <div v-if="config.relativeGaugeSize" class="d-flex flex-wrap ga-2 mb-2">
            <v-btn
              size="small"
              color="orange"
              @click="resizeContainers(0.5)"
              :disabled="!config.relativeGaugeSize"
            >
              50% Size
            </v-btn>
            <v-btn
              size="small"
              color="orange"
              @click="resizeContainers(0.75)"
              :disabled="!config.relativeGaugeSize"
            >
              75% Size
            </v-btn>
            <v-btn size="small" color="orange" @click="resizeContainers(1.0)"> 100% Size </v-btn>
            <v-btn
              size="small"
              color="orange"
              @click="resizeContainers(1.25)"
              :disabled="!config.relativeGaugeSize"
            >
              125% Size
            </v-btn>
            <v-btn
              size="small"
              color="orange"
              @click="resizeContainers(1.5)"
              :disabled="!config.relativeGaugeSize"
            >
              150% Size
            </v-btn>
            <v-btn
              size="small"
              color="deep-orange"
              prepend-icon="mdi-animation-play"
              @click="animateResize"
              :disabled="!config.relativeGaugeSize"
            >
              Animate Resize
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <!-- Configuration Panel -->
      <v-col cols="12" lg="4">
        <v-card class="sticky-config">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-cog" class="mr-2"></v-icon>
            Configuration
          </v-card-title>
          <v-card-text>
            <!-- Quick Presets -->
            <div class="mb-4">
              <h3 class="text-h6 mb-3">⚡ Quick Presets</h3>
              <div class="d-flex flex-wrap ga-2">
                <v-btn
                  v-for="preset in presets"
                  :key="preset.key"
                  size="small"
                  variant="outlined"
                  @click="loadPreset(preset.key)"
                  color="primary"
                >
                  {{ preset.title }}
                </v-btn>
              </div>
            </div>

            <!-- Comprehensive Configuration -->
            <v-expansion-panels v-model="expandedPanels" multiple>
              <!-- Basic Values -->
              <v-expansion-panel value="basic">
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-numeric</v-icon>
                  Basic Values
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-slider
                    v-model="config.value"
                    :min="config.min"
                    :max="config.max"
                    label="Value"
                    thumb-label
                    color="primary"
                    @update:model-value="updateExistingGauges"
                    class="mb-4"
                  />

                  <v-text-field
                    v-model.number="config.min"
                    label="Minimum"
                    type="number"
                    variant="outlined"
                    density="compact"
                    color="primary"
                    @input="updateExistingGauges"
                    class="mb-3"
                  />

                  <v-text-field
                    v-model.number="config.max"
                    label="Maximum"
                    type="number"
                    variant="outlined"
                    density="compact"
                    color="primary"
                    @input="updateExistingGauges"
                    class="mb-3"
                  />

                  <v-text-field
                    v-model.number="config.decimals"
                    label="Decimals"
                    type="number"
                    :min="0"
                    :max="5"
                    variant="outlined"
                    density="compact"
                    color="primary"
                    @input="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-text-field
                    v-model="config.symbol"
                    label="Symbol"
                    variant="outlined"
                    density="compact"
                    @input="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-switch
                    v-model="config.reverse"
                    label="Reverse"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                  />

                  <v-text-field
                    v-model="config.title"
                    label="Title"
                    variant="outlined"
                    density="compact"
                    @input="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-text-field
                    v-model="config.label"
                    label="Label"
                    variant="outlined"
                    density="compact"
                    @input="updateExistingGauges"
                    class="mb-3"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Dimensions -->
              <v-expansion-panel value="dimensions">
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-resize</v-icon>
                  Dimensions
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-text-field
                    v-model.number="config.width"
                    label="Width"
                    type="number"
                    :min="100"
                    :max="800"
                    variant="outlined"
                    density="compact"
                    color="primary"
                    @input="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-text-field
                    v-model.number="config.height"
                    label="Height"
                    type="number"
                    :min="100"
                    :max="600"
                    variant="outlined"
                    density="compact"
                    color="primary"
                    @input="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-slider
                    v-model="config.gaugeWidthScale"
                    :min="0.5"
                    :max="2"
                    :step="0.1"
                    label="Gauge Width Scale"
                    thumb-label
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Colors -->
              <v-expansion-panel value="colors">
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-palette</v-icon>
                  Colors
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="mb-3">
                    <label class="text-body-2 mb-2 d-block">Gauge Color</label>
                    <input
                      type="color"
                      v-model="config.gaugeColor"
                      @input="debouncedUpdateGauges"
                      class="mb-2"
                      style="width: 50px; height: 30px; border: none; cursor: pointer"
                    />
                  </div>

                  <div class="mb-3">
                    <label class="text-body-2 mb-2 d-block">Value Font Color</label>
                    <input
                      type="color"
                      v-model="config.valueFontColor"
                      @input="debouncedUpdateGauges"
                      class="mb-2"
                      style="width: 50px; height: 30px; border: none; cursor: pointer"
                    />
                  </div>

                  <div class="mb-3">
                    <label class="text-body-2 mb-2 d-block">Label Font Color</label>
                    <input
                      type="color"
                      v-model="config.labelFontColor"
                      @input="debouncedUpdateGauges"
                      class="mb-2"
                      style="width: 50px; height: 30px; border: none; cursor: pointer"
                    />
                  </div>

                  <!-- Level Colors -->
                  <div class="mb-4">
                    <h4 class="mb-2">Level Colors</h4>
                    <div
                      v-for="(color, index) in config.levelColors"
                      :key="index"
                      class="d-flex align-center mb-2"
                    >
                      <input
                        type="color"
                        v-model="config.levelColors[index]"
                        @input="debouncedUpdateGauges"
                        style="
                          width: 40px;
                          height: 30px;
                          border: none;
                          cursor: pointer;
                          margin-right: 8px;
                        "
                      />
                      <v-btn
                        icon
                        size="small"
                        @click="removeLevelColor(index)"
                        :disabled="config.levelColors.length <= 1"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <v-btn size="small" @click="addLevelColor" color="primary">
                      <v-icon class="mr-1">mdi-plus</v-icon>
                      Add Color
                    </v-btn>
                  </div>

                  <v-switch
                    v-model="config.noGradient"
                    label="No Gradient"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Labels and Text -->
              <v-expansion-panel value="labels">
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-text</v-icon>
                  Labels and Text
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-text-field
                    v-model="config.minTxt"
                    label="Min Text Override"
                    variant="outlined"
                    density="compact"
                    @input="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-text-field
                    v-model="config.maxTxt"
                    label="Max Text Override"
                    variant="outlined"
                    density="compact"
                    @input="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-switch
                    v-model="config.hideValue"
                    label="Hide Value"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-2"
                  />

                  <v-switch
                    v-model="config.hideMinMax"
                    label="Hide Min/Max"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-2"
                  />

                  <v-switch
                    v-model="config.humanFriendly"
                    label="Human Friendly Numbers"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-2"
                  />

                  <v-switch
                    v-model="config.formatNumber"
                    label="Format Numbers"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Gauge Types -->
              <v-expansion-panel value="types">
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-chart-donut</v-icon>
                  Gauge Types
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-switch
                    v-model="config.donut"
                    label="Donut Mode"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-slider
                    v-model="config.donutStartAngle"
                    :min="0"
                    :max="360"
                    label="Donut Start Angle"
                    thumb-label
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-switch
                    v-model="config.differential"
                    label="Differential"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-2"
                  />

                  <v-switch
                    v-model="config.displayRemaining"
                    label="Display Remaining"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Pointer -->
              <v-expansion-panel value="pointer">
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-cursor-default</v-icon>
                  Pointer
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-switch
                    v-model="config.pointer"
                    label="Show Pointer"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <div class="mb-3">
                    <label class="text-body-2 mb-2 d-block">Pointer Color</label>
                    <input
                      type="color"
                      v-model="config.pointerOptions.color"
                      @input="debouncedUpdateGauges"
                      style="width: 50px; height: 30px; border: none; cursor: pointer"
                    />
                  </div>

                  <v-text-field
                    v-model.number="config.pointerOptions.toplength"
                    label="Top Length"
                    type="number"
                    variant="outlined"
                    density="compact"
                    color="primary"
                    @input="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-text-field
                    v-model.number="config.pointerOptions.bottomlength"
                    label="Bottom Length"
                    type="number"
                    variant="outlined"
                    density="compact"
                    color="primary"
                    @input="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-text-field
                    v-model.number="config.pointerOptions.bottomwidth"
                    label="Bottom Width"
                    type="number"
                    variant="outlined"
                    density="compact"
                    color="primary"
                    @input="debouncedUpdateGauges"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Target Line -->
              <v-expansion-panel value="target">
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-target</v-icon>
                  Target Line
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-switch
                    v-model="config.showTargetLine"
                    label="Show Target Line"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-text-field
                    v-model.number="config.targetLine"
                    label="Target Value"
                    type="number"
                    variant="outlined"
                    density="compact"
                    color="primary"
                    :disabled="!config.showTargetLine"
                    @input="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <div class="mb-3">
                    <label class="text-body-2 mb-2 d-block">Target Color</label>
                    <input
                      type="color"
                      v-model="config.targetLineColor"
                      @input="debouncedUpdateGauges"
                      :disabled="!config.showTargetLine"
                      style="width: 50px; height: 30px; border: none; cursor: pointer"
                    />
                  </div>

                  <v-slider
                    v-model="config.targetLineWidth"
                    :min="0.5"
                    :max="5"
                    :step="0.5"
                    label="Target Width"
                    thumb-label
                    color="primary"
                    :disabled="!config.showTargetLine"
                    @update:model-value="debouncedUpdateGauges"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Animation -->
              <v-expansion-panel value="animation">
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-animation-play</v-icon>
                  Animation
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-slider
                    v-model="config.startAnimationTime"
                    :min="0"
                    :max="3000"
                    label="Start Animation Time (ms)"
                    thumb-label
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-select
                    v-model="config.startAnimationType"
                    :items="animationTypes"
                    item-title="title"
                    item-value="value"
                    label="Start Animation Type"
                    variant="outlined"
                    density="compact"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-slider
                    v-model="config.refreshAnimationTime"
                    :min="0"
                    :max="3000"
                    label="Refresh Animation Time (ms)"
                    thumb-label
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-switch
                    v-model="config.counter"
                    label="Counter Animation"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- Shadow -->
              <v-expansion-panel value="shadow">
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-weather-night</v-icon>
                  Shadow
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-switch
                    v-model="config.showInnerShadow"
                    label="Show Inner Shadow"
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-slider
                    v-model="config.shadowOpacity"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    label="Shadow Opacity"
                    thumb-label
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-slider
                    v-model="config.shadowSize"
                    :min="0"
                    :max="20"
                    label="Shadow Size"
                    thumb-label
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                    class="mb-3"
                  />

                  <v-slider
                    v-model="config.shadowVerticalOffset"
                    :min="0"
                    :max="20"
                    label="Shadow Vertical Offset"
                    thumb-label
                    color="primary"
                    @update:model-value="debouncedUpdateGauges"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Gauge Display -->
      <v-col cols="12" lg="8">
        <v-row>
          <!-- Modern v2.0 Gauge -->
          <v-col cols="12" md="6">
            <v-card class="h-100">
              <v-card-title class="d-flex align-center">
                <v-chip color="success" size="small" class="mr-2">v2.0</v-chip>
                Modern (Native SVG)
              </v-card-title>
              <v-card-text class="gauge-container-wrapper">
                <div class="gauge-inner-container">
                  <div id="gauge-v2" ref="gaugeV2Container" class="gauge-content">
                    <v-progress-circular v-if="!gaugeV2Ready" indeterminate color="primary" />
                    <div v-else-if="gaugeV2Error" class="text-center">
                      <v-icon color="error" size="48">mdi-alert-circle</v-icon>
                      <p class="text-error mt-2">Failed to load v2.0</p>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Legacy v1.x Gauge -->
          <v-col cols="12" md="6">
            <v-card class="h-100">
              <v-card-title class="d-flex align-center">
                <v-chip color="warning" size="small" class="mr-2">v1.x</v-chip>
                Legacy (RaphaelJS)
              </v-card-title>
              <v-card-text class="gauge-container-wrapper">
                <div class="gauge-inner-container">
                  <div id="gauge-v1" ref="gaugeV1Container" class="gauge-content">
                    <v-progress-circular v-if="!gaugeV1Ready" indeterminate color="warning" />
                    <div v-else-if="gaugeV1Error" class="text-center">
                      <v-icon color="error" size="48">mdi-alert-circle</v-icon>
                      <p class="text-error mt-2">Failed to load v1.x</p>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Configuration Output -->
        <v-row class="mt-4">
          <v-col cols="12">
            <v-expansion-panels v-model="configExpanded">
              <v-expansion-panel value="config">
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-code-json</v-icon>
                  Generated Configuration
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <pre
                    class="text-caption bg-grey-darken-4 pa-3 text-green-accent-2 overflow-x-auto"
                    >{{ formatConfigCode }}</pre
                  >
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, nextTick, computed, watch } from 'vue';

// Simple debounce function
const debounce = (func: Function, wait: number) => {
  let timeout: any;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Reactive state
const expandedPanels = ref(['basic', 'colors']);
const configExpanded = ref(false); // Generated config collapsed by default
const gaugeV2Ready = ref(false);
const gaugeV1Ready = ref(false);
const gaugeV2Error = ref(false);
const gaugeV1Error = ref(false);
const showGrid = ref(false);

// Gauge instances
let gaugeV2: any = null;
let gaugeV1: any = null;
let JustGageV2: any = null;

// Presets from visual-diff-tool
const presets = [
  { key: 'default', title: 'Default' },
  { key: 'donut', title: 'Donut' },
  { key: 'pointer', title: 'Pointer' },
  { key: 'differential', title: 'Differential' },
  { key: 'custom-sectors', title: 'Custom Sectors' },
  { key: 'minimal', title: 'Minimal' },
  { key: 'advanced', title: 'Advanced' },
];

// Comprehensive Configuration (all features from visual-diff-tool)
const config = reactive({
  // Basic Values
  value: 67,
  min: 0,
  max: 100,
  decimals: 0,
  symbol: '',
  reverse: false,

  // Dimensions
  width: 400,
  height: 320,
  relativeGaugeSize: false,
  gaugeWidthScale: 1.0,

  // Colors
  gaugeColor: '#edebeb',
  valueFontColor: '#010101',
  labelFontColor: '#b3b3b3',
  levelColors: ['#a9d70b', '#f9c802', '#ff0000'],
  noGradient: false,

  // Labels and Text
  title: '',
  label: 'units',
  minTxt: '',
  maxTxt: '',
  hideValue: false,
  hideMinMax: false,
  humanFriendly: false,
  formatNumber: false,

  // Gauge Types
  donut: false,
  donutStartAngle: 90,
  differential: false,
  displayRemaining: false,

  // Pointer
  pointer: false,
  pointerOptions: {
    color: '#8e2de2',
    toplength: 14,
    bottomlength: 27,
    bottomwidth: 4,
  },

  // Target Line
  showTargetLine: false,
  targetLine: null as number | null,
  targetLineColor: '#000000',
  targetLineWidth: 1.5,

  // Animation
  startAnimationTime: 700,
  startAnimationType: '>',
  refreshAnimationTime: 700,
  counter: false,

  // Shadow
  showInnerShadow: false,
  shadowOpacity: 0.2,
  shadowSize: 5,
  shadowVerticalOffset: 3,
});

const animationTypes = [
  { title: 'Linear', value: 'linear' },
  { title: 'Ease In', value: '<' },
  { title: 'Ease Out', value: '>' },
  { title: 'Ease In Out', value: '<>' },
  { title: 'Bounce', value: 'bounce' },
  { title: 'Elastic', value: 'elastic' },
  { title: 'Back In', value: 'backIn' },
  { title: 'Back Out', value: 'backOut' },
];

// Formatted config for display
const formatConfigCode = computed(() => {
  const cleanConfig: any = { ...config };
  // Remove target line if not shown
  if (!config.showTargetLine) {
    delete cleanConfig.targetLine;
  }
  // Clean up pointer options if not used
  if (!config.pointer) {
    delete cleanConfig.pointerOptions;
  }
  // Remove UI-specific properties
  delete cleanConfig.showTargetLine;

  return `const config = ${JSON.stringify(cleanConfig, null, 2)};

const gauge = new JustGage(config);`;
});

// Load preset configurations
const loadPreset = (preset: string) => {
  switch (preset) {
    case 'donut':
      Object.assign(config, {
        donut: true,
        donutStartAngle: 90,
        hideMinMax: true,
        value: 75,
        label: 'Progress',
        levelColors: ['#00ff66', '#ffcc00', '#ff3300'],
      });
      break;

    case 'pointer':
      Object.assign(config, {
        pointer: true,
        donut: false,
        value: 60,
        label: 'Speed',
        pointerOptions: {
          color: '#8e2de2',
          toplength: 20,
          bottomlength: 30,
          bottomwidth: 6,
        },
      });
      break;

    case 'differential':
      Object.assign(config, {
        differential: true,
        min: -50,
        max: 50,
        value: 25,
        label: 'Differential',
        levelColors: ['#ff0000', '#ffff00', '#00ff00'],
      });
      break;

    case 'custom-sectors':
      Object.assign(config, {
        noGradient: true,
        levelColors: ['#ff0000', '#ff6600', '#ffcc00', '#66ff00', '#00ff66'],
        value: 80,
        label: 'Custom',
      });
      break;

    case 'minimal':
      Object.assign(config, {
        hideMinMax: true,
        title: '',
        label: '',
        showInnerShadow: false,
        levelColors: ['#999999'],
      });
      break;

    case 'advanced':
      Object.assign(config, {
        pointer: true,
        showTargetLine: true,
        targetLine: 75,
        showInnerShadow: true,
        counter: true,
        humanFriendly: true,
        title: 'Advanced Gauge',
        label: 'Performance',
      });
      break;

    default: // 'default'
      Object.assign(config, {
        value: 67,
        min: 0,
        max: 100,
        decimals: 0,
        symbol: '',
        reverse: false,
        width: 400,
        height: 320,
        relativeGaugeSize: false,
        gaugeWidthScale: 1.0,
        gaugeColor: '#edebeb',
        valueFontColor: '#010101',
        labelFontColor: '#b3b3b3',
        levelColors: ['#a9d70b', '#f9c802', '#ff0000'],
        noGradient: false,
        title: '',
        label: 'units',
        minTxt: '',
        maxTxt: '',
        hideValue: false,
        hideMinMax: false,
        humanFriendly: false,
        formatNumber: false,
        donut: false,
        donutStartAngle: 90,
        differential: false,
        displayRemaining: false,
        pointer: false,
        pointerOptions: {
          color: '#8e2de2',
          toplength: 14,
          bottomlength: 27,
          bottomwidth: 4,
        },
        showTargetLine: false,
        targetLine: null,
        targetLineColor: '#000000',
        targetLineWidth: 1.5,
        startAnimationTime: 700,
        startAnimationType: '>',
        refreshAnimationTime: 700,
        counter: false,
        showInnerShadow: false,
        shadowOpacity: 0.2,
        shadowSize: 5,
        shadowVerticalOffset: 3,
      });
  }

  // Trigger immediate update
  recreateGauges();
};

// Load legacy v1.x scripts
const loadLegacyScripts = async () => {
  return new Promise((resolve, reject) => {
    // Load Raphael first
    const raphaelScript = document.createElement('script');
    raphaelScript.src = '/raphael.min.js';
    raphaelScript.onload = () => {
      // Then load JustGage v1
      const justgageScript = document.createElement('script');
      justgageScript.src = '/justgage.js';
      justgageScript.onload = () => resolve(true);
      justgageScript.onerror = () => reject(new Error('Failed to load justgage.js'));
      document.head.appendChild(justgageScript);
    };
    raphaelScript.onerror = () => reject(new Error('Failed to load raphael.min.js'));
    document.head.appendChild(raphaelScript);
  });
};

// Initialize gauges
const initializeGauges = async () => {
  try {
    // Load modern v2.0
    const justgageModule = await import('justgage');
    JustGageV2 = justgageModule.default || justgageModule.JustGage || justgageModule;
    console.log('✅ JustGage v2.0 imported:', JustGageV2);
    gaugeV2Ready.value = true;
  } catch (error) {
    console.error('❌ Failed to import JustGage v2.0:', error);
    gaugeV2Error.value = true;
  }

  try {
    // Load legacy v1.x
    await loadLegacyScripts();
    console.log('✅ JustGage v1.x scripts loaded');
    gaugeV1Ready.value = true;
  } catch (error) {
    console.error('❌ Failed to load JustGage v1.x:', error);
    gaugeV1Error.value = true;
  }

  // Create initial gauges
  await nextTick();
  createGauges();
};

// Create configuration for gauges
const createGaugeConfig = (version: 'v1' | 'v2') => {
  const baseConfig: any = { ...config };

  // Handle target line
  if (config.showTargetLine && config.targetLine !== null) {
    baseConfig.targetLine = config.targetLine;
  } else {
    delete baseConfig.targetLine;
  }

  // Handle pointer options
  if (config.pointer) {
    baseConfig.pointerOptions = { ...config.pointerOptions };
  } else {
    delete baseConfig.pointerOptions;
  }

  // Remove UI-specific properties
  delete baseConfig.showTargetLine;

  // Version-specific configuration
  if (version === 'v1') {
    baseConfig.id = 'gauge-v1';
  } else {
    baseConfig.id = 'gauge-v2';
  }

  return baseConfig;
};

// Create gauge instances
const createGauges = async () => {
  await nextTick();

  // Create v2.0 gauge
  if (gaugeV2Ready.value && JustGageV2) {
    try {
      if (gaugeV2 && gaugeV2.destroy) {
        gaugeV2.destroy();
      }

      // Clear container
      const container = document.getElementById('gauge-v2');
      if (container) {
        container.innerHTML = '';
      }

      const v2Config = createGaugeConfig('v2');
      console.log('Creating v2.0 gauge with config:', v2Config);

      gaugeV2 = new JustGageV2(v2Config);
      console.log('✅ v2.0 gauge created:', gaugeV2);
    } catch (error) {
      console.error('❌ Failed to create v2.0 gauge:', error);
      gaugeV2Error.value = true;
    }
  }

  // Create v1.x gauge
  if (gaugeV1Ready.value && (window as any).JustGage) {
    try {
      if (gaugeV1 && gaugeV1.destroy) {
        gaugeV1.destroy();
      }

      // Clear container
      const container = document.getElementById('gauge-v1');
      if (container) {
        container.innerHTML = '';
      }

      const v1Config = createGaugeConfig('v1');
      console.log('Creating v1.x gauge with config:', v1Config);

      gaugeV1 = new (window as any).JustGage(v1Config);
      console.log('✅ v1.x gauge created:', gaugeV1);
    } catch (error) {
      console.error('❌ Failed to create v1.x gauge:', error);
      gaugeV1Error.value = true;
    }
  }

  // Update grid overlays after gauges are created
  updateGridOverlays();
};

// Recreate gauges (for major configuration changes)
const recreateGauges = async () => {
  console.log('🔄 Recreating gauges...');
  await createGauges();
  // Update grid overlays after gauges are created
  updateGridOverlays();
};

// Update existing gauges (for minor changes like value)
const updateExistingGauges = async () => {
  await nextTick();

  // Update v2.0 gauge
  if (gaugeV2) {
    try {
      if (gaugeV2.refresh) {
        gaugeV2.refresh(config.value, config.max, config.min, config.label);
      }
    } catch (error) {
      console.warn('v2.0 gauge update failed, recreating:', error);
      recreateGauges();
    }
  }

  // Update v1.x gauge
  if (gaugeV1) {
    try {
      if (gaugeV1.refresh) {
        gaugeV1.refresh(config.value, config.max, config.min, config.label);
      }
    } catch (error) {
      console.warn('v1.x gauge update failed, recreating:', error);
      recreateGauges();
    }
  }
};

// Debounced update functions
const debouncedUpdateGauges = debounce(() => {
  recreateGauges();
}, 300);

// Update gauges with new configuration (legacy function)
const updateGauges = async () => {
  debouncedUpdateGauges();
};

// Container resizing for testing relativeGaugeSize
const resizeContainers = (scale: number) => {
  const containers = document.querySelectorAll('.gauge-inner-container');
  containers.forEach(container => {
    const baseWidth = 400;
    const baseHeight = 350;

    (container as HTMLElement).style.width = baseWidth * scale + 'px';
    (container as HTMLElement).style.height = baseHeight * scale + 'px';
    (container as HTMLElement).style.transform = `scale(${scale})`;
    (container as HTMLElement).style.transformOrigin = 'center';
  });

  // Update grid overlays to match new size
  updateGridOverlays();

  console.log(`🔄 Resized containers to ${scale * 100}% scale`);
};

// Animate resize for testing
const animateResize = () => {
  let scale = 0.5;

  const animate = () => {
    resizeContainers(scale);
    scale += 0.05;

    if (scale <= 1.5) {
      setTimeout(animate, 200);
    } else {
      // Reset to normal
      setTimeout(() => resizeContainers(1.0), 500);
    }
  };

  animate();
};

// Configuration management
const exportConfig = () => {
  const configData = JSON.stringify(config, null, 2);
  const blob = new Blob([configData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'justgage-config.json';
  a.click();
  URL.revokeObjectURL(url);
};

const importConfig = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const importedConfig = JSON.parse(e.target?.result as string);
          Object.assign(config, importedConfig);
          recreateGauges();
        } catch (error) {
          console.error('Failed to import configuration:', error);
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
};

// Grid functionality
const toggleGrid = () => {
  showGrid.value = !showGrid.value;
  console.log('🔄 Grid toggled to:', showGrid.value);
  updateGridOverlays();
};

// Update grid overlays on all gauge containers
const updateGridOverlays = () => {
  // Wait for DOM to be ready
  nextTick(() => {
    const containers = document.querySelectorAll('.gauge-container-wrapper');
    console.log('🔍 Found gauge containers:', containers.length);

    containers.forEach((container, index) => {
      console.log(`📋 Processing container ${index}:`, container);
      let grid = container.querySelector('.grid-overlay');

      if (showGrid.value && !grid) {
        console.log('✨ Creating grid for container', index);
        grid = createGrid(400, 320);
        container.appendChild(grid);
        console.log('✅ Grid added to container', index, grid);
      } else if (!showGrid.value && grid) {
        console.log('🗑️ Removing grid from container', index);
        grid.remove();
      } else if (showGrid.value && grid) {
        console.log('ℹ️ Grid already exists for container', index);
      } else {
        console.log('ℹ️ No action needed for container', index);
      }
    });
  });
}; // Create grid overlay
// Create grid overlay
const createGrid = (width: number, height: number) => {
  console.log('🎯 Creating grid with dimensions:', width, 'x', height);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.classList.add('grid-overlay');

  // Apply styles directly to the SVG element (since scoped CSS won't work with dynamically created elements)
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '1000';

  // Add a semi-transparent background for testing visibility
  const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  background.setAttribute('width', '100%');
  background.setAttribute('height', '100%');
  background.setAttribute('fill', 'transparent');

  background.setAttribute('stroke-width', '2');
  svg.appendChild(background);

  // Create grid lines every 20px
  for (let x = 0; x <= width; x += 20) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x.toString());
    line.setAttribute('y1', '0');
    line.setAttribute('x2', x.toString());
    line.setAttribute('y2', height.toString());
    line.setAttribute('stroke', '#999');
    line.setAttribute('stroke-width', x % 100 === 0 ? '2' : '1');
    line.setAttribute('opacity', '0.7');
    svg.appendChild(line);
  }

  for (let y = 0; y <= height; y += 20) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('y1', y.toString());
    line.setAttribute('x2', width.toString());
    line.setAttribute('y2', y.toString());
    line.setAttribute('stroke', '#999');
    line.setAttribute('stroke-width', y % 100 === 0 ? '2' : '1');
    line.setAttribute('opacity', '0.7');
    svg.appendChild(line);
  }

  console.log('✅ Grid SVG created with full container dimensions:', svg);
  return svg;
};

// Level colors management
const addLevelColor = () => {
  config.levelColors.push('#ff0000');
  debouncedUpdateGauges();
};

const removeLevelColor = (index: number) => {
  if (config.levelColors.length > 1) {
    config.levelColors.splice(index, 1);
    debouncedUpdateGauges();
  }
};

// Watch for target line changes
watch(
  () => config.showTargetLine,
  newVal => {
    if (newVal && config.targetLine === null) {
      config.targetLine = 75;
    } else if (!newVal) {
      config.targetLine = null;
    }
  }
);

// Lifecycle
onMounted(() => {
  console.log('PlaygroundView mounted');
  initializeGauges();
});
</script>

<style scoped>
.sticky-config {
  position: sticky;
  top: 20px;
  max-height: 80vh;
  overflow-y: auto;
}

code {
  font-family: 'JetBrains Mono', 'Consolas', monospace;
}

.gauge-container-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 20px;
  background: #fafafa;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.gauge-inner-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 350px;
  transition: all 0.3s ease;
}

.gauge-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.gauge-container-wrapper .grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

#gauge-v1,
#gauge-v2 {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Fix for legacy gauge centering */
#gauge-v1 > div[style*='position: relative'] {
  margin: 0 auto !important;
}
</style>
