build:
	./node_modules/webpack-cli/bin/cli.js index.js

deploy:
	cf worker upload-worker --zone-id 019ca3dea8a8cef4cb35b1f3bafcff09 --script @dist/main.js

all: build deploy
