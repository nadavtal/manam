CREATE TABLE surveys (
	ID  INT    AUTO_INCREMENT NOT NULL,
	BID INT, 
	survey_type VARCHAR(50) NOT NULL,
	Survey_date DATETIME NOT NULL,
	surveyor VARCHAR(50) NOT NULL,
	company VARCHAR(50) NOT NULL,
	entire_structure VARCHAR(50) NOT NULL,
	immediate_attention VARCHAR(50) NOT NULL,
	survey_purpose VARCHAR(50) NOT NULL,
	Near_by_structures VARCHAR(50) NOT NULL,
	traffic_on VARCHAR(50) NOT NULL,
	height_limit VARCHAR(50) NOT NULL,
	load_limit VARCHAR(50) NOT NULL,
	other_limit VARCHAR(50) NOT NULL,
	partial_traffic VARCHAR(50) NOT NULL,
	supported_structure VARCHAR(50) NOT NULL,
	CPI_AVG DECIMAL(10,2),
	CPI_CRIT DECIMAL(10,2),
	Next_survey_date DATETIME,
	next_survey_type VARCHAR(50) NOT NULL,
	Pre_survey DATETIME,
	SCS_AVG DECIMAL(10,2),
	SCS_CRIT DECIMAL(10,2),
	Revision VARCHAR(50) NOT NULL,
	Revised_By VARCHAR(50) NOT NULL,
	remarks VARCHAR(250) NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY(BID) REFERENCES projects(ID)

);

INSERT INTO surveys (
BID,
survey_type,
Survey_date,
surveyor,
company,
entire_structure,
immediate_attention,
survey_purpose,
Near_by_structures,
traffic_on,
height_limit,
load_limit,
other_limit,
partial_traffic,
supported_structure,
CPI_AVG,
CPI_CRIT,
Next_survey_date,
next_survey_type,
Pre_survey,
SCS_AVG,
SCS_CRIT,
Revision,
Revised_By,
remarks)
VALUES (
1,
"survey type",
now(),
"surveyor",
"company",
"entire_structure",
"immediate_attention",
"survey_purpose",
"Yes",
"No",
"Yes",
"Yes",
"Yes",
"No",
"No",
23.33,
23.24,
now(),
"next_survey_type",
now(),
23.33,
23.24,
"Revision",
"Revised_By",
"remarks");

SELECT * FROM surveys;
DROP TABLE surveys;