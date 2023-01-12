USE finalExercise2;

DROP TABLE IF EXISTS userinfo;
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS favoriteWebsite;
DROP TABLE IF EXISTS website;
DROP TABLE IF EXISTS user;

CREATE TABLE user(username VARCHAR(255) PRIMARY KEY, email VARCHAR(255) UNIQUE, password VARCHAR(255) NOT NULL);
CREATE TABLE userinfo(username VARCHAR(255) PRIMARY KEY, birthday DATE, country VARCHAR(255), avatarURL VARCHAR(255));
CREATE TABLE task(taskId INTEGER PRIMARY KEY, creatorUsername VARCHAR(255) NOT NULL, taskName VARCHAR(255) NOT NULL, taskCategory INTEGER NOT NULL, deadlineDate DATE, deadlineTime TIMESTAMP, status BOOLEAN NOT NULL);
CREATE TABLE website(websiteID INTEGER PRIMARY KEY, NAME VARCHAR(255) NOT NULL, url VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, clicks INTEGER NOT NULL, icon VARCHAR(255));
CREATE TABLE favoriteWebsite(username VARCHAR(255), websiteID INTEGER);

ALTER TABLE userinfo ADD CONSTRAINT FK_username FOREIGN KEY (username) REFERENCES user (username);
ALTER TABLE task ADD CONSTRAINT FK_creatorUsername_username FOREIGN KEY (creatorUsername) REFERENCES user (username);
ALTER TABLE favoriteWebsite ADD CONSTRAINT FK_username_FWB FOREIGN KEY (username) REFERENCES user (username);
ALTER TABLE favoriteWebsite ADD CONSTRAINT FK_websiteID_websiteID FOREIGN KEY (websiteID) REFERENCES website (websiteID);
