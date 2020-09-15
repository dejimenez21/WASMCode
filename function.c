#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
float add(float a, float b){
    return a + b;
}