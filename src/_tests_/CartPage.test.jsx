import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "../redux/reducer";
import CartPage from "../pages/Cart/CartPage";
import { removeFromCart } from "../redux/action";
import { vi } from "vitest";

// Mock removeFromCart action
vi.mock("../redux/action", () => ({
    removeFromCart: vi.fn(),
}));

// Helper function to render component with Redux
const renderWithRedux = (initialState) => {
    const store = createStore(rootReducer, initialState);
    store.dispatch = vi.fn(); // Mock dispatch

    return {
        ...render(
            <Provider store={store}>
                <BrowserRouter>
                    <CartPage />
                </BrowserRouter>
            </Provider>
        ),
        store,
    };
};

// Mock product for testing
const mockProduct = {
    id: 1,
    title: "Men's Shirt",
    price: 20,
    quantity: 2,
    images: ["https://dummyimage.com/shirt"],
};

describe("CartPage Component", () => {
    test("should render the cart page correctly with items", () => {
        const initialState = {
            cart: [
                mockProduct,
                {
                    id: 2,
                    title: "Women's Dress",
                    price: 30,
                    quantity: 1,
                    images: ["https://dummyimage.com/dress"],
                },
            ],
        };

        renderWithRedux(initialState);

        // Check heading
        expect(screen.getByText(/your shopping cart/i)).toBeInTheDocument();

        // Check total price
        expect(screen.getByText("Total: $70.00")).toBeInTheDocument();

        // Check number of cart items
        expect(screen.getAllByTestId("cart-item-1")).toHaveLength(2);
    });

    test("should show empty cart message when cart is empty", () => {
        const initialState = { cart: [] }; // Empty cart state
        renderWithRedux(initialState);

        expect(screen.getByTestId("Empty-message")).toBeInTheDocument();
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });

    test("should call removeFromCart action when remove button is clicked", () => {
        const initialState = {
            cart: [mockProduct],
        };

        const { store } = renderWithRedux(initialState);

        const removeButton = screen.getByTestId(`remove-btn-${mockProduct.id}`);
        fireEvent.click(removeButton);

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(removeFromCart(mockProduct.id));
    });

    test("should render images correctly", () => {
        const initialState = {
            cart: [
                mockProduct,
                {
                    id: 2,
                    title: "Women's Dress",
                    price: 30,
                    quantity: 1,
                    images: ["https://dummyimage.com/dress"],
                },
            ],
        };

        renderWithRedux(initialState);

        const images = screen.getAllByRole("img");
        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute("src", "https://dummyimage.com/shirt");
        expect(images[1]).toHaveAttribute("src", "https://dummyimage.com/dress");
    });
});
