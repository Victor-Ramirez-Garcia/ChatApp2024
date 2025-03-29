import apiClient from '../src/lib/api-client';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useNavigate } from 'react-router-dom';
import { Main } from '../src/views/main';
import { wait } from '@testing-library/user-event/dist/cjs/utils/index.js';
import { CHAT_ROOMS_ROUTE, USER_ROUTE } from '../src/lib/constants';
//import { LOGIN_ROUTE } from '../src/lib/constants';

// simulate axios GET and DELETE functions
jest.mock('../src/lib/api-client', () => ({
    get: jest.fn(),
    delete: jest.fn(),
}));

// simulate useNavigate function
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

// group together <Main> component tests
describe("main page", () => {
    let originalLog;
    
    // before any tests run, simulate console.log
    beforeAll(() => {
        originalLog = console.log;
        console.log = jest.fn();
    });

    // after all tests are completed, unsimulate console.log
    afterAll(() => {
        console.log = originalLog;
    });

    // before each test, clear all simulations
    beforeEach(() => {
        jest.clearAllMocks();
    })

    /**
     * Test 1: If API call resolves with status 201,
     * expect non-user chats to appear
     */
    test('displays non-user chats on successful retrieval', async() => {
        // simulate array of Chat models
        const mockChats = [
            {title: "Rap Evolution", description: "Shaping modern sound", email: "t@gmail.com", user: "id1" },
            {title: "Beats & Bars", description: "The core of rap music", email: "j@gmail.com", user: "id2" },
            {title: "Lyricism", description: "Wordplay at its finest", email: "v@gmail.com", user: "id3" },
            {title: "Golden Era", description: "Hip hop's best years", email: "e@gmail.com", user: "id4" },
        ];

        // simulate response object from CHAT_ROOMS_ROUTE
        const mockRes = {
            status: 201,
            data: {
                chats: {
                    0: {
                        user: mockChats[0].user,
                        title: mockChats[0].title,
                        description: mockChats[0].description,
                        posts: [],
                    },
                },
            },
        };
        apiClient.get.mockResolvedValueOnce(mockRes);
        
        // simulate response from USER_ROUTE
        apiClient.get.mockResolvedValueOnce({
            data: { user: { 0: { _id: mockChats[0].user, email: mockChats[0].email } }}, 
        });

        const mockUser = jest.fn(); // simulate user

        // display Main component inside browser DOM element
        render(<Main user={mockUser} />);

        // expect chats to be displayed 
        await waitFor(() => {
            expect(screen.getByText(`Title: ${mockChats[0].title}`)).toBeInTheDocument();
            expect(screen.getByText(`Description: ${mockChats[0].description}`)).toBeInTheDocument();
            expect(screen.getByText(`Created By: ${mockChats[0].email}`)).toBeInTheDocument();
        });
    });
})