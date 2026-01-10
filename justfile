set quiet

docker-options := '-it'
binary-options := ''

# Default recipe to display help information
[private]
default:
  just --list --unsorted

# Up containers
[no-exit-message]
up *args='':
    docker compose up -d {{args}}

# Restart containers
[no-exit-message]
restart *args='':
    docker compose restart {{args}}

# Show logs of a containers
[no-exit-message]
logs *args='':
    docker compose logs -f {{args}}

# Run eslint
[no-exit-message]
eslint *args='':
    docker compose exec {{docker-options}} jacem-chaieb-me yarn run precommit-lint {{binary-options}} {{args}}

# Run stylelint
[no-exit-message]
stylelint *args='':
    docker compose exec {{docker-options}} jacem-chaieb-me yarn run precommit-stylelint {{binary-options}} {{args}}

# yarn binary
[no-exit-message]
yarn *args='':
    docker compose exec {{docker-options}} jacem-chaieb-me yarn {{binary-options}} {{args}}

# Enter in a container shell
[no-exit-message]
sh container='jacem-chaieb-me' binary='sh':
    docker compose exec -it {{container}} {{binary}}

# Run Playwright e2e tests
[no-exit-message]
test *args='':
    docker compose exec {{docker-options}} jacem-chaieb-me yarn test:e2e {{args}}

# Update baseline screenshots
[no-exit-message]
test-update-snapshots *args='':
    docker compose exec {{docker-options}} jacem-chaieb-me yarn test:e2e --update-snapshots {{args}}

# Show Playwright test report
[no-exit-message]
test-report:
    docker compose exec {{docker-options}} jacem-chaieb-me yarn playwright show-report --host 0.0.0.0
