exports.Login = (email, password) =>
{
let sql = 
`SELECT ID
FROM users
WHERE email = '${email}' and password = '${password}'
`;
return sql;
};

exports.Register = (email, password) =>
{
let sql = 
`INSERT INTO users (Email, Password) Values ('${email}', '${password}'); insert into data (userId, sunTime, waterIntake, totalProgress) values (LAST_INSERT_ID(), 0,0,0)`;
return sql;
};

exports.Save = (userId, sun, water, progress) =>
{
let sql = 
`UPDATE data 
SET SunTime = ${sun},
 WaterIntake = ${water}, 
 TotalProgress = ${progress}
WHERE UserId = ${userId};`;
return sql;
};

exports.Fetch = (userId) =>
{
let sql = 
`SELECT SunTime, WaterIntake, TotalProgress FROM data WHERE UserID = ${userId};`;
return sql;
};
