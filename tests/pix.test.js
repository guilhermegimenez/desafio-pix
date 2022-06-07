// const pixController = require("../api/controllers/pixController");
const app = require('../config/express')();
const request = require("supertest");
const { cpf } = require('cpf-cnpj-validator');

describe('POST /api/pix/retry-transaction', function () {
    /*Pix Schema Example
        {
            cpf: 00000000000,
            email: "x@x.*",
            telefone: +5500000000000,
        }
    */

    // Testing Bad Request # Status Code: 400
    it('Bad Request 400 - Send invalid JSON without all properties', async function () {
        const response = await request(app).post("/api/pix/retry-transaction").send({}).set('Accept', 'application/json')
        expect(response.status).toEqual(400);
    });
    it('Bad Request 400 - Send invalid JSON without keyType', async function () {
        const response = await request(app).post("/api/pix/retry-transaction")
            .send(
                {
                    key: "00000000000"
                }
            )
            .set('Accept', 'application/json')
        expect(response.status).toEqual(400);
    });
    it('Bad Request 400 - Send invalid JSON without key', async function () {
        const response = await request(app).post("/api/pix/retry-transaction")
            .send(
                {
                    keyType: {
                        _id: 1,
                        value: "CPF"
                    }
                }
            )
            .set('Accept', 'application/json')
        expect(response.status).toEqual(400);
    });
    it('Bad Request 400 - Send invalid JSON with invalid cpf', async function () {
        const response = await request(app).post("/api/pix/retry-transaction")
            .send(
                {
                    keyType: {
                        _id: 1,
                        value: "CPF"
                    },
                    key: "00000000000"
                }
            )
            .set('Accept', 'application/json')
        expect(response.status).toEqual(400);
    });
    it('Bad Request 400 - Send invalid JSON with invalid email', async function () {
        const response = await request(app).post("/api/pix/retry-transaction")
            .send(
                {
                    keyType: {
                        _id: 2,
                        value: "Email"
                    },
                    key: "bademail.com"
                }
            )
            .set('Accept', 'application/json')
        expect(response.status).toEqual(400);
    });
    it('Bad Request 400 - Send invalid JSON with invalid phone number', async function () {
        const response = await request(app).post("/api/pix/retry-transaction")
            .send(
                {
                    keyType: {
                        _id: 3,
                        value: "Phone"
                    },
                    key: "-A00000000000"
                }
            )
            .set('Accept', 'application/json')
        expect(response.status).toEqual(400);
    });
    it('Bad Request 400 - Send invalid JSON with invalid Key Type _id', async function () {
        const response = await request(app).post("/api/pix/retry-transaction")
            .send(
                {
                    keyType: {
                        _id: 4,
                        value: "Invalid"
                    },
                    key: "00000000000"
                }
            )
            .set('Accept', 'application/json')
        expect(response.status).toEqual(400);
    });

    // Testing Success # Status Code: 200
    it('Success 200 - Send JSON with valid CPF and transaction pending', async function () {
        const response = await request(app).post("/api/pix/retry-transaction")
            .send(
                {
                    keyType: {
                        _id: 1,
                        value: "CPF"
                    },
                    key: '12175163016'//cpf.generate()
                }
            )
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
    });
});