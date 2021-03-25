const TABLE_NAME = 'all-for-you';
const config = {
    PORT: 5000,
    DB_CONNECTION: `mongodb://localhost/${TABLE_NAME}`,
    SECRET: 'badumts',
    SALT: 10,
    COOKIE_NAME: 'USER_SESSION'
}

module.exports = config;