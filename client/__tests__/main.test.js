import apiClient from '../src/lib/api-client';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useNavigate } from 'react-router-dom';
import { Main } from '../src/views/main';
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
     * Test 1: If API call resolves with 201 status,
     * expect non-user chats to appear
     */
    test('displays non-user chats on successful retrieval', async() => {
        // array of simulated chat titles and descriptions
        const mockChats = [
            {title: "Rap Evolution", description: "Shaping modern sound", email: "t@gmail.com"},
            {title: "Beats & Bars", description: "The core of rap music", email: "j@gmail.com"},
            {title: "Lyricism", description: "Wordplay at its finest", email: "v@gmail.com"},
            {title: "Golden Era", description: "Hip hop's best years", email: "e@gmail.com"},
        ];

        // simulate response from CHAT_ROOMS_ROUTE
        apiClient.get.mockResolvedValue({
            status: 200,
            data: {
                chats: {
                    0: {
                        title: mockChats[0].title,
                        description: mockChats[0].description,
                        user: {email: mockChats[0].email},
                    },
                    1: {
                        title: mockChats[1].title,
                        description: mockChats[1].description,
                        user: {email: mockChats[1].email},
                    },
                    2: {
                        title: mockChats[2].title,
                        description: mockChats[2].description,
                        user: {email: mockChats[2].email},
                    },
                    3: {
                        title: mockChats[3].title,
                        description: mockChats[3].description,
                        user: {email: mockChats[3].email},
                    },
                },
            },
        });

        // simulate response from USER_ROUTE

        const mockUser = jest.fn(); // simulate user

        // display Main component inside browser DOM element
        render(<Main user={mockUser} />);

        // expect chats to be displayed 
        await waitFor(() => {
            expect(screen.getByText(mockChats[0].title)).toBeInTheDocument();
            expect(screen.getByText(mockChats[0].description)).toBeInTheDocument();
            expect(screen.getByText(mockChats[1].title)).toBeInTheDocument();
            expect(screen.getByText(mockChats[1].description)).toBeInTheDocument();
            expect(screen.getByText(mockChats[2].title)).toBeInTheDocument();
            expect(screen.getByText(mockChats[2].description)).toBeInTheDocument();
            expect(screen.getByText(mockChats[3].title)).toBeInTheDocument();
            expect(screen.getByText(mockChats[3].description)).toBeInTheDocument();
        });
    })
})