import apiClient from '../src/lib/api-client';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useNavigate } from 'react-router-dom';
import { Login } from '../src/views/login';
import { LOGIN_ROUTE } from '../src/lib/constants';

jest.mock('../src/lib/api-client', () => ({
    post: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(), // Mock useNavigate
}));

describe("login page", () => {
    let originalLog;
    
    beforeAll(() => {
        originalLog = console.log;
        console.log = jest.fn(); // No-op for logs
    });

    afterAll(() => {
        console.log = originalLog;
    });

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    /**
     * Test 1: If API call resolves with 201 status,
     * expect UI to go to "/main" route
     */
    test('navigates to "/main" route on successful login', async() => {
        // create mock function for useNavigate
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        // mock setUser
        const mockSetUser = jest.fn();

        apiClient.post.mockResolvedValue({ data: { user: "user-token" }});
        
        render(<Login setUser={mockSetUser} />);

        const email = screen.getByRole('textbox', { name: "Email:" });
        const password = screen.getByRole('textbox', { name: "Password:" });
        const loginButton = screen.getByRole('button', { name: "Login" });

        await userEvent.type(email, "j@gmail.com");
        await userEvent.type(password, "1");
        
        await userEvent.click(loginButton);

        await waitFor(() => {
            expect(apiClient.post).toHaveBeenCalledWith(LOGIN_ROUTE, {
                email: "j@gmail.com",
                password: "1",
            });
        })

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/main');
        })
    })

    /**
     * Test 2: If API call rejects, expect UI to display
     * "Field is empty" as an error message
     */
    test("displays 'Field is empty' when login fails", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 400,
            response: {
            data: {
                emailEmpty: true,
                passwordEmpty: false,
                passwordMatches: false,
            },
            },
        });

        // mock setUser
        const mockSetUser = jest.fn();
        
        render(<Login setUser={mockSetUser} />);

        const password = screen.getByRole('textbox', { name: "Password:" });
        const loginButton = screen.getByRole('button', { name: "Login" });

        await userEvent.type(password, "1");

        await userEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText("Field is empty")).toBeInTheDocument();
        });
    });

    /**
     * Test 3: If API call rejects, expect UI to display
     * "Field is empty" twice as an error message twice
     */
    test("displays 'Field is empty' twice when login fails", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 400,
            response: {
            data: {
                emailEmpty: true,
                passwordEmpty: true,
                passwordMatches: false,
            },
            },
        });

        // mock setUser
        const mockSetUser = jest.fn();
        
        render(<Login setUser={mockSetUser} />);

        const loginButton = screen.getByRole('button', { name: "Login" });

        await userEvent.click(loginButton);

        await waitFor(() => {
            const errors = screen.getAllByText("Field is empty");
            expect(errors).toHaveLength(2);
        });
    })

    /**
     * Test 4: If API call rejects, expect UI to display
     * "Password does not match" as an error message when user
     * does not exist
     */
    test("displays 'Password does not match' when login fails", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 404,
            response: {
            data: {
                emailEmpty: false,
                passwordEmpty: false,
                passwordMatches: false,
            },
            },
        });

        // mock setUser
        const mockSetUser = jest.fn();

        render(<Login setUser={mockSetUser} />);

        const email = screen.getByRole('textbox', { name: "Email:" });
        const password = screen.getByRole('textbox', { name: "Password:" });
        const loginButton = screen.getByRole('button', { name: "Login" });

        await userEvent.type(email, "example@gmail.com");
        await userEvent.type(password, "1");
        
        await userEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText("Password does not match")).toBeInTheDocument();
        });
    });

    /**
     * Test 5: If API call rejects, expect UI to display
     * "Password does not match" as an error message when 
     * password does not match
     */
    test("displays 'Password does not match' when login fails", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 400,
            response: {
            data: {
                emailEmpty: false,
                passwordEmpty: false,
                passwordMatches: false,
            },
            },
        });

        // mock setUser
        const mockSetUser = jest.fn();

        render(<Login setUser={mockSetUser} />);

        const email = screen.getByRole('textbox', { name: "Email:" });
        const password = screen.getByRole('textbox', { name: "Password:" });
        const loginButton = screen.getByRole('button', { name: "Login" });

        await userEvent.type(email, "example@gmail.com");
        await userEvent.type(password, "1");
        
        await userEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText("Password does not match")).toBeInTheDocument();
        });
    });
})