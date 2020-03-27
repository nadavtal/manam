CREATE TABLE messages (
	ID   INT    AUTO_INCREMENT NOT NULL,
	senderId INT NOT NULL,
    receiverId INT NOT NULL,
    projectId INT,
    messageType VARCHAR(20),
    messageSubject TEXT(100),
    messageContent TEXT(500),
    messageStatus VARCHAR(20),
    sentAt DATETIME ,
    FOREIGN KEY(senderId) REFERENCES users(ID),
    FOREIGN KEY(receiverId) REFERENCES users(ID),
    FOREIGN KEY(projectId) REFERENCES projects(ID),
    PRIMARY KEY (ID)

);
truncate table messages;
drop table messages;
select * from messages;


INSERT INTO messages  (senderId, receiverId, projectId, messageType, messageSubject,
      messageContent, messageStatus, sentAt)
       VALUES (1,2,1,'message',
       'zxc','zxczxc','unread', now());