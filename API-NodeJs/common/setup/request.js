/**
 * Import required packages
 */
var config = require('config')
var endpoint = require('../endpoint')
var request = require('supertest')

/*
 * Set global variables
 */
const baseurl = config.get('base.url')
const proxy = config.get('base.proxy')
const url = request(baseurl + proxy)

/**
 * Set endpoints used in tests
 */
const promotionsEndpoint = endpoint.core.promotions

module.exports = {
    getPromotionsApiKey: async function (apikey) {
        console.log("\t Get Promotions corresponding to apikey")
        let result = await url.get(promotionsEndpoint)
            .query({
                'apikey': apikey
            })

        return result
    }
}
