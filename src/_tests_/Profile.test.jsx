import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import Profile from "../components/NavbarComponents/Profile";
import Cookies from "js-cookie";
import rootReducer from "../redux/reducer"; // Ensure you have a rootReducer

const store = createStore(rootReducer);

describe("Profile Component", () => {
    beforeEach(() => {
        Cookies.remove("user"); // Reset cookies before each test
    });

    test("renders profile button", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByTestId("profile-button")).toBeInTheDocument();
    });

    test("opens menu when profile button is clicked", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(screen.getByTestId("profile-button"));
        expect(screen.getByTestId("profile-menu")).toBeInTheDocument();
    });

    test("displays user name if logged in", () => {
        Cookies.set("user", "John Doe");
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(screen.getByTestId("profile-button"));
        expect(screen.getByTestId("user-name")).toHaveTextContent("John Doe");
    });

    test("logs out user on logout button click", () => {
        Cookies.set("user", "John Doe");
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(screen.getByTestId("profile-button"));
        fireEvent.click(screen.getByTestId("logout-button"));
        expect(Cookies.get("user")).toBeUndefined();
    });

    test("closes menu when clicking outside", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Profile />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(screen.getByTestId("profile-button"));
        expect(screen.getByTestId("profile-menu")).toBeInTheDocument();
        fireEvent.mouseDown(document.body);
        expect(screen.queryByTestId("profile-menu")).not.toBeInTheDocument();
    });
});
