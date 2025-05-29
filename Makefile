install:
	cp .env.example .env
	docker run --rm -v ./:/app -w /app composer install
	docker run --rm -v ./:/app -w /app node:latest npm install --force
	./vendor/bin/sail up -d --force-recreate
	make key-generate
	make run-front

db:
	make run-migrate
	make run-seed

up:
	./vendor/bin/sail up -d --force-recreate

key-generate:
	./vendor/bin/sail artisan key:generate

run-migrate:
	./vendor/bin/sail artisan migrate

run-seed:
	./vendor/bin/sail artisan db:seed

run-front:
	./vendor/bin/sail npm install --force && ./vendor/bin/sail npm run build
