install:
	docker run --rm -v ./:/app -w /app composer install
	docker run --rm -v ./:/app -w /app node:latest npm install --force
	./vendor/bin/sail up -d --force-recreate
	run-migrate
	run-seed

run-migrate:
	./vendor/bin/sail artisan migrate

run-seed:
	./vendor/bin/sail artisan db:seed
