CREATE TABLE IF NOT EXISTS bookings.seats
(
    aircraft_code character(3) COLLATE pg_catalog."default" NOT NULL,
    seat_no character varying(4) COLLATE pg_catalog."default" NOT NULL,
    fare_conditions character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT seats_pkey PRIMARY KEY (aircraft_code, seat_no),
    CONSTRAINT seats_aircraft_code_fkey FOREIGN KEY (aircraft_code)
        REFERENCES bookings.aircrafts_data (aircraft_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT seats_fare_conditions_check CHECK (fare_conditions::text = ANY (ARRAY['Economy'::character varying::text, 'Comfort'::character varying::text, 'Business'::character varying::text]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS bookings.seats
    OWNER to postgres;

COMMENT ON TABLE bookings.seats
    IS 'Seats';

COMMENT ON COLUMN bookings.seats.aircraft_code
    IS 'Aircraft code, IATA';

COMMENT ON COLUMN bookings.seats.seat_no
    IS 'Seat number';

COMMENT ON COLUMN bookings.seats.fare_conditions
    IS 'Travel class';