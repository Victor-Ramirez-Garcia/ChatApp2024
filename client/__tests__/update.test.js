import apiClient from '../src/lib/api-client';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useNavigate } from 'react-router-dom';
import { Update } from '../src/views/update';
import { UPDATE_ROUTE } from '../src/lib/constants';

jest.mock('../src/lib/api-client', () => ({
    post: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(), // Mock useNavigate
}));

describe("update user page", () => {
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
    test('navigates to "/main" route on successful update', async() => {
        // create mock function for useNavigate
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        // mock setUser
        const mockSetUser = jest.fn();

        // mock user
        const mockUser = jest.fn();

        apiClient.post.mockResolvedValue({ data: { user: "user-token" }});

        render(<Update user={mockUser} setUser={mockSetUser} />);

        const firstName = screen.getByRole('textbox', { name: "First Name:" });
        const lastName = screen.getByRole('textbox', { name: "Last Name:" });
        const updateButton = screen.getByRole('button', { name: "Update" });

        await userEvent.type(firstName, "Test");
        await userEvent.type(lastName, "Example");

        await userEvent.click(updateButton);

        await waitFor(() => {
            expect(apiClient.post).toHaveBeenCalledWith(UPDATE_ROUTE, {
                firstName: "Test",
                lastName: "Example",
            });
        })

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/main');
        })
    })

    /**
     * Test 2: If API call rejects, expect UI to display
     * "This field is empty" when first name is empty
     */
    test("displays 'This field is empty' when update fails", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 400,
            response: {
            data: {
                firstNameEmpty: true,
                lastNameEmpty: false,
            },
            },
        });

        // mock setUser
        const mockSetUser = jest.fn();

        // mock user
        const mockUser = jest.fn();

        render(<Update user={mockUser} setUser={mockSetUser} />);

        const lastName = screen.getByRole('textbox', { name: "Last Name:" });
        const updateButton = screen.getByRole('button', { name: "Update" });

        await userEvent.type(lastName, "Example");

        await userEvent.click(updateButton);

        await waitFor(() => {
            expect(screen.getByText("This field is empty")).toBeInTheDocument();
        });
    });

    /**
     * Test 3: If API call rejects, expect UI to display
     * "This field is empty" when last name is empty
     */
    test("displays 'This field is empty' when update fails", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 400,
            response: {
            data: {
                firstNameEmpty: false,
                lastNameEmpty: true,
            },
            },
        });

        // mock setUser
        const mockSetUser = jest.fn();

        // mock user
        const mockUser = jest.fn();

        render(<Update user={mockUser} setUser={mockSetUser} />);

        const firstName = screen.getByRole('textbox', { name: "First Name:" });
        const updateButton = screen.getByRole('button', { name: "Update" });

        await userEvent.type(firstName, "Test");

        await userEvent.click(updateButton);

        await waitFor(() => {
            expect(screen.getByText("This field is empty")).toBeInTheDocument();
        });
    });

    /**
     * Test 4: If API call rejects, expect UI to display
     * "This field is empty" when first and last name is empty
     */
    test("displays 'This field is empty' twice when update fails", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 400,
            response: {
            data: {
                firstNameEmpty: true,
                lastNameEmpty: true,
            },
            },
        });
        // mock setUser
        const mockSetUser = jest.fn();

        // mock user
        const mockUser = jest.fn();

        render(<Update user={mockUser} setUser={mockSetUser} />);

        const updateButton = screen.getByRole('button', { name: "Update" });

        await userEvent.click(updateButton);

        await waitFor(() => {
            const errors = screen.getAllByText("This field is empty");
            expect(errors).toHaveLength(2);
        });
    });
})