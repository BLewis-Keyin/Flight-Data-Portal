CREATE TABLE public."Users"
(
    user_id serial NOT NULL,
    first_name character varying(24) NOT NULL,
    middle_name character varying(24),
    last_name character varying(48) NOT NULL,
    email character varying(48) NOT NULL,
    username character varying(12) NOT NULL,
    address_id integer,
    PRIMARY KEY (user_id),
    CONSTRAINT uq_username UNIQUE (username),
	CONSTRAINT uq_email UNIQUE (email),
);

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;