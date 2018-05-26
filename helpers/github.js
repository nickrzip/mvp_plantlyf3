var axios = require('axios');
var config = require('../config');

const getAllRepos = function (username) {
    if (!username) {
        throw 'Please enter a valid username';
    }
    let request = {
        url: `https://api.github.com/search/repositories?q=user:${username}`,
        headers: {
            'User-Agent': 'request',
            'Authorization': `token ${config.TOKEN}`
        }
    };
    // console.log('stuff:', request.url, request.headers);
    return axios.get(request.url, request.headers).then((data) => {
        if (data.data.items.length === 0) {
            return 'This user had no publically available usernames';
        }
        return (data.data.items);
    })
}

module.exports = getAllRepos;