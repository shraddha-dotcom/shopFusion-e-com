import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "../pages/ProductDetails";
import { describe, it, expect, vi, beforeEach } from "vitest";
import rootReducer from "../redux/reducer";
import * as actions from "../redux/action";

// Mock Redux Store with Thunk
const renderWithProviders = (ui, { preloadedState = {}, route = "/product/1/electronics" } = {}) => {
    const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/product/:id/:category" element={ui} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
};

// Spy on fetchAllProducts before each test
beforeEach(() => {
    vi.spyOn(actions, "fetchAllProducts").mockReturnValue({ type: "FETCH_PRODUCTS", payload: [] });
});

describe("ProductDetails Component", () => {
    it("renders product details correctly", () => {
        const preloadedState = {
            products: [
                {
                    id: 1,
                    title: "Smartphone",
                    price: 699,
                    description: "A high-end smartphone.",
                    images: ["https://via.placeholder.com/150"],
                    thumbnail: "https://via.placeholder.com/150",
                    stock: 10,
                    rating: 4.5,
                },
            ],
            wishlist: [], // Ensure wishlist exists
        };

        renderWithProviders(<ProductDetails />, { preloadedState });

        expect(screen.getByTestId("title")).toHaveTextContent("Smartphone");
        expect(screen.getByTestId("price")).toHaveTextContent("$699");
        expect(screen.getByTestId("description")).toHaveTextContent("A high-end smartphone.");
        expect(screen.getByTestId("stock")).toHaveTextContent("In Stock");
    });

    it("renders 'Product not found' when product is missing", () => {
        renderWithProviders(<ProductDetails />, { preloadedState: { products: [], wishlist: [] } });

        expect(screen.getByText("Product not found.")).toBeInTheDocument();
    });

    it("dispatches fetchAllProducts when store is empty", () => {
        renderWithProviders(<ProductDetails />, { preloadedState: { products: [], wishlist: [] } });

        expect(actions.fetchAllProducts).toHaveBeenCalled();
    });
});
