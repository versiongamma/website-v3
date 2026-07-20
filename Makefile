all: clean build
.PHONY: all

BUILD ?= debug
ZSTD_LEVEL ?= $(if $(filter release ,$(BUILD)),-19,-3)

clean:
	rm -rf build

build: clean
	pnpm build
	bun build .output/server/index.mjs --outfile=".output/server/app" --compile --bytecode
	rm .output/server/index.mjs
	zstd $(ZSTD_LEVEL) --rm .output/server/app
