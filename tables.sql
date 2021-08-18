-- USER WITH BASIC LOGIN INFO
CREATE TABLE "user" (
	"id" uuid DEFAULT uuid_generate_v4(),
	"username" VARCHAR(255) UNIQUE NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	
	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
	"updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),

	PRIMARY KEY ("id")
);

-- USER INFO WITH MORE DATA ON USER
CREATE TABLE "user_info" (
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
	FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
)

-- TODO
CREATE TABLE "toodool" (
	"id" uuid DEFAULT uuid_generate_v4(),
	"description" VARCHAR(255) UNIQUE NOT NULL,
	"completed" BOOLEAN DEFAULT false,
	"user_id" uuid NOT NULL,

	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
	"updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),

	PRIMARY KEY ("id"),
	FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
);