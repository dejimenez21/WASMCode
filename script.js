// const { freemem } = require("os");

let wasmExports = null;

let wasmMemory = new WebAssembly.Memory({initial: 256, maximum: 256});

let wasmTable = new WebAssembly.Table({
    'initial': 1,
    'maximum': 1,
    'element': 'anyfunc'
});

let asmLibraryArg = {
    "__handle_stack_overflow": ()=>{},
    "emscripten_resize_heap":()=>{},
    "__lock":()=>{},
    "__unlock":()=>{},
    "memory": wasmMemory,
    "__indirect_function_table": wasmTable
};

//var asmLibraryArg = { "__indirect_function_table": wasmTable, "emscripten_resize_heap": _emscripten_resize_heap, "memory": wasmMemory };

var info = {
    'env': asmLibraryArg,
    'wasi_snapshot_preview1': asmLibraryArg
};

async function loadWasm(){
    let response = await fetch('function.wasm');
    let bytes = await response.arrayBuffer();
    let wasmObj = await WebAssembly.instantiate(bytes, info);
    wasmExports = wasmObj.instance.exports;
}

loadWasm();