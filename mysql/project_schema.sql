
CREATE TABLE projects (
	ID   INT    AUTO_INCREMENT NOT NULL,
	projectName VARCHAR(50) NOT NULL,
	generalLength DECIMAL(8,2) NOT NULL,
	maxSpanLength INT NOT NULL,
    spans INT NOT NULL,
	maxWidth DECIMAL(30,2),
    foundation VARCHAR(50) NOT NULL,
    sketchFileUrl VARCHAR(200) NOT NULL,
	lat DECIMAL(30,14) NOT NULL,
	lon DECIMAL(30,14) NOT NULL,
    localX DECIMAL(30,14) NOT NULL,
	localY DECIMAL(30,14) NOT NULL,
    imageUrl VARCHAR(200) NOT NULL,
    projectStatus VARCHAR(50) NOT NULL,

    PRIMARY KEY (ID)
    -- FOREIGN KEY(uavOperators_id) REFERENCES users(ID)
);

INSERT INTO projects  (projectName, generalLength, maxSpanLength, spans, maxWidth,
          foundation, sketchFileUrl, lat, lon, localX, localY, imageUrl, projectStatus)
           VALUES ("asdasds",5,5,5,5,"asdasd","asdasdasd", 10.55555555,5,5,5,"asdasdsd",'asdd sdsddd');


DELETE FROM projects;
DROP TABLE projects;
TRUNCATE TABLE projects;
SELECT * FROM projects;
SELECT * FROM projects WHERE ID = 1;

SELECT *
FROM users
JOIN projects
    ON projects.uavOperators_id = users.ID;
