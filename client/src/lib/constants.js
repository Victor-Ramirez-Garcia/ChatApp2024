export const HOST = "http://localhost:8000"; // server port

export const REGISTER_ROUTE = "api/users/register"; // register route
export const LOGIN_ROUTE = "api/users/login"; // login route
export const UPDATE_ROUTE = "api/users/update"; // update route
export const LOGOUT_ROUTE = "api/users/logout"; // logout route
export const USER_ROUTE = "api/users/"; // get user by id route

export const CREATE_CHAT_ROUTE = "api/chats/create"; // create chat route
export const CHAT_ROOMS_ROUTE = "api/chats/all/exclude/"; // get all chat rooms (excluding user by id) route
export const USER_CHAT_ROOMS_ROUTE = "api/chats/"; // get all user chat rooms by id route
export const POSTS_ROUTE = "api/chats/posts/"; // get chat room posts by chat id route
export const DELETE_CHAT_ROOM = "api/chats/delete/"; // delete chat room by id route