bootstrap:
	cd db; docker-compose up -d

drop_db:
	cd db; docker-compose down --volumes

start_tf:
	cd TFService; ./gradlew bootRun

start_app:
	cd ReactApp; npm start

build_app:
	cd ReactApp; npm run build
	
api_specs:
	cd docs; http-server -c-1 -p 3000 . -o