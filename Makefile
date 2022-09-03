setup_env:
	cd TFService/src/main/resources; cp application_example.properties application.properties
	cd databases; cp .env_example .env; cp createDbUsers_example.sql init/3-createDbUsers.sql
	cd AuthService; cp .env_example .env

bootstrap:
	cd databases; docker-compose up -d

down:
	cd databases; docker-compose down

down_db:
	cd databases; docker-compose down --volumes

tfservice:
	cd TFService; ./gradlew bootRun

application:
	cd ReactApp; npm start

api_specs:
	cd APISpecs; http-server -c-1 -p 3001 . -o

generate_user_default_password:
	cd AuthService; npm run seed

auth_service:
	cd AuthService; npm start

file_server:
	cd file-server; npm start

run_dev:
	gnome-terminal -- sh -c "make tfservice"
	gnome-terminal -- sh -c "make auth_service"
	gnome-terminal -- sh -c "make file_server"
	gnome-terminal -- sh -c "make application"
	gnome-terminal -- sh -c "make api_specs"

build_tfservice:
	cd TFService; ./gradlew bootBuildImage --imageName=tfservice
build_app:
	cd ReactApp; npm run build

build_all:
	make build_tfservice;
	docker-compose build