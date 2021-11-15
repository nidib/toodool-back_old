-- IMPORT UUID FUNCTION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE SCHEMA
CREATE SCHEMA IF NOT EXISTS "db";

-- DROP TABLE "db"."toodool";
-- DROP TABLE "db"."user_info";
-- DROP TABLE "db"."user";
-- DROP TABLE "db"."user_type";

-- USER TYPES TABLE
CREATE TABLE IF NOT EXISTS "db"."user_type" (
	"id" uuid DEFAULT uuid_generate_v4(),
	"type" VARCHAR(10) UNIQUE NOT NULL,

	PRIMARY KEY ("id")
);

-- INSERT INTO "db"."user_type"
-- 	("id", "type")
-- VALUES
-- 	('1f806d44-32cf-4ae7-8f63-76090710354d', 'MAS'),
-- 	('dadd431b-db59-4569-b0bd-d03a842e7ec8', 'USR');

-- USER WITH BASIC LOGIN INFO
CREATE TABLE IF NOT EXISTS "db"."user" (
	"id" uuid DEFAULT uuid_generate_v4(),
	"username" VARCHAR(255) UNIQUE NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"user_type_id" uuid DEFAULT 'dadd431b-db59-4569-b0bd-d03a842e7ec8' NOT NULL,
	
	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
	"updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),

	PRIMARY KEY ("id"),
	FOREIGN KEY ("user_type_id") REFERENCES "db"."user_type" ("id") ON DELETE CASCADE
);

-- USER INFO
CREATE TABLE IF NOT EXISTS "db"."user_info" (
	"id" uuid DEFAULT uuid_generate_v4(),
	"first_name" VARCHAR(50),
	"last_name" VARCHAR(50),
	"nickname" VARCHAR(50),
	"email" VARCHAR(100),
	"user_id" uuid NOT NULL,

	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
	"updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),

	PRIMARY KEY ("id"),
	FOREIGN KEY ("user_id") REFERENCES "db"."user" ("id") ON DELETE CASCADE
);

-- TOODOOL
CREATE TABLE IF NOT EXISTS "db"."toodool" (
	"id" uuid DEFAULT uuid_generate_v4(),
	"title" VARCHAR(50) UNIQUE NOT NULL,
	"description" VARCHAR(255),
	"completed" BOOLEAN DEFAULT FALSE,
	"user_id" uuid NOT NULL,

	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
	"updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),

	PRIMARY KEY ("id"),
	FOREIGN KEY ("user_id") REFERENCES "db"."user" ("id") ON DELETE CASCADE
);

-- INSERT INTO "db"."user"
-- 	("id", "username", "password", "user_type_id")
-- VALUES
-- 	('45e11511-28eb-43f1-8a8b-2bfb2b2c1a45', 'danibidin', '$2b$11$dmRqeTKhHq3wclgV8bwKhOTGMF4hTShHUEpdAa/l0GsAmYxzVZAZS', 'dadd431b-db59-4569-b0bd-d03a842e7ec8'),
-- 	('75ab53a0-4ff2-410c-9df4-78c3f0abd178', 'vinibidin', '$2b$11$K7elOJv1vHeDK3hTlddNRuUus8B5qKwKb9O0Xsvhx36x2rg.s41ke', 'dadd431b-db59-4569-b0bd-d03a842e7ec8'),
-- 	('a7c0199d-4922-4e7c-ad21-7906a1c13bef', 'richardbidin', '$2b$11$o9Uvd0YCnWhi5W92jWUEhe5wvT48LdHgDFt.SX2yBJGw2x4HqWKYe', 'dadd431b-db59-4569-b0bd-d03a842e7ec8');

-- INSERT INTO "db"."user_info"
-- 	("first_name", "last_name", "nickname", "email", "user_id")
-- VALUES
-- 	('Richard', 'Bidin', 'nidib', 'richardbidin@outlook.com', 'a7c0199d-4922-4e7c-ad21-7906a1c13bef'),
-- 	('Vinícios', 'B. Santos', 'bidinzin', NULL, '75ab53a0-4ff2-410c-9df4-78c3f0abd178'),
-- 	(NULL, NULL, NULL, NULL, '45e11511-28eb-43f1-8a8b-2bfb2b2c1a45');

-- INSERT INTO "db"."toodool"
-- 	("id", "title", "description", "completed", "user_id")
-- VALUES
-- 	('88f0ec74-2392-4851-9ac2-49acbb52dfd3', 'buy a house', 'buy a big ass house', FALSE, 'a7c0199d-4922-4e7c-ad21-7906a1c13bef'),
-- 	('a49e7641-dd62-48d0-85c8-7cfb21af67a6', 'buy an apartment', 'buy a big ass apartment', TRUE, 'a7c0199d-4922-4e7c-ad21-7906a1c13bef');