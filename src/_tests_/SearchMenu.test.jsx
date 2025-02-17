import {
    render,
    fireEvent,
    screen,
    waitFor
} from "@testing-library/react";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { thunk } from "redux-thunk";
import rootReducer from "../redux/reducer";
import Searchbar from "../components/NavbarComponents/Searchbar";

// Utility function to render with Redux provider
const renderWithProviders = (ui, { preloadedState = {} } = {}) => {
    const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

    return render(
        <Provider store={store}>
            <MemoryRouter>{ui}</MemoryRouter>
        </Provider>
    );
};

// Mock product data in Redux state
const initialState = {
    search: { isSearching: true },
    products: [
        { id: 1, title: "iPhone 14", category: "electronics" },
        { id: 2, title: "Samsung Galaxy S22", category: "electronics" },
    ],
};

describe("Searchbar Component", () => {
    it("opens the search menu when clicking the search button", async () => {
        renderWithProviders(<Searchbar />, { preloadedState: initialState });

        fireEvent.click(screen.getByTestId("search-button"));
        fireEvent.change(screen.getByPlaceholderText("Search"), {
            target: { value: "iPhone" }, // Ensuring searchTerm is set
        });


        await waitFor(() => {
            expect(screen.getByTestId("search-menu")).toBeInTheDocument();
        });
    });



    it("shows the search input when clicking the search button", async () => {
        renderWithProviders(<Searchbar />, { preloadedState: initialState });

        fireEvent.click(screen.getByTestId("search-button"));

        // ✅ Use findByPlaceholderText instead of waitFor
        expect(await screen.findByPlaceholderText("Search")).toBeInTheDocument();
    });

    it("filters products based on search term", async () => {
        renderWithProviders(<Searchbar />, { preloadedState: initialState });

        fireEvent.click(screen.getByTestId("search-button"));
        fireEvent.change(screen.getByPlaceholderText("Search"), {
            target: { value: "iPhone" },
        })

        await waitFor(() => {
            expect(screen.getByTestId("search-menu")).toBeInTheDocument();
        }, { timeout: 1000 });


        expect(screen.getByText("iPhone 14")).toBeInTheDocument();
        expect(screen.queryByText("Samsung Galaxy S22")).toBeNull();
    });


    it("closes the search when clicking outside", async () => {
        renderWithProviders(<Searchbar />, { preloadedState: initialState });

        fireEvent.click(screen.getByTestId("search-button"));

        fireEvent.change(screen.getByPlaceholderText("Search"), {
            target: { value: "Laptop" },
        });


        fireEvent.mouseDown(document.body);



        await waitFor(() => {
            expect(screen.queryByTestId("search-menu")).not.toBeInTheDocument();
        });
    });
    it("shows 'No products found' when no matches", async () => {
        renderWithProviders(<Searchbar />, { preloadedState: initialState });

        fireEvent.click(screen.getByTestId("search-button"));

        fireEvent.change(screen.getByPlaceholderText("Search"), {
            target: { value: "nonexistentproduct" },
        });

        await waitFor(() => {
            expect(screen.getByText("No products found")).toBeInTheDocument();
        });
    });

    it("closes the search menu when an item is clicked", async () => {
        renderWithProviders(<Searchbar />, { preloadedState: initialState });

        // Click the search button
        fireEvent.click(screen.getByTestId("search-button"));

        // Type a search term
        fireEvent.change(screen.getByPlaceholderText("Search"), {
            target: { value: "iPhone" },
        });

        // Wait for the menu to appear
        await waitFor(() => {
            expect(screen.getByTestId("search-menu")).toBeInTheDocument();
        });

        // Click the search result item
        fireEvent.click(screen.getByText("iPhone 14"));

        // Wait for the menu to disappear
        await waitFor(() => {
            expect(screen.queryByTestId("search-menu")).not.toBeInTheDocument();
        });
    });

});
