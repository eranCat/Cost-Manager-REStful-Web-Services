/**
 * @fileoverview Integration tests for the application
 * @module test/test
 */
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

/**
 * Close database connection after all tests
 */
afterAll(async () => {
    await mongoose.connection.close(); // Ensure DB connection is closed after tests
});

describe('RESTful Web Services Tests', () => {
    /**
     * Test adding a new cost item
     */
    test('Add Cost Item', async () => {
        const response = await request(app)
            .post('/api/add')
            .send({ userid: '123123', description: 'Milk', category: 'food', sum: 10 });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('description', 'Milk');
        expect(response.body).toHaveProperty('category', 'food');
    });

    /**
     * Test getting monthly report
     */
    test('Get Monthly Report', async () => {
        const month = new Date().getMonth() + 1;
        const response = await request(app).get('/api/report?id=123123&year=2025&month='+ month);

        expect(response.statusCode).toBe(200);
        const body = response.body;
        expect(body).toHaveProperty('costs');
        expect(body.costs).toHaveProperty('food');
    });

    /**
     * Test getting user details
     */
    test('Get User Details', async () => {
        const response = await request(app).get('/api/users/123123');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('first_name');
        expect(response.body).toHaveProperty('last_name');
        expect(response.body).toHaveProperty('total');
    });

    /**
     * Test getting about team information
     */
    test('Get About Team', async () => {
        const response = await request(app).get('/api/about');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('first_name');
    });
});
