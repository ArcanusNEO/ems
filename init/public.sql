/*
 Navicat Premium Data Transfer

 Source Server         : pglocal
 Source Server Type    : PostgreSQL
 Source Server Version : 150002 (150002)
 Source Host           : localhost:5432
 Source Catalog        : ems
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150002 (150002)
 File Encoding         : 65001

 Date: 02/07/2023 02:14:02
*/


-- ----------------------------
-- Sequence structure for exam_eid_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."exam_eid_seq";
CREATE SEQUENCE "public"."exam_eid_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."exam_eid_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for problem_pid_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."problem_pid_seq";
CREATE SEQUENCE "public"."problem_pid_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."problem_pid_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for user_uid_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_uid_seq";
CREATE SEQUENCE "public"."user_uid_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."user_uid_seq" OWNER TO "postgres";

-- ----------------------------
-- Table structure for exam
-- ----------------------------
DROP TABLE IF EXISTS "public"."exam";
CREATE TABLE "public"."exam" (
  "eid" int4 NOT NULL DEFAULT nextval('exam_eid_seq'::regclass),
  "label" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "teacher" varchar(255) COLLATE "pg_catalog"."default",
  "during" tstzrange NOT NULL,
  "status" int4 NOT NULL DEFAULT 0,
  "editTime" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."exam" OWNER TO "postgres";

-- ----------------------------
-- Table structure for examUser
-- ----------------------------
DROP TABLE IF EXISTS "public"."examUser";
CREATE TABLE "public"."examUser" (
  "eid" int4 NOT NULL,
  "uid" int4 NOT NULL,
  "score" float4 NOT NULL DEFAULT 0
)
;
ALTER TABLE "public"."examUser" OWNER TO "postgres";

-- ----------------------------
-- Table structure for problem
-- ----------------------------
DROP TABLE IF EXISTS "public"."problem";
CREATE TABLE "public"."problem" (
  "pid" int4 NOT NULL DEFAULT nextval('problem_pid_seq'::regclass),
  "label" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" jsonb,
  "answer" jsonb,
  "editTime" timestamptz(6) NOT NULL,
  "type" int4 NOT NULL DEFAULT 0,
  "eid" int4 NOT NULL,
  "score" float4 NOT NULL
)
;
ALTER TABLE "public"."problem" OWNER TO "postgres";

-- ----------------------------
-- Table structure for solution
-- ----------------------------
DROP TABLE IF EXISTS "public"."solution";
CREATE TABLE "public"."solution" (
  "sid" int4 NOT NULL,
  "uid" int4 NOT NULL,
  "pid" int4 NOT NULL,
  "score" float4 NOT NULL DEFAULT 0,
  "status" int4 NOT NULL DEFAULT 0,
  "editTime" timestamptz(6) NOT NULL,
  "answer" jsonb
)
;
ALTER TABLE "public"."solution" OWNER TO "postgres";

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "uid" int4 NOT NULL DEFAULT nextval('user_uid_seq'::regclass),
  "gid" int4 NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "nickname" varchar(255) COLLATE "pg_catalog"."default",
  "signupTime" timestamptz(6),
  "status" int4 NOT NULL DEFAULT 0,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."user" OWNER TO "postgres";

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."exam_eid_seq"
OWNED BY "public"."exam"."eid";
SELECT setval('"public"."exam_eid_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."problem_pid_seq"
OWNED BY "public"."problem"."pid";
SELECT setval('"public"."problem_pid_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_uid_seq"
OWNED BY "public"."user"."uid";
SELECT setval('"public"."user_uid_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table exam
-- ----------------------------
ALTER TABLE "public"."exam" ADD CONSTRAINT "exam_pkey" PRIMARY KEY ("eid");

-- ----------------------------
-- Uniques structure for table examUser
-- ----------------------------
ALTER TABLE "public"."examUser" ADD CONSTRAINT "examUser_eid_uid_key" UNIQUE ("eid", "uid") WITH (fillfactor=50);

-- ----------------------------
-- Primary Key structure for table examUser
-- ----------------------------
ALTER TABLE "public"."examUser" ADD CONSTRAINT "examUser_pkey" PRIMARY KEY ("eid", "uid");

-- ----------------------------
-- Primary Key structure for table problem
-- ----------------------------
ALTER TABLE "public"."problem" ADD CONSTRAINT "problem_pkey" PRIMARY KEY ("pid");

-- ----------------------------
-- Uniques structure for table solution
-- ----------------------------
ALTER TABLE "public"."solution" ADD CONSTRAINT "solution_uid_pid_key" UNIQUE ("uid", "pid") WITH (fillfactor=50);

-- ----------------------------
-- Primary Key structure for table solution
-- ----------------------------
ALTER TABLE "public"."solution" ADD CONSTRAINT "solution_pkey" PRIMARY KEY ("sid");

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("uid");

-- ----------------------------
-- Foreign Keys structure for table examUser
-- ----------------------------
ALTER TABLE "public"."examUser" ADD CONSTRAINT "examUser_eid_fkey" FOREIGN KEY ("eid") REFERENCES "public"."exam" ("eid") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."examUser" ADD CONSTRAINT "examUser_uid_fkey" FOREIGN KEY ("uid") REFERENCES "public"."user" ("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table problem
-- ----------------------------
ALTER TABLE "public"."problem" ADD CONSTRAINT "problem_eid_fkey" FOREIGN KEY ("eid") REFERENCES "public"."exam" ("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table solution
-- ----------------------------
ALTER TABLE "public"."solution" ADD CONSTRAINT "solution_pid_fkey" FOREIGN KEY ("pid") REFERENCES "public"."problem" ("pid") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."solution" ADD CONSTRAINT "solution_uid_fkey" FOREIGN KEY ("uid") REFERENCES "public"."user" ("uid") ON DELETE CASCADE ON UPDATE CASCADE;
