CREATE TABLE IF NOT EXISTS bookings.bookings
(
    book_ref character(6) COLLATE pg_catalog."default" NOT NULL,
    book_date timestamp with time zone NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    CONSTRAINT bookings_pkey PRIMARY KEY (book_ref)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS bookings.bookings
    OWNER to postgres;

COMMENT ON TABLE bookings.bookings
    IS 'Bookings';

COMMENT ON COLUMN bookings.bookings.book_ref
    IS 'Booking number';

COMMENT ON COLUMN bookings.bookings.book_date
    IS 'Booking date';

COMMENT ON COLUMN bookings.bookings.total_amount
    IS 'Total booking cost';