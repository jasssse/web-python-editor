# Command to start the backend
start:
	@echo "Starting the backend..."
	@docker-compose up --build

# Command to stop the backend
stop:
	@echo "Stopping the backend..."
	@docker-compose down

# Command to build the backend
build:
	@echo "Building the backend..."
	@docker-compose build

# Command to restart the backend
restart: stop start

# Command to display logs
logs:
	@docker-compose logs -f

# Command to clean up all containers
clean:
	@echo "Removing containers..."
	@docker-compose down --rmi all -v --remove-orphans

.PHONY: start stop build restart logs clean
