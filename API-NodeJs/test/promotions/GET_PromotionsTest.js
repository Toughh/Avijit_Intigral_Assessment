/**
 * Import required packages
 */
require('mocha')
var config = require('config')
var assert = require('chai').assert

const requests = require('../../common/setup/request')

const timeout = config.get('timeout')

describe('Get promotions - Verify response', function () {
    this.timeout(timeout)
    let i
    let res
    let programType = ['episode', 'movie', 'series']

    it('TC0001: Get > Promotions > Validate json properties for each object', async function () {
        res = await requests.getPromotionsApiKey('GDMSTGExy0sVDlZMzNDdUyZ')
        assert.equal(res.status, 200, 'Actual status is ' + res.status)
        assert.exists(res.body.promotions, 'promotions does not exist')
        for (i = 0; i < res.body.promotions.length; i++) {
            assert.exists(res.body.promotions[i].promotionId, 'promotionId does not exist')
            assert.exists(res.body.promotions[i].orderId, 'orderId does not exist')
            assert.exists(res.body.promotions[i].promoArea, 'promoArea does not exist')
            assert.exists(res.body.promotions[i].promoType, 'promoType does not exist')
            assert.isBoolean(res.body.promotions[i].showPrice, 'showPrice is not boolean type')
            assert.isBoolean(res.body.promotions[i].showText, 'showText is not boolean type')
            assert.exists(res.body.promotions[i].localizedTexts.ar, 'localizedTexts with ar does not exist')
            assert.exists(res.body.promotions[i].localizedTexts.en, 'localizedTexts with en does not exist')
        }
    })

    it('TC0002: Get > Promotions > Validate promotionId and programType', async function () {
        res = await requests.getPromotionsApiKey('GDMSTGExy0sVDlZMzNDdUyZ')
        assert.equal(res.status, 200, 'Actual status is ' + res.status)
        assert.exists(res.body.promotions, 'promotions does not exist')
        for (i = 0; i < res.body.promotions.length; i++) {
            assert.typeOf(res.body.promotions[i].promotionId, 'string')
            assert.equal(res.body.promotions[i].properties[0].programType, programType[i], 'Actual programType is ' + res.body.promotions[i].properties[0].programType[i])
        }
    })

    it('TC0003: Get > Promotions > Validate response on passing invalid apikey', async function () {
        res = await requests.getPromotionsApiKey('WRONG')
        assert.equal(res.status, 403, 'Actual status is ' + res.status)
        assert.isNotNull(res.body.error.requestId, 'requestId has no content')
        assert.equal(res.body.error.code, '8001', 'Actual code is ' + res.body.error.code)
        assert.equal(res.body.error.message, 'invalid api key', 'Actual message is ' + res.body.error.message)
    })
})