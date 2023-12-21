CREATE TABLE IF NOT EXISTS bookings.tickets
(
    ticket_no character(13) COLLATE pg_catalog."default" NOT NULL,
    book_ref character(6) COLLATE pg_catalog."default" NOT NULL,
    passenger_id character varying(20) COLLATE pg_catalog."default" NOT NULL,
    passenger_name text COLLATE pg_catalog."default" NOT NULL,
    contact_data jsonb,
    CONSTRAINT tickets_pkey PRIMARY KEY (ticket_no),
    CONSTRAINT tickets_book_ref_fkey FOREIGN KEY (book_ref)
        REFERENCES bookings.bookings (book_ref) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS bookings.tickets
    OWNER to postgres;

COMMENT ON TABLE bookings.tickets
    IS 'Tickets';

COMMENT ON COLUMN bookings.tickets.ticket_no
    IS 'Ticket number';

COMMENT ON COLUMN bookings.tickets.book_ref
    IS 'Booking number';

COMMENT ON COLUMN bookings.tickets.passenger_id
    IS 'Passenger ID';

COMMENT ON COLUMN bookings.tickets.passenger_name
    IS 'Passenger name';

COMMENT ON COLUMN bookings.tickets.contact_data
    IS 'Passenger contact information';