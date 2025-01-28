const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

afterAll(async () => {
    await mongoose.connection.close(); // Ensure DB connection is closed after tests
});

describe('RESTful Web Services Tests', () => {
    test('Add Cost Item', async () => {
        const response = await request(app)
            .post('/api/add')
            .send({ userid: '123123', description: 'Milk', category: 'food', sum: 10 });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('description', 'Milk');
        expect(response.body).toHaveProperty('category', 'food');
    });

    test('Get Monthly Report', async () => {
        const response = await request(app).get('/api/report?id=123123&year=2025&month=2');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('food');
    });

    test('Get User Details', async () => {
        const response = await request(app).get('/api/users/123123');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('first_name');
        expect(response.body).toHaveProperty('last_name');
        expect(response.body).toHaveProperty('total');
    });

    test('Get About Team', async () => {
        const response = await request(app).get('/api/about');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('first_name');
    });
});
