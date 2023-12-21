-- Table: bookings.flights

-- DROP TABLE IF EXISTS bookings.flights;

CREATE TABLE IF NOT EXISTS bookings.flights
(
    flight_id integer NOT NULL DEFAULT nextval('flights_flight_id_seq'::regclass),
    flight_no character(6) COLLATE pg_catalog."default" NOT NULL,
    scheduled_departure timestamp with time zone NOT NULL,
    scheduled_arrival timestamp with time zone NOT NULL,
    departure_airport character(3) COLLATE pg_catalog."default" NOT NULL,
    arrival_airport character(3) COLLATE pg_catalog."default" NOT NULL,
    status character varying(20) COLLATE pg_catalog."default" NOT NULL,
    aircraft_code character(3) COLLATE pg_catalog."default" NOT NULL,
    actual_departure timestamp with time zone,
    actual_arrival timestamp with time zone,
    CONSTRAINT flights_pkey PRIMARY KEY (flight_id),
    CONSTRAINT flights_flight_no_scheduled_departure_key UNIQUE (flight_no, scheduled_departure),
    CONSTRAINT flights_aircraft_code_fkey FOREIGN KEY (aircraft_code)
        REFERENCES bookings.aircrafts_data (aircraft_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT flights_arrival_airport_fkey FOREIGN KEY (arrival_airport)
        REFERENCES bookings.airports_data (airport_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT flights_departure_airport_fkey FOREIGN KEY (departure_airport)
        REFERENCES bookings.airports_data (airport_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT flights_check CHECK (scheduled_arrival > scheduled_departure),
    CONSTRAINT flights_check1 CHECK (actual_arrival IS NULL OR actual_departure IS NOT NULL AND actual_arrival IS NOT NULL AND actual_arrival > actual_departure),
    CONSTRAINT flights_status_check CHECK (status::text = ANY (ARRAY['On Time'::character varying::text, 'Delayed'::character varying::text, 'Departed'::character varying::text, 'Arrived'::character varying::text, 'Scheduled'::character varying::text, 'Cancelled'::character varying::text]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS bookings.flights
    OWNER to postgres;

COMMENT ON TABLE bookings.flights
    IS 'Flights';

COMMENT ON COLUMN bookings.flights.flight_id
    IS 'Flight ID';

COMMENT ON COLUMN bookings.flights.flight_no
    IS 'Flight number';

COMMENT ON COLUMN bookings.flights.scheduled_departure
    IS 'Scheduled departure time';

COMMENT ON COLUMN bookings.flights.scheduled_arrival
    IS 'Scheduled arrival time';

COMMENT ON COLUMN bookings.flights.departure_airport
    IS 'Airport of departure';

COMMENT ON COLUMN bookings.flights.arrival_airport
    IS 'Airport of arrival';

COMMENT ON COLUMN bookings.flights.status
    IS 'Flight status';

COMMENT ON COLUMN bookings.flights.aircraft_code
    IS 'Aircraft code, IATA';

COMMENT ON COLUMN bookings.flights.actual_departure
    IS 'Actual departure time';

COMMENT ON COLUMN bookings.flights.actual_arrival
    IS 'Actual arrival time';