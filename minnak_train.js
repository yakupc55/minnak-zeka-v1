import init, { YapoEngine, WebGpuContext } from "./pkg/web_yapo.js";

let engine = null;
let isTraining = false;
let lossHistory = [];
let gpuContext = null;

// Predefined trainer configuration presets with optimal optimizer algorithms
export const presets = {
  light: {
    d_char: 20,
    d_model: 20,
    n_layers: 1,
    n_networks: 10,
    lr: 0.0022,
    focus: 32,
    opt_type: 6, //LAMB (Scale-invariant, stable for deep layers)
  },
  medium: {
    d_char: 28,
    d_model: 28,
    n_layers: 1,
    n_networks: 14,
    focus: 32,
    lr: 0.0016,
    opt_type: 6, //LAMB (Scale-invariant, stable for deep layers)
  },
  deep: {
    d_char: 40,
    d_model: 40,
    n_layers: 1,
    n_networks: 20,
    focus: 32,
    lr: 0.0008,
    opt_type: 6, // LAMB (Scale-invariant, stable for deep layers)
  },
};

export async function bootstrap(onStatusUpdate) {
  await init();
  if (navigator.gpu) {
    try {
      gpuContext = await new WebGpuContext();
    } catch (e) {
      console.warn("WebGPU initialization failed", e);
    }
  }
  onStatusUpdate("ready");
}

export function initEngine(presetKey, formattedDataset, useGpu = false) {
  if (engine) {
    engine.free();
  }

  const cfg = presets[presetKey] || presets.medium;

  engine = new YapoEngine(
    cfg.d_char,
    cfg.d_model,
    1, // Heads
    cfg.n_layers,
    1, // Horizon
    1024, // Context
    cfg.focus, // Focus
    cfg.n_networks,
    0, // SiLU
    true, // Residual
    false, // BatchNorm
    true, // Seismic
    false, // Parallel Context
    false, // Layer Context
    cfg.lr,
    cfg.lr * 0.2,
    128, // Batch size
    10, // Max NPL params (Set to 10 to support active Store app parameters)
  );

  // Apply the preset's specific mathematical optimizer type
  engine.set_opt_type(cfg.opt_type);

  // Apply GPU configuration context if requested and available
  if (useGpu && gpuContext) {
    engine.set_gpu_context(gpuContext);
  } else {
    engine.clear_gpu_context();
  }

  // Force always using Tiktoken (2) for minnak_zeka
  engine.load_text(formattedDataset, 2);
  lossHistory = [];
  isTraining = false;
  return engine;
}

export function setGpuEnabled(enabled) {
  if (!engine) return;
  if (enabled && gpuContext) {
    engine.set_gpu_context(gpuContext);
  } else {
    engine.clear_gpu_context();
  }
}

export async function trainStep(steps, onStepComplete) {
  if (!engine) return;
  const loss = await engine.step_training(steps);
  const epoch = engine.get_epoch();
  onStepComplete(epoch, loss);
}

export function startResponseStream(prompt) {
  const engine = getEngine();
  if (!engine) return null;
  const formattedPrompt = `<|user|> ${prompt} <|end|> <|bot|>`;
  engine.stream_start(formattedPrompt);
  return engine;
}

export function getEngine() {
  return engine;
}
