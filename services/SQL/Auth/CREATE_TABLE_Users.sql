-- Table: public.Users

-- DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    user_id integer NOT NULL DEFAULT nextval('"Users_user_id_seq"'::regclass),
    first_name character varying(24) COLLATE pg_catalog."default" NOT NULL,
    middle_name character varying(24) COLLATE pg_catalog."default",
    last_name character varying(48) COLLATE pg_catalog."default" NOT NULL,
    email character varying(48) COLLATE pg_catalog."default" NOT NULL,
    username character varying(12) COLLATE pg_catalog."default" NOT NULL,
    address_id integer,
    CONSTRAINT "Users_pkey" PRIMARY KEY (user_id),
    CONSTRAINT uq_email UNIQUE (email),
    CONSTRAINT uq_username UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;