import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Registration } from "../views/registration";
let axios = require("axios");

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
});

/**
 * Group tests under 'describe' block titled 'registration page'
 * to organize and label tests in Jest's output.
 */
describe("registration page", () => {
    // Clear all mocks before running each test
    // to ensure each test starts with a clean state
    beforeEach(() => {
        jest.clearAllMocks();
    })

    /**
     * Test 1: If API call resolves with 201 status,
     * expect UI to display "User Registered"
     */
    test('displays ', async() => {
        /**
         * Mock post method to resolve with status 201 (OK),
         * indicating successful signup response
         */
        apiClient.post.mockResolvedValue({ status: 201 });

        /**
         * Render Registration view component in a simulated DOM environment
         * to be "on screen" for testing
         */
        render(<Registration />);

        /**
         * Grab form fields from the DOM using placeholders/labels.
         * React Testing Library offers various query methods.
         */
        const firstName = screen.getByPlaceholderText('firstName');
        const lastName = screen.getByPlaceholderText('lastName');
        const email = screen.getByPlaceholderText('email');
        const password = screen.getByPlaceholderText('password');
        const confirmPassword = screen.getByPlaceholderText('confirmPassword');
        const registerButton = screen.getByPlaceholderText('Register');

        /**
         * Simulate user filling out the form, then submitting the form.
         */
        await userEvent.type(firstName, "test");
        await userEvent.type(lastName, "example");
        await userEvent.type(email, "test@example.com");
        await userEvent.type(password, "123");
        await userEvent.type(confirmPassword, "123");

        /**
         * Simulate user clicking button
         */
        userEvent.click(registerButton);

        /**
         * Wait until "Login" text appears, confirming
         * the component displays the success message
         */
        await waitFor(() => {
            expect(screen.getByText(/Login/i)).toBeInTheDocument();
        })
    })
})