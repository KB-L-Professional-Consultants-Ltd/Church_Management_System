CREATE TABLE "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(120) NOT NULL,
	"email" varchar(160) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "members_email_unique" UNIQUE("email")
);
