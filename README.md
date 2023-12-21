Flight Data Portal Documentation

The Flight Data Portal is a web application designed to manage and display flight information. It features user authentication, API endpoints for flight data, and a modular routing system. This documentation provides a brief overview and key information for developers working on or with the application.

Installation

    Clone the repository to your local machine.
        git clone github.com/BLewis-Keyin/S3FinalSprint-FSDB.git

    Install dependencies.
        npm install

    Start the application.
        node index.js

Database Setup

    The PostgreSQL databases are publicly accessible with the IP 24.137.80.247 on port 5434.
    Database scripts and backup TAR files are available in Services/SQL.

Access Information

    Host: 24.137.80.247
    Port: 5434

Configuration

    Global Debugging Flags:
        global.DEBUG: Controls global debugging messages.
        global.ROUTE_DEBUG: Enables debugging messages for routes.
        global.DAL_DEBUG: Enables debugging messages for the Data Access Layer (DAL).
        GLOBAL.LOG_DEBUG: Enables debugging messages for the log service.

    Local Debugging Flags:
        Each module may have a local DEBUG flag, allowing fine-grained control over debugging for specific sections.
Usage

    Access the application at http://localhost:3000.
    Explore various routes and functionalities, such as /flights, /logins, /login, /dashboard, and /api.

Support

    For any issues or questions, please open an issue on GitHub.

Notable Milestones

     Introduce Flights API and Database Integration
     https://github.com/BLewis-Keyin/S3FinalSprint-FSDB/commit/7f2373818a3f94487589f1ea24bb3b5633cab074

     Refactor Authentication System, Encrypt Passwords
     https://github.com/BLewis-Keyin/S3FinalSprint-FSDB/commit/0d26973bdb5fa4b2b6702fb82d50e8aced22c35f

     Introduction of Static CSS Serving
     https://github.com/BLewis-Keyin/S3FinalSprint-FSDB/commit/b97ed02b394178380fc440edb08371cbe39a1995

     Introduce Flight Search Feature
     https://github.com/BLewis-Keyin/S3FinalSprint-FSDB/commit/da8c75fa153c9bdacf5cb40f73c3b42a1149a319

     Introduce Authentication Requirements on Features
     https://github.com/BLewis-Keyin/S3FinalSprint-FSDB/commit/1e7d7df1742a84b19bd8cfb96a83e57b272f5a0f
     
     Add support for MongoDB in flights service module
     https://github.com/BLewis-Keyin/S3FinalSprint-FSDB/commit/932bc4c728d9df7f42e61c883646b89bcd8f4954

     implement Logging and Debugging System
     https://github.com/BLewis-Keyin/S3FinalSprint-FSDB/commit/35c61273d2982a20fbff1f53119c86aad8cd65b7

Known Issues

     - global.DEBUG does not work, but setting all the other global.DEBUG variables to true effectively does the same thing.
     - Editing a password will store it in the database unencrypted.


     
