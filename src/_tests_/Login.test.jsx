import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Cookies from "js-cookie";
import Login from "../components/LoginSignUp/Login";

// Mock Cookies
vi.mock("js-cookie", async () => {
    const actual = await vi.importActual("js-cookie");
    return {
        ...actual,
        default: {
            set: vi.fn(),
            get: vi.fn(),
            remove: vi.fn(),
        },
    };
});
const mockStore = configureStore([]);

describe("Login Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: [{ email: "test@example.com", password: "CorrectPass1", fullName: "John Doe" }],
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
    });

    it("renders login form correctly", () => {
        expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
        expect(screen.getByTestId("login-button")).toBeInTheDocument();
    });

    it("validates empty email input", async () => {
        fireEvent.click(screen.getByTestId("login-button"));
        expect(await screen.findByTestId("email-error")).toHaveTextContent("Please enter a valid email.");
    });

    it("validates incorrect email format", async () => {
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "invalidemail" } });
        fireEvent.click(screen.getByTestId("login-button"));
        expect(await screen.findByTestId("email-error")).toHaveTextContent("Please enter a valid email.");
    });

    it("validates weak password", async () => {
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "123" } });
        fireEvent.click(screen.getByTestId("login-button"));
        expect(await screen.findByTestId("password-error")).toHaveTextContent("Password must be at least 8 characters with uppercase, lowercase, and a number.");
    });

    it("shows error for incorrect password", async () => {
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "WrongPass1" } });
        fireEvent.click(screen.getByTestId("login-button"));

        expect(await screen.findByTestId("form-error")).toHaveTextContent("Invalid password.");
    });

    it("logs in successfully and stores user in cookies", async () => {
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "CorrectPass1" } });
        fireEvent.click(screen.getByTestId("login-button"));

        expect(Cookies.set).toHaveBeenCalledWith("user", "John Doe", { expires: 7 });
    });
});








// import { describe, it, expect, vi, beforeEach } from "vitest";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import Cookies from "js-cookie";
// import Login from "../components/LoginSignUp/Login";
// import store from "../redux/store";

// // Mock Cookies
// vi.mock("js-cookie", () => ({
//     set: vi.fn(),
// }));

// describe("Login Component", () => {
//     beforeEach(() => {
//         render(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <Login />
//                 </BrowserRouter>
//             </Provider>
//         );
//     });

//     it("renders login form correctly", () => {
//         expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
//         expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
//         expect(screen.getByTestId("login-button")).toBeInTheDocument();
//     });

//     it("validates empty email input", async () => {
//         fireEvent.click(screen.getByTestId("login-button"));
//         expect(await screen.findByTestId("email-error")).toHaveTextContent("Please enter a valid email.");
//     });

//     it("validates incorrect email format", async () => {
//         fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "invalidemail" } });
//         fireEvent.click(screen.getByTestId("login-button"));
//         expect(await screen.findByTestId("email-error")).toHaveTextContent("Please enter a valid email.");
//     });

//     it("validates weak password", async () => {
//         fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "test@example.com" } });
//         fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "123" } });
//         fireEvent.click(screen.getByTestId("login-button"));
//         expect(await screen.findByTestId("password-error")).toHaveTextContent("Password must be at least 8 characters with uppercase, lowercase, and a number.");
//     });

//     it("shows error for incorrect password", async () => {
//         // Mocking Redux state to return a user
//         store.getState = vi.fn(() => ({
//             user: [{ email: "test@example.com", password: "CorrectPass1" }],
//         }));

//         fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "test@example.com" } });
//         fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "WrongPass1" } });
//         fireEvent.click(screen.getByTestId("login-button"));

//         expect(await screen.findByTestId("form-error")).toHaveTextContent("Invalid password.");
//     });

//     it("logs in successfully and stores user in cookies", async () => {
//         store.getState = vi.fn(() => ({
//             user: [{ email: "test@example.com", password: "CorrectPass1", fullName: "John Doe" }],
//         }));

//         fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "test@example.com" } });
//         fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "CorrectPass1" } });
//         fireEvent.click(screen.getByTestId("login-button"));

//         expect(Cookies.set).toHaveBeenCalledWith("user", "John Doe", { expires: 7 });
//     });
// });
