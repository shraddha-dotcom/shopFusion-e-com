import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "../redux/reducer";
import Wishlist from "../pages/Wishlist/WishlistPage";
import { removeFromWishlist, addToCart } from "../redux/action";
import { vi } from "vitest";

// Mock Redux actions
vi.mock("../../redux/action", () => ({
    removeFromWishlist: vi.fn(),
    addToCart: vi.fn(),
}));

const renderWithRedux = (initialState) => {
    const store = createStore(rootReducer, initialState);
    store.dispatch = vi.fn(); // Mock dispatch
    return {
        ...render(
            <Provider store={store}>
                <BrowserRouter>
                    <Wishlist />
                </BrowserRouter>
            </Provider>
        ),
        store,
    };
};

describe("Wishlist Component", () => {
    test("renders the wishlist page correctly", () => {
        const initialState = { wishlist: [] };
        renderWithRedux(initialState);

        expect(screen.getByTestId("wishlist")).toBeInTheDocument();
        expect(screen.getByText(/your wishlist ❤️/i)).toBeInTheDocument();
    });

    test("shows empty wishlist message when wishlist is empty", () => {
        const initialState = { wishlist: [] };
        renderWithRedux(initialState);

        expect(screen.getByTestId("empty-message")).toBeInTheDocument();
        expect(screen.getByText(/your wishlist is empty/i)).toBeInTheDocument();
    });

    test("displays wishlist items when wishlist has products", () => {
        const initialState = {
            wishlist: [
                {
                    id: 1,
                    title: "Men's Shirt",
                    price: 25,
                    stock: 5,
                    images: ["https://dummyimage.com/shirt"],
                },
            ],
        };

        renderWithRedux(initialState);

        expect(screen.getByTestId("wishlist-item-1")).toBeInTheDocument();
        expect(screen.getByText("Men's Shirt")).toBeInTheDocument();
        expect(screen.getByText("$25")).toBeInTheDocument();
        expect(screen.getByText("In Stock")).toBeInTheDocument();
    });

    test("calls removeFromWishlist when remove button is clicked", () => {
        const initialState = {
            wishlist: [
                {
                    id: 1,
                    title: "Men's Shirt",
                    price: 25,
                    stock: 5,
                    images: ["https://dummyimage.com/shirt"],
                },
            ],
        };

        const { store } = renderWithRedux(initialState);
        const removeButton = screen.getByTestId("remove-item-1");
        fireEvent.click(removeButton);

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(removeFromWishlist(1));
    });

    test("calls addToCart and removeFromWishlist when move to cart is clicked", () => {
        const initialState = {
            wishlist: [
                {
                    id: 1,
                    title: "Men's Shirt",
                    price: 25,
                    stock: 5,
                    images: ["https://dummyimage.com/shirt"],
                },
            ],
        };

        const { store } = renderWithRedux(initialState);
        const moveToCartButton = screen.getByText("Move to Cart");
        fireEvent.click(moveToCartButton);

        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith(addToCart(initialState.wishlist[0]));
        expect(store.dispatch).toHaveBeenCalledWith(removeFromWishlist(1));
    });
});
