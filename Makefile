KNOWN_TARGETS=up dev debug migration_create migration_generate migration_run build help 
ARGS := $(filter-out $(KNOWN_TARGETS),$(MAKECMDGOALS))

.DEFAULT: ; :""

.PHONE: build
build:
	npm run build

.PHONY: dev
dev:
	npm run start:dev

.PHONY: debug
debug:
	npm run start:debug

.PHONY: migration_create
migration_create:
	@echo "Creating a blank migration with name: $(ARGS)"
	npm run typeorm migration:create ./src/modules/database/migrations/$(ARGS)

.PHONY: migration_generate
migration_generate:
	npm run build \
	&& npm run typeorm migration:generate ./src/modules/database/migrations/$(ARGS) -- -d ./src/modules/database/utils/typeorm/default-typeorm-connection.ts

.PHONY: migration_run
migration_run:
	npm run build \
	&& npm run typeorm migration:run -- -d ./src/modules/database/utils/typeorm/default-typeorm-connection.ts

.PHONY: help
help:
	@echo "Available targets:"
	@echo "  dev                   									- Start the development server."
	@echo "  debug                 									- Start the server in debug mode."
	@echo "  migration_create    <migration_name>   - Create a new blank migration."
	@echo "  migration_generate  <migration_name>   - Create a new migration with differences between entities and database."
	@echo ""
	@echo "Usage:"
	@echo "  make <target>"