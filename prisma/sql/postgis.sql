CREATE EXTENSION postgis;
ALTER TABLE "User" ADD COLUMN geolocation geometry(point, 4326);
ALTER TABLE "Book" ADD COLUMN geolocation geometry(point, 4326);