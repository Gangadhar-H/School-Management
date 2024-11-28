# Create Table query =>
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

# Project setup
npm init -y
npm install 

# live links
For adding school - https://school-management-ten-topaz.vercel.app/addSchool

For school lists - https://school-management-ten-topaz.vercel.app/listSchools?latitude= &longitude=

# Postman collection
https://elements.getpostman.com/redirect?entityId=37884927-bb7105b4-865d-4009-babb-1c65ed606e60&entityType=collection
