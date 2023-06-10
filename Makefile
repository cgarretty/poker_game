start:
	@docker-compose up -d

open:
	@open http://localhost:8000

stop:
	@docker-compose down

restart:
	@docker-compose restart

build:
	@docker-compose build

logs:
	@docker-compose logs -f

migrations:
	@docker-compose exec web python manage.py makemigrations

migrate:
	@docker-compose exec web python manage.py migrate

createsuperuser:
	@docker-compose exec web python manage.py createsuperuser

static:
	@docker-compose exec web python manage.py collectstatic --no-input

shell:
	@docker-compose exec web python manage.py shell

test: #run tests with pytest
	@docker-compose exec web pytest -q
