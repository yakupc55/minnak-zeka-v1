/* tslint:disable */
/* eslint-disable */

/**
 * WebGPU acceleration manager executing WGSL pipelines on the browser's GPU context.
 */
export class WebGpuContext {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
}

export class YapoEngine {
    free(): void;
    [Symbol.dispose](): void;
    clear_gpu_context(): void;
    get_epoch(): number;
    get_vocab_size(): number;
    get_vocab_snapshot_json(): string;
    /**
     * Loads model parameters directly from raw binary bytes uploaded via browser, with support for 8, 16, and 32-bit dequantization
     */
    load_model_bytes(bytes: Uint8Array): boolean;
    load_text(text: string, t_type_idx: number): void;
    constructor(d_char: number, d_model: number, n_heads: number, n_layers: number, horizon: number, context_len: number, focus_len: number, n_networks: number, act_type_idx: number, use_residual: boolean, use_batch_norm: boolean, use_seismic_merger: boolean, split_context_parallel: boolean, split_context_layers: boolean, lr_model: number, lr_vocab: number, batch_size: number, max_npl_params: number);
    /**
     * Speed Optimized Inference (Direct Pre-cached evaluation avoiding memory reallocations)
     */
    predict(input: string, length: number, temp: number): string;
    /**
     * Exports model and vocab parameter tensors as a portable uncompressed binary byte array with quantization support
     */
    save_model_bytes(save_prec: number): Uint8Array;
    set_batch_size(val: number): void;
    set_gpu_context(ctx: WebGpuContext): void;
    set_layer_filter(idx: number): void;
    set_lr_model(val: number): void;
    set_lr_vocab(val: number): void;
    set_opt_type(idx: number): void;
    set_stochastic_freq(val: number): void;
    set_stochastic_pct(val: number): void;
    set_train_vocab(val: boolean): void;
    set_weight_strategy(idx: number): void;
    step_training(steps: number): Promise<number>;
    stream_start(input: string): void;
    stream_step(temp: number): string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_webgpucontext_free: (a: number, b: number) => void;
    readonly __wbg_yapoengine_free: (a: number, b: number) => void;
    readonly webgpucontext_new_js: () => any;
    readonly yapoengine_clear_gpu_context: (a: number) => void;
    readonly yapoengine_get_epoch: (a: number) => number;
    readonly yapoengine_get_vocab_size: (a: number) => number;
    readonly yapoengine_get_vocab_snapshot_json: (a: number) => [number, number];
    readonly yapoengine_load_model_bytes: (a: number, b: number, c: number) => number;
    readonly yapoengine_load_text: (a: number, b: number, c: number, d: number) => void;
    readonly yapoengine_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number) => number;
    readonly yapoengine_predict: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly yapoengine_save_model_bytes: (a: number, b: number) => [number, number];
    readonly yapoengine_set_batch_size: (a: number, b: number) => void;
    readonly yapoengine_set_gpu_context: (a: number, b: number) => void;
    readonly yapoengine_set_layer_filter: (a: number, b: number) => void;
    readonly yapoengine_set_lr_model: (a: number, b: number) => void;
    readonly yapoengine_set_lr_vocab: (a: number, b: number) => void;
    readonly yapoengine_set_opt_type: (a: number, b: number) => void;
    readonly yapoengine_set_stochastic_freq: (a: number, b: number) => void;
    readonly yapoengine_set_stochastic_pct: (a: number, b: number) => void;
    readonly yapoengine_set_train_vocab: (a: number, b: number) => void;
    readonly yapoengine_set_weight_strategy: (a: number, b: number) => void;
    readonly yapoengine_step_training: (a: number, b: number) => any;
    readonly yapoengine_stream_start: (a: number, b: number, c: number) => void;
    readonly yapoengine_stream_step: (a: number, b: number) => [number, number];
    readonly wasm_bindgen__convert__closures_____invoke__ha3fc3a660cd53d94: (a: number, b: number, c: any) => [number, number];
    readonly wasm_bindgen__convert__closures_____invoke__h5d2b72d30e2f7453: (a: number, b: number, c: any, d: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h0a93edd5bf26d7ea: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h0a93edd5bf26d7ea_2: (a: number, b: number, c: any) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_destroy_closure: (a: number, b: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
