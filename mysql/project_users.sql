CREATE TABLE projects_users (
	projectId INT NOT NULL,
    userId INT NOT NULL,

    FOREIGN KEY(projectId) REFERENCES projects(ID),
    FOREIGN KEY(userId) REFERENCES users(ID)
);

INSERT INTO projects_users (projectId, userId) VALUES (2, 3);

SELECT * FROM projects_users;
DROP TABLE projects_users;
TRUNCATE TABLE projects_users;

SELECT projectName , firstName
FROM projects p
INNER JOIN projects_users pu
ON pu.projectId = p.ID
INNER JOIN users u
ON u.ID = pu.userId;

SELECT p.ID, projectName , u.ID, firstName, lastName, role
  FROM projects p
  INNER JOIN projects_users pu
  ON pu.projectId = p.ID
  INNER JOIN users u
  ON u.ID = pu.userId
  WHERE p.projectId = 1;




SELECT * FROM projects WHERE ID = 2 ;
SELECT * FROM projects_users pu WHERE pu.projectId = 2
