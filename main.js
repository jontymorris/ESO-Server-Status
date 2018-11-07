const rp = require("request-promise");
const cheerio = require("cheerio");
const promise = require("promise");

const options = {
    uri: "https://esoserverstatus.net/",
    transform: function(body) {
        return cheerio.load(body);
    }
};

module.exports.getServers = function() {
    let servers = {};

    return new promise(function(fufill, reject){
        rp(options)
        .then(function($) {
            $(".list-group-item").each(function() {
                let title = $(this).find("h4").first().text().trim();
                let status = $(this).find("p").first().text().trim();
    
                servers[title] = status;
            });
            
            fufill(servers);
        })
        .error(function(err) {
            reject(err);
        });
    });
}