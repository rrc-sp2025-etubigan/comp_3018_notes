import request from "supertest";
import app from "../src/app";
import * as itemService from "../src/api/v1/services/itemService"
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository"
import { auth } from "../config/firebaseConfig";

jest.mock("../config/firebaseConfig");

describe("POST /api/v1/items - Authentication and Authorization Integration",
    () => {
    it("should return 401 with proper error format when no token provided",
    async() => {
        // Act
        const response = await request(app)
            .post("/api/v1/items")
            .send({ name: "Test", quantity: 100, category: "tool" });
        
        // Assert
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            success: false,
            error: {
                message: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
            },
            timestamp: expect.any(String),
        });

    });

    it("should return 403 with proper error format when user lacks role", 
    async() => {
        // Arrange
        // User role, but requires admin/manager
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "user123",
            role: "user",
        });

        // Act
        const response = await request(app)
            .post("/api/v1/items")
            .set("Authorization", "Bearer valid-token")
            .send({ name: "Test 2", quantity: 50, category: "food" });

        // Assert
        expect(response.status).toBe(403);
        expect(response.body).toMatchObject({
            success: false,
            error: {
                message: "Forbidden: Insufficient role",
                code: "INSUFFICIENT_ROLE",
            },
            timestamp: expect.any(String),
        });

    });

    it("should succeed when user has proper role and token",
    async() => {
        // Arrange
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "admin123",
            role: "admin",
        });

        const mockRepositoryResponse = {
            id: "testId_001"
        }

        const mockServiceResponse = {
            ...mockRepositoryResponse,
            name: "Test 3",
            quantity: 67,
            category: "food",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValueOnce({ id: "testId_001" });

        (itemService.createItem as jest.Mock).mockResolvedValue(mockServiceResponse);
        
        // Act
        const response = await request(app)
        .post("/api/v1/items")
        .set("Authorization", "Bearer valid-token")
        .send({ name: "Test 3", quantity: 67, category: "food" });
        
        // Assert
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
    })
});