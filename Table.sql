CREATE TABLE Users (
    userID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Schedules (
    scheduleID SERIAL PRIMARY KEY,
    owner UUID REFERENCES Users(userID),
    scheduleImage BYTEA, 
    scheduleData JSONB, 
    isValidated BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Groups (
    groupID SERIAL PRIMARY KEY,
    groupName VARCHAR(100) NOT NULL,
    inviteCode CHAR(6) UNIQUE NOT NULL,
    created_by UUID REFERENCES Users(userID),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE GroupMembers (
    groupID INT REFERENCES Groups(groupID),
    userID UUID REFERENCES Users(userID),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (groupID, userID)
);

CREATE TABLE SyncedSchedules (
    syncID SERIAL PRIMARY KEY,
    groupID INT REFERENCES Groups(groupID),
    syncedData JSONB,
    synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE OCRProcessing (
    ocrID SERIAL PRIMARY KEY,
    scheduleID INT REFERENCES Schedules(scheduleID),
    ocrEngineType VARCHAR(50),
    processedData JSONB, 
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);