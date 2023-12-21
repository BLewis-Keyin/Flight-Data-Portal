CREATE TABLE IF NOT EXISTS bookings.boarding_passes
(
    ticket_no character(13) COLLATE pg_catalog."default" NOT NULL,
    flight_id integer NOT NULL,
    boarding_no integer NOT NULL,
    seat_no character varying(4) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT boarding_passes_pkey PRIMARY KEY (ticket_no, flight_id),
    CONSTRAINT boarding_passes_flight_id_boarding_no_key UNIQUE (flight_id, boarding_no),
    CONSTRAINT boarding_passes_flight_id_seat_no_key UNIQUE (flight_id, seat_no),
    CONSTRAINT boarding_passes_ticket_no_fkey FOREIGN KEY (ticket_no, flight_id)
        REFERENCES bookings.ticket_flights (ticket_no, flight_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS bookings.boarding_passes
    OWNER to postgres;

COMMENT ON TABLE bookings.boarding_passes
    IS 'Boarding passes';

COMMENT ON COLUMN bookings.boarding_passes.ticket_no
    IS 'Ticket number';

COMMENT ON COLUMN bookings.boarding_passes.flight_id
    IS 'Flight ID';

COMMENT ON COLUMN bookings.boarding_passes.boarding_no
    IS 'Boarding pass number';

COMMENT ON COLUMN bookings.boarding_passes.seat_no
    IS 'Seat number';