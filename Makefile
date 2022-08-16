bootstrap:
	cd db; docker-compose up -d

down:
	cd db; docker-compose down

down_db:
	cd db; docker-compose down --volumes

tfservice:
	cd TFService; ./gradlew bootRun

start_app:
	cd ReactApp; npm start

build_app:
	cd ReactApp; npm run build
	
api_specs:
	cd docs; http-server -c-1 -p 3000 . -o

generate_user:
	cd AuthService; npm run seed