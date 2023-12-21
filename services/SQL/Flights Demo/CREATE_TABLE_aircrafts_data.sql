CREATE TABLE IF NOT EXISTS bookings.aircrafts_data
(
    aircraft_code character(3) COLLATE pg_catalog."default" NOT NULL,
    model jsonb NOT NULL,
    range integer NOT NULL,
    CONSTRAINT aircrafts_pkey PRIMARY KEY (aircraft_code),
    CONSTRAINT aircrafts_range_check CHECK (range > 0)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS bookings.aircrafts_data
    OWNER to postgres;

COMMENT ON TABLE bookings.aircrafts_data
    IS 'Aircrafts (internal data)';

COMMENT ON COLUMN bookings.aircrafts_data.aircraft_code
    IS 'Aircraft code, IATA';

COMMENT ON COLUMN bookings.aircrafts_data.model
    IS 'Aircraft model';

COMMENT ON COLUMN bookings.aircrafts_data.range
    IS 'Maximal flying distance, km';