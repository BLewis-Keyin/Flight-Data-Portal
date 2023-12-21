CREATE TABLE IF NOT EXISTS bookings.ticket_flights
(
    ticket_no character(13) COLLATE pg_catalog."default" NOT NULL,
    flight_id integer NOT NULL,
    fare_conditions character varying(10) COLLATE pg_catalog."default" NOT NULL,
    amount numeric(10,2) NOT NULL,
    CONSTRAINT ticket_flights_pkey PRIMARY KEY (ticket_no, flight_id),
    CONSTRAINT ticket_flights_flight_id_fkey FOREIGN KEY (flight_id)
        REFERENCES bookings.flights (flight_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT ticket_flights_ticket_no_fkey FOREIGN KEY (ticket_no)
        REFERENCES bookings.tickets (ticket_no) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT ticket_flights_amount_check CHECK (amount >= 0::numeric),
    CONSTRAINT ticket_flights_fare_conditions_check CHECK (fare_conditions::text = ANY (ARRAY['Economy'::character varying::text, 'Comfort'::character varying::text, 'Business'::character varying::text]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS bookings.ticket_flights
    OWNER to postgres;

COMMENT ON TABLE bookings.ticket_flights
    IS 'Flight segment';

COMMENT ON COLUMN bookings.ticket_flights.ticket_no
    IS 'Ticket number';

COMMENT ON COLUMN bookings.ticket_flights.flight_id
    IS 'Flight ID';

COMMENT ON COLUMN bookings.ticket_flights.fare_conditions
    IS 'Travel class';

COMMENT ON COLUMN bookings.ticket_flights.amount
    IS 'Travel cost';