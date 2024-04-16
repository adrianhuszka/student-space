CREATE TABLE "user_entity" (
  "id" uuid PRIMARY KEY NOT NULL,
  "email" varchar(255) NOT NULL,
  "email_constraint" varchar(255) NOT NULL,
  "email_verified" boolean NOT NULL DEFAULT false,
  "enabled" boolean NOT NULL DEFAULT true,
  "federation_link" varchar(255),
  "first_name" varchar(255),
  "last_name" varchar(255),
  "realm_id" varchar(255),
  "username" varchar(255),
  "created_timestamp" bigint,
  "service_account_client_link" varchar(255),
  "not_before" integer NOT NULL DEFAULT 0
);

CREATE TABLE "credential" (
  "id" uuid PRIMARY KEY NOT NULL,
  "salt" bytea,
  "type" varchar(255) NOT NULL,
  "user_id" uuid NOT NULL,
  "created_date" bigint,
  "user_label" varchar(255),
  "secret_data" text,
  "credential_data" text,
  "priority" integer
);

CREATE TABLE "user_session" (
  "id" uuid PRIMARY KEY NOT NULL,
  "auth_method" varchar(255),
  "ip_address" varchar(255),
  "last_session_refresh" integer,
  "login_username" varchar(255),
  "realm_id" varchar(255),
  "remember_me" boolean NOT NULL DEFAULT false,
  "started" integer,
  "user_id" uuid NOT NULL,
  "user_session_state" integer,
  "broker_session_id" varchar(255),
  "broker_user_id" varchar(255)
);

CREATE TABLE "keycloak_role" (
  "id" uuid PRIMARY KEY NOT NULL,
  "client_realm_constraint" varchar(255),
  "client_role" boolean NOT NULL DEFAULT false,
  "description" varchar(255),
  "name" varchar(255) NOT NULL,
  "realm_id" uuid NOT NULL,
  "client" uuid NOT NULL,
  "realm" uuid
);

CREATE TABLE "user_role_mapping" (
  "user_id" uuid NOT NULL,
  "role_id" uuid NOT NULL,
  PRIMARY KEY ("user_id", "role_id")
);

CREATE TABLE "keycloak_group" (
  "id" uuid PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "parent_group" uuid,
  "realm_id" uuid NOT NULL
);

CREATE TABLE "user_group_membership" (
  "user_id" uuid NOT NULL,
  "group_id" uuid NOT NULL,
  PRIMARY KEY ("user_id", "group_id")
);

CREATE TABLE "group_role_mapping" (
  "role_id" uuid NOT NULL,
  "group_id" uuid NOT NULL,
  PRIMARY KEY ("role_id", "group_id")
);

CREATE TABLE "subject_group" (
  "id" uuid PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" varchar(255),
  "archived" boolean NOT NULL DEFAULT false,
  "deleted" boolean NOT NULL DEFAULT false,
  "parent_group" uuid,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL,
  "archived_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "subject_group_keycloak_group_mapping" (
  "subject_group_id" uuid NOT NULL,
  "keycloak_group_id" uuid NOT NULL,
  "role" integer NOT NULL,
  PRIMARY KEY ("subject_group_id", "keycloak_group_id")
);

CREATE TABLE "subject_group_user_membership" (
  "subject_group_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "role" integer NOT NULL,
  PRIMARY KEY ("subject_group_id", "user_id")
);

CREATE TABLE "news" (
  "id" uuid PRIMARY KEY NOT NULL,
  "subject_group_id" uuid NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" varchar(255)
);

CREATE TABLE "news_message" (
  "id" uuid PRIMARY KEY NOT NULL,
  "news_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "message" text NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);

CREATE TABLE "news_message_like" (
  "news_message_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  PRIMARY KEY ("news_message_id", "user_id")
);

CREATE TABLE "news_message_seen" (
  "news_message_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  PRIMARY KEY ("news_message_id", "user_id")
);

CREATE TABLE "forum" (
  "id" uuid PRIMARY KEY NOT NULL,
  "subject_group_id" uuid NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" varchar(255)
);

CREATE TABLE "forum_message" (
  "id" uuid PRIMARY KEY NOT NULL,
  "forum_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "message" text NOT NULL,
  "reply_to" uuid,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);

CREATE TABLE "forum_message_like" (
  "forum_message_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  PRIMARY KEY ("forum_message_id", "user_id")
);

CREATE TABLE "forum_message_seen" (
  "forum_message_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  PRIMARY KEY ("forum_message_id", "user_id")
);

CREATE TABLE "task" (
  "id" uuid PRIMARY KEY NOT NULL,
  "subject_group_id" uuid NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" varchar(255),
  "due_date" timestamp,
  "completed" boolean NOT NULL DEFAULT false
);

CREATE TABLE "task_user_assignment" (
  "task_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  PRIMARY KEY ("task_id", "user_id")
);

CREATE TABLE "task_handed_in" (
  "task_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "message" text,
  "file_path" varchar(255),
  "handed_in_at" timestamp,
  PRIMARY KEY ("task_id", "user_id")
);

CREATE TABLE "documents" (
  "id" uuid PRIMARY KEY NOT NULL,
  "subject_group_id" uuid NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" varchar(255)
);

CREATE TABLE "document_files" (
  "id" uuid PRIMARY KEY NOT NULL,
  "document_id" uuid NOT NULL,
  "file_path" varchar(255) NOT NULL,
  "uploaded_by" uuid NOT NULL,
  "uploaded_at" timestamp NOT NULL
);

CREATE TABLE "test" (
  "id" uuid PRIMARY KEY NOT NULL,
  "subject_group_id" uuid NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" varchar(255),
  "start_date" timestamp,
  "due_date" timestamp,
  "time_limit" time,
  "max_point" integer
);

CREATE TABLE "test_handed_in" (
  "test_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "handed_in_at" timestamp,
  "time_spent" time,
  "point" integer,
  PRIMARY KEY ("test_id", "user_id")
);

CREATE TABLE "test_question" (
  "id" uuid PRIMARY KEY NOT NULL,
  "test_id" uuid NOT NULL,
  "question" text NOT NULL,
  "question_type" integer NOT NULL,
  "point" integer
);

CREATE TABLE "test_question_answer" (
  "id" uuid PRIMARY KEY NOT NULL,
  "test_question_id" uuid NOT NULL,
  "answer" text NOT NULL,
  "correct" boolean NOT NULL DEFAULT false
);

CREATE TABLE "private_message" (
  "id" uuid PRIMARY KEY NOT NULL,
  "sender_id" uuid NOT NULL,
  "receiver_id" uuid NOT NULL,
  "message" text NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "private_message_seen" (
  "private_message_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  PRIMARY KEY ("private_message_id", "user_id")
);

CREATE TABLE "notification" (
  "id" uuid PRIMARY KEY NOT NULL,
  "user_id" uuid NOT NULL,
  "message" text NOT NULL,
  "created_at" timestamp NOT NULL,
  "seen" boolean NOT NULL DEFAULT false
);

ALTER TABLE "credential" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "user_session" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "user_role_mapping" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "user_role_mapping" ADD FOREIGN KEY ("role_id") REFERENCES "keycloak_role" ("id");
ALTER TABLE "keycloak_group" ADD FOREIGN KEY ("parent_group") REFERENCES "keycloak_group" ("id");
ALTER TABLE "user_group_membership" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "user_group_membership" ADD FOREIGN KEY ("group_id") REFERENCES "keycloak_group" ("id");
ALTER TABLE "group_role_mapping" ADD FOREIGN KEY ("role_id") REFERENCES "keycloak_role" ("id");
ALTER TABLE "group_role_mapping" ADD FOREIGN KEY ("group_id") REFERENCES "keycloak_group" ("id");
ALTER TABLE "subject_group" ADD FOREIGN KEY ("parent_group") REFERENCES "subject_group" ("id");
ALTER TABLE "subject_group_keycloak_group_mapping" ADD FOREIGN KEY ("subject_group_id") REFERENCES "subject_group" ("id");
ALTER TABLE "subject_group_keycloak_group_mapping" ADD FOREIGN KEY ("keycloak_group_id") REFERENCES "keycloak_group" ("id");
ALTER TABLE "subject_group_user_membership" ADD FOREIGN KEY ("subject_group_id") REFERENCES "subject_group" ("id");
ALTER TABLE "subject_group_user_membership" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "news" ADD FOREIGN KEY ("subject_group_id") REFERENCES "subject_group" ("id");
ALTER TABLE "news_message" ADD FOREIGN KEY ("news_id") REFERENCES "news" ("id");
ALTER TABLE "news_message" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "news_message_like" ADD FOREIGN KEY ("news_message_id") REFERENCES "news_message" ("id");
ALTER TABLE "news_message_like" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "news_message_seen" ADD FOREIGN KEY ("news_message_id") REFERENCES "news_message" ("id");
ALTER TABLE "news_message_seen" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "forum" ADD FOREIGN KEY ("subject_group_id") REFERENCES "subject_group" ("id");
ALTER TABLE "forum_message" ADD FOREIGN KEY ("forum_id") REFERENCES "forum" ("id");
ALTER TABLE "forum_message" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "forum_message" ADD FOREIGN KEY ("reply_to") REFERENCES "forum_message" ("id");
ALTER TABLE "forum_message_like" ADD FOREIGN KEY ("forum_message_id") REFERENCES "forum_message" ("id");
ALTER TABLE "forum_message_like" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "forum_message_seen" ADD FOREIGN KEY ("forum_message_id") REFERENCES "forum_message" ("id");
ALTER TABLE "forum_message_seen" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "task" ADD FOREIGN KEY ("subject_group_id") REFERENCES "subject_group" ("id");
ALTER TABLE "task_user_assignment" ADD FOREIGN KEY ("task_id") REFERENCES "task" ("id");
ALTER TABLE "task_user_assignment" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "task_handed_in" ADD FOREIGN KEY ("task_id") REFERENCES "task" ("id");
ALTER TABLE "task_handed_in" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "documents" ADD FOREIGN KEY ("subject_group_id") REFERENCES "subject_group" ("id");
ALTER TABLE "document_files" ADD FOREIGN KEY ("document_id") REFERENCES "documents" ("id");
ALTER TABLE "document_files" ADD FOREIGN KEY ("uploaded_by") REFERENCES "user_entity" ("id");
ALTER TABLE "test" ADD FOREIGN KEY ("subject_group_id") REFERENCES "subject_group" ("id");
ALTER TABLE "test_handed_in" ADD FOREIGN KEY ("test_id") REFERENCES "test" ("id");
ALTER TABLE "test_handed_in" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "test_question" ADD FOREIGN KEY ("test_id") REFERENCES "test" ("id");
ALTER TABLE "test_question_answer" ADD FOREIGN KEY ("test_question_id") REFERENCES "test_question" ("id");
ALTER TABLE "private_message" ADD FOREIGN KEY ("sender_id") REFERENCES "user_entity" ("id");
ALTER TABLE "private_message" ADD FOREIGN KEY ("receiver_id") REFERENCES "user_entity" ("id");
ALTER TABLE "private_message_seen" ADD FOREIGN KEY ("private_message_id") REFERENCES "private_message" ("id");
ALTER TABLE "private_message_seen" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");
ALTER TABLE "notification" ADD FOREIGN KEY ("user_id") REFERENCES "user_entity" ("id");