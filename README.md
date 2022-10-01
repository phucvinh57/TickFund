# Init project

First, in `db/init`, copy file `users_example.sql` to file `users.sql` and remove example file.

```bash
cp ./db/init/users_example.sql ./db/init/users.sql
```

```bash
make bootstrap
```

## Run TFService

```bash
make start_tf
```

## Run docs

```bash
make api_specs
```

## ATTENTION: 