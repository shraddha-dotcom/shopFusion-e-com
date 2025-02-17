import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "../redux/reducer";
import ErrorBoundary from "../NotFound/Error Boundry";
import { vi } from "vitest";

// Mock Redux Store
const renderWithRedux = (ui) => {
    const store = createStore(rootReducer);
    return render(
        <Provider store={store}>
            <BrowserRouter>{ui}</BrowserRouter>
        </Provider>
    );
};

describe("ErrorBoundary Component", () => {
    test("renders children when no error occurs", () => {
        renderWithRedux(
            <ErrorBoundary>
                <p data-testid="child-component">This is a safe component</p>
            </ErrorBoundary>
        );

        expect(screen.getByTestId("child-component")).toBeInTheDocument();
    });

    test("catches errors and displays fallback UI", () => {
        const ThrowError = () => {
            throw new Error("Test error");
        };

        renderWithRedux(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );

        expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
        expect(screen.getByText("Please try refreshing the page.")).toBeInTheDocument();
    });

    test("logs error using componentDidCatch", () => {
        const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => { });
        const ThrowError = () => {
            throw new Error("Test error");
        };

        renderWithRedux(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );

        expect(consoleErrorMock).toHaveBeenCalled();
        consoleErrorMock.mockRestore();
    });
});
