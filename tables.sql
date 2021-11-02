-- IMPORT UUID FUNCTION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE SCHEMA
CREATE SCHEMA "db";

-- USER TYPES TABLE
CREATE TABLE "db"."user_type" (
	"id" uuid DEFAULT uuid_generate_v4(),
	"type" VARCHAR(10) NOT NULL UNIQUE,

	PRIMARY KEY ("id")
);

-- USER WITH BASIC LOGIN INFO
CREATE TABLE "db"."user" (
	"id" uuid DEFAULT uuid_generate_v4(),
	"username" VARCHAR(255) UNIQUE NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"user_type_id" uuid NOT NULL
	
	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
	"updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),

	PRIMARY KEY ("id")
	FOREIGN KEY ("user_type_id") REFERENCES "db"."user_type" ("id") ON DELETE CASCADE
);

-- USER INFO
CREATE TABLE "db"."user_info" (
	"id" uuid DEFAULT uuid_generate_v4(),
	"first_name" VARCHAR(50) NOT NULL,
	"last_name" VARCHAR(50) NOT NULL,
	"user_type" VARCHAR(50) DEFAULT 'USR',
	"nickname" VARCHAR(50),
	"email" VARCHAR(100),
	"user_id" uuid NOT NULL,

	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
	"updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),

	PRIMARY KEY ("id"),
	FOREIGN KEY ("user_id") REFERENCES "db"."user" ("id") ON DELETE CASCADE
)

-- TOODOOL
CREATE TABLE "db"."toodool" (
	"id" uuid DEFAULT uuid_generate_v4(),
	"description" VARCHAR(255) UNIQUE NOT NULL,
	"completed" BOOLEAN DEFAULT false,
	"user_id" uuid NOT NULL,

	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
	"updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),

	PRIMARY KEY ("id"),
	FOREIGN KEY ("user_id") REFERENCES "db"."user" ("id") ON DELETE CASCADE
);