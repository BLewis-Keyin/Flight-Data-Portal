CREATE TABLE public."Logins"
(
    id serial NOT NULL,
    username character varying(12) NOT NULL,
    password character varying(80) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_logins_username UNIQUE (username)
);

ALTER TABLE IF EXISTS public."Logins"
    OWNER to postgres;