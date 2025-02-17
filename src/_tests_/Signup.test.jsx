import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import SignUp from "../components/LoginSignUp/SignUp";
import rootReducer from "../redux/reducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const store = createStore(rootReducer);

describe("SignUp Component", () => {
    test("renders sign-up form", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignUp />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByPlaceholderText("Enter Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
    });

    test("validates empty name input", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignUp />
                </BrowserRouter>
            </Provider>
        );
        console.log(screen.debug());
        const nameInput = screen.getByPlaceholderText("Enter Name");

        fireEvent.change(nameInput, { target: { value: "" } }); // Ensure it's empty
        fireEvent.blur(nameInput); // Trigger validation

        // Wait for the validation message
        expect(await screen.findByText(/Please Enter your name/i)).toBeInTheDocument();


    });

    test("validates invalid email", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignUp />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "invalidemail" } });
        fireEvent.blur(screen.getByPlaceholderText("Enter Email"));
        expect(screen.getByText("Please Enter a valid email")).toBeInTheDocument();
    });

    test("validates weak password", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignUp />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "123" } });
        fireEvent.blur(screen.getByPlaceholderText("Enter Password"));
        expect(screen.getByText("Password must have 8 characters, including digits, uppercase & lowercase letters")).toBeInTheDocument();
    });

    test("successful sign-up displays success toast", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ToastContainer />
                    <SignUp />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText("Enter Name"), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "johndoe@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "Password123" } });
        fireEvent.click(screen.getByText("Sign Up"));

        expect(screen.getByText("Account Created Successfully!")).toBeInTheDocument();
    });
});
