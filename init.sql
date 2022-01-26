\c b4d1d34
CREATE EXTENSION ltree;
CREATE TABLE regions(
    id SERIAL PRIMARY KEY,
    path ltree NOT NULL UNIQUE,
    name text NOT NULL UNIQUE
);
INSERT INTO regions(path,name) VALUES ('2','Base 2');
INSERT INTO regions(path,name) VALUES ('1.1','Station 1.1');
INSERT INTO regions(path,name) VALUES ('1.1.1','Point 1.1.1');
INSERT INTO regions(path,name) VALUES ('1.2','Dock 1.2');
INSERT INTO regions(path,name) VALUES ('1','Base 1');
INSERT INTO regions(path,name) VALUES ('2.1','Dock 2.1');
INSERT INTO regions(path,name) VALUES ('2.1.1','Point 2.1.1');
INSERT INTO regions(path,name) VALUES ('2.1.2','Point 2.1.2');
INSERT INTO regions(path,name) VALUES ('2.1.1.3','Tiny 2.1.1.3');