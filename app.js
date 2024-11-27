const express = require('express');
const addSchool = require('./routes/addSchool');
const listSchools = require('./routes/listSchools');

const app = express();

app.use(express.urlencoded({ extended: true }));


// Routes
app.use(addSchool);
app.use(listSchools);

const PORT = 8000;
app.listen(PORT,
    () => console.log(`Server running on port ${PORT}`));
