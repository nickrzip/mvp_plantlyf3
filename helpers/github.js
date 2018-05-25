var axios = require('axios');
var config = require('../config');

const getAllRepos = function (username) {
    return new Promise ((resolve, reject) => {
        if (!username) {
          reject('Please enter a valid username');
        }
        let request = {
            url: `https://api.github.com/search/repositories?q=user:${username}`,
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${config.TOKEN}`
            }
        };
        // console.log('stuff:', request.url, request.headers);
        axios.get(request.url,request.headers).then((data) => {
            if (data.data.items.length === 0) {
              reject('This user had no publically available usernames');
            }
            resolve(data.data.items);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = getAllRepos;