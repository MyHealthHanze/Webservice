var settings = {

    apiUrl: process.env.apiUrl || '/api/v1/',
    appPort: process.env.PORT || 1337,
    baseUrl: process.env.baseUrl || 'http://localhost:1337/api/v1/',
    secret: process.env.secret || 'Svj5HeJNAW2E3o2nAuOgEaUx',
    tokenExpiresInMinutes: process.env.tokenExpiresInMinutes || 360,
    numberOfAttemptsBeforeDisable: process.env.numberOfAttemptsBeforeDisable || 4,
    timeAccountDisabled: process.env.timeAccountDisabled || 15

};

export default settings;