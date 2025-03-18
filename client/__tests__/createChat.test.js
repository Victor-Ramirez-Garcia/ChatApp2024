import apiClient from '../src/lib/api-client';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useNavigate } from 'react-router-dom';
import { CreateChat } from '../src/views/createChat';

jest.mock('../src/lib/api-client', () => ({
    post: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(), // Mock useNavigate
}));

describe("create chat room page", () => {
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
    test('navigates to "/main" route on successful chat creation', async() => {
        // create mock function for useNavigate
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        // mock user
        const mockUser = jest.fn();

        apiClient.post.mockResolvedValue({ status: 201 });

        render(<CreateChat user={mockUser} />);

        const title = screen.getByRole('textbox', { name: "Title:" });
        const description = screen.getByRole('textbox', { name: "Description:" });
        const createButton = screen.getByRole('button', { name: "Create Chat Room" });

        await userEvent.type(title, "Who is the best: Playboi Carti or Tyler, the Creator?");
        await userEvent.type(description, "This is a discussion based on the rapper's discography");

        await userEvent.click(createButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/main');
        })
    })

    /**
     * Test 2: If API call rejects, expect UI to display
     * "Title is required" as an error message when title
     * fails
     */
    test("displays 'Title is required' when creation fails", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 400,
            response: {
            data: {
                errors: {
                0: { path: 'title', message: 'Title is required' },
                },
            },
            },
        });

        // mock user
        const mockUser = jest.fn();
        
        render(<CreateChat user={mockUser} />);

        const description = screen.getByRole('textbox', { name: "Description:" });
        const createButton = screen.getByRole('button', { name: "Create Chat Room" });

        await userEvent.type(description, "This is a discussion based on the rapper's discography");

        await userEvent.click(createButton);

        await waitFor(() => {
            expect(screen.getByText("Title is required")).toBeInTheDocument();
        });
    });
    
    /**
     * Test 3: If API call rejects, expect UI to display
     * "Description is required" as an error message when
     * description fails
     */
    test("displays 'Description is required' when creation fails", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 400,
            response: {
            data: {
                errors: {
                0: { path: 'description', message: 'Description is required' },
                },
            },
            },
        });

        // mock user
        const mockUser = jest.fn();
        
        render(<CreateChat user={mockUser} />);

        const title = screen.getByRole('textbox', { name: "Title:" });
        const createButton = screen.getByRole('button', { name: "Create Chat Room" });

        await userEvent.type(title, "Who is the best: Playboi Carti or Tyler, the Creator?");

        await userEvent.click(createButton);

        await waitFor(() => {
            expect(screen.getByText("Description is required")).toBeInTheDocument();
        });
    })

    /**
     * Test 4: If API call rejects, expect UI to display
     * "Title is required" and "Description is required"
     * as an error message when title and description fails
     */
    test("displays title and description message when creation fails", async() => {
        // Mock the API response
        apiClient.post.mockRejectedValueOnce({
            status: 400,
            response: {
            data: {
                errors: {
                0: { path: 'title', message: 'Title is required' },
                1: { path: 'description', message: 'Description is required' },
                },
            },
            },
        });

        // mock user
        const mockUser = jest.fn();
        
        render(<CreateChat user={mockUser} />);

        const createButton = screen.getByRole('button', { name: "Create Chat Room" });

        await userEvent.click(createButton);

        await waitFor(() => {
            expect(screen.getByText("Title is required")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText("Description is required")).toBeInTheDocument();
        });
    });
})