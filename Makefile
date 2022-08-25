setup_env:
	cd TFService/src/main/resources; cp application_example.properties application.properties
	cd databases; cp .env_example .env; cp createDbUsers_example.sql createDbUsers.sql
	cd AuthService; cp .env_example .env

bootstrap:
	cd databases; docker-compose up -d

down:
	cd databases; docker-compose down

down_db:
	cd databases; docker-compose down --volumes

tfservice:
	cd TFService; ./gradlew bootRun

start_app:
	cd ReactApp; npm start

build_app:
	cd ReactApp; npm run build
	
api_specs:
	cd APISpecs; http-server -c-1 -p 3001 . -o

generate_user:
	cd AuthService; npm run seed
