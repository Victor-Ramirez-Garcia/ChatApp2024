import apiClient from '../src/lib/api-client';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useNavigate } from 'react-router-dom';
import { Registration } from '../src/views/registration';

jest.mock('../src/lib/api-client', () => ({
    post: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(), // Mock useNavigate
}));

/**
 * Group tests under 'describe' block titled 'registration page'
 * to organize and label tests in Jest's output.
 */
describe("registration page", () => {
    let originalLog;

    beforeAll(() => {
        originalLog = console.log;
        console.log = jest.fn(); // No-op for logs
    });

    afterAll(() => {
        console.log = originalLog;
    });

    // Clear all mocks before running each test
    // to ensure each test starts with a clean state
    beforeEach(() => {
        jest.clearAllMocks();
    })

    /**
     * Test 1: If API call resolves with 201 status,
     * expect UI to go to "/" route
     */
    test('navigates to "/" route on successful registration', async() => {
        // create mock function for useNavigate
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

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
        const firstName = screen.getByRole('textbox', { name: "First Name:" });
        const lastName = screen.getByRole('textbox', { name: "Last Name:" });
        const email = screen.getByRole('textbox', { name: "Email:" });
        const password = screen.getByRole('textbox', { name: "Password:" });
        const confirmPassword = screen.getByRole('textbox', { name: "Confirm Password:" });
        const registerButton = screen.getByRole('button', { name: "Register" });

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
        await userEvent.click(registerButton);

        /**
         * Wait until "Login" text appears, confirming
         * the component displays the success message
         */
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        })
    })
    
    /**
     * Test 2: If API call rejects, expect UI to display
     * "First name is required" as an error message
     */
    test("displays 'First name is required' when register fails", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 400,
            response: {
            data: {
                errors: {
                0: { path: 'firstName', message: 'First name is required' },
                },
            },
            },
        });

        render(<Registration />);

        const lastName = screen.getByRole('textbox', { name: "Last Name:" });
        const email = screen.getByRole('textbox', { name: "Email:" });
        const password = screen.getByRole('textbox', { name: "Password:" });
        const confirmPassword = screen.getByRole('textbox', { name: "Confirm Password:" });
        const registerButton = screen.getByRole('button', { name: "Register" });
        
        await userEvent.type(lastName, "example");
        await userEvent.type(email, "test@example.com");
        await userEvent.type(password, "123");
        await userEvent.type(confirmPassword, "123");

        await userEvent.click(registerButton);

        await waitFor(() => {
            expect(screen.getByText("First name is required")).toBeInTheDocument();
        });
    })
    
    /**
     * Test 3: If API call rejects, expect UI to display
     * "Last Name is required" and "Password is required" as an error message
     */
    test("displays error message for last name and password when register fails", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 400,
            response: {
            data: {
                errors: {
                0: { path: 'lastName', message: 'Last name is required' },
                1: { path: 'password', message: 'Password is required' },
                },
            },
            },
        });

        render(<Registration />);

        const firstName = screen.getByRole('textbox', { name: "Last Name:" });
        const email = screen.getByRole('textbox', { name: "Email:" });
        const confirmPassword = screen.getByRole('textbox', { name: "Confirm Password:" });
        const registerButton = screen.getByRole('button', { name: "Register" });
        
        await userEvent.type(firstName, "example");
        await userEvent.type(email, "test@example.com");
        await userEvent.type(confirmPassword, "123");

        await userEvent.click(registerButton);

        await waitFor(() => {
            expect(screen.getByText("Last name is required")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText("Password is required")).toBeInTheDocument();
        });
    })

    /**
     * Test 4: If API call rejects, expect UI to display
     * ""Confirm Password" must match "Password"" as an error message
     */
    test("displays error message when password does not match confirm password", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 400,
            response: {
            data: {
                errors: {
                0: { path: 'confirmPassword', message: '"Confirm Password" must match "Password"' },
                },
            },
            },
        });

        render(<Registration />);

        const firstName = screen.getByRole('textbox', { name: "First Name:" });
        const lastName = screen.getByRole('textbox', { name: "Last Name:" });
        const email = screen.getByRole('textbox', { name: "Email:" });
        const password = screen.getByRole('textbox', { name: "Password:" });
        const confirmPassword = screen.getByRole('textbox', { name: "Confirm Password:" });
        const registerButton = screen.getByRole('button', { name: "Register" });

        await userEvent.type(firstName, "test");
        await userEvent.type(lastName, "example");
        await userEvent.type(email, "test@example.com");
        await userEvent.type(password, "123");
        await userEvent.type(confirmPassword, "1");

        await userEvent.click(registerButton);

        await waitFor(() => {
            expect(screen.getByText('"Confirm Password" must match "Password"')).toBeInTheDocument();
        });
    })

    /**
     * Test 5: If API call rejects, expect UI to display
     * "Email is already taken" as an error message
     */
    test("displays error message when email is not unique", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 409,
        });

        render(<Registration />);

        const firstName = screen.getByRole('textbox', { name: "First Name:" });
        const lastName = screen.getByRole('textbox', { name: "Last Name:" });
        const email = screen.getByRole('textbox', { name: "Email:" });
        const password = screen.getByRole('textbox', { name: "Password:" });
        const confirmPassword = screen.getByRole('textbox', { name: "Confirm Password:" });
        const registerButton = screen.getByRole('button', { name: "Register" });

        await userEvent.type(firstName, "test");
        await userEvent.type(lastName, "example");
        await userEvent.type(email, "test@example.com");
        await userEvent.type(password, "123");
        await userEvent.type(confirmPassword, "123");

        await userEvent.click(registerButton);

        await waitFor(() => {
            expect(screen.getByText('Email is already taken')).toBeInTheDocument();
        });
    })
})