CREATE TABLE projects_surveys (
	projectId INT NOT NULL,
    surveyId INT NOT NULL,

    FOREIGN KEY(projectId) REFERENCES projects(ID),
    FOREIGN KEY(surveyId) REFERENCES surveys(ID)
);

select * from projects_surveys;