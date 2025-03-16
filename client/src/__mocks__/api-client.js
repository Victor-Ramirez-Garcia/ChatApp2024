// File mocks the default export from '@/lib/api-client'
// The 'post' function is set to a Jest mock, which you can configure
// in your tests to return success or error responses without making
// real network calls.

export default {
    post: jest.fn(),
};