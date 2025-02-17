import { cleanup, render, waitFor, act } from "@testing-library/react";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { afterEach, it, expect, describe } from "vitest";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import reducer from "../redux/reducer";
import Navbar from "../components/Navbar";

// Log errors & warnings
// console.error = console.log;
// console.warn = console.log;

//  Create test store with proper state structure
const createTestStore = (initialState = {}) => {
    const defaultState = {
        products: [],
        wishlist: [],
        cart: [], // Ensure cart exists
        loading: false,
        error: null,
        filteredProducts: [],
        user: []
    };

    const store = createStore(
        reducer,
        { ...defaultState, ...initialState }, // ✅ Ensure full state structure
        applyMiddleware(thunk)
    );

    console.log("Redux Store Initialized with:", store.getState()); // Debug log
    return store;
};

// ✅ Utility function to render with Redux
const renderWithRedux = (component, { initialState } = {}) => {
    const store = createTestStore(initialState);
    return render(
        <Provider store={store}>
            <BrowserRouter>{component}</BrowserRouter>
        </Provider>
    );
};

afterEach(cleanup);

describe("Navbar Component", () => {
    it("should render the Navbar component", () => {
        const { getByTestId } = renderWithRedux(<Navbar />);
        expect(getByTestId("navbar")).toBeInTheDocument();
    });

    it("should render the logo correctly", () => {
        const { getByTestId } = renderWithRedux(<Navbar />);
        expect(getByTestId("logo")).toBeInTheDocument();
    });

    it("should render Wishlist and Cart buttons", async () => {
        const { findByTestId } = renderWithRedux(<Navbar />);
        expect(await findByTestId("wishlist-button")).toBeInTheDocument();
        expect(await findByTestId("cart-button")).toBeInTheDocument();
    });

    it("should display the cart badge with item count", async () => {
        const mockState = {
            cart: [{ id: 1, title: "Item 1", quantity: 3 }]
        };

        const { findByTestId } = renderWithRedux(<Navbar />, {
            initialState: mockState
        });

        // ✅ Ensure Redux updates properly
        await act(async () => {
            const cartBadge = await findByTestId("cart-badge");
            expect(cartBadge).toBeInTheDocument();
        });
    });

    it("should have the Search and Profile buttons", async () => {
        const { findByTestId } = renderWithRedux(<Navbar />);
        expect(await findByTestId("search-button")).toBeInTheDocument();
        expect(await findByTestId("profile-button")).toBeInTheDocument();
    });

    it("should open and close mobile menu", async () => {
        const { getByTestId, queryByTestId } = renderWithRedux(<Navbar />);

        const menuButton = getByTestId("menu-button");
        expect(menuButton).toBeInTheDocument();
        menuButton.click(); // Open menu

        await waitFor(() => {
            expect(getByTestId("navbar-mobile")).toBeInTheDocument();
        });

        const closeButton = getByTestId("close-button");
        closeButton.click();

        await waitFor(() => {
            expect(queryByTestId("navbar-mobile")).not.toBeInTheDocument();
        });
    });
});


























// import { cleanup, render, waitFor } from "@testing-library/react";
// import { legacy_createStore as createStore, applyMiddleware } from "redux";
// import { afterEach, it, expect, describe } from "vitest";
// import { Provider } from "react-redux";
// import { thunk } from "redux-thunk";
// import { BrowserRouter } from "react-router-dom";
// import reducer from "../redux/reducer";
// import Navbar from "../components/Navbar";

// console.error = console.log;
// console.warn = console.log;
// const createTestStore = (initialState = {}) => {
//     console.log("Attempting to create Redux store with state:", initialState); // Log input state

//     const store = createStore(
//         reducer,
//         { ...initialState }, // Ensure it merges correctly
//         applyMiddleware(thunk)
//     );

//     console.log("Redux Store Initialized with:", store.getState()); // Log final state
//     return store;
// };



// const renderWithRedux = (component, { initialState } = {}) => {
//     const store = createTestStore(initialState); // Create store with initial state
//     return render(
//         <Provider store={store}>
//             <BrowserRouter>{component}</BrowserRouter>
//         </Provider>
//     );
// };

// afterEach(cleanup);

// describe("Navbar Component", () => {
//     it("should render the Navbar component", () => {
//         const { getByTestId } = renderWithRedux(<Navbar />);
//         expect(getByTestId("navbar")).toBeInTheDocument();
//     });

//     it("should render the logo correctly", () => {
//         const { getByTestId } = renderWithRedux(<Navbar />);
//         expect(getByTestId("logo")).toBeInTheDocument();
//     });

//     it("should render Wishlist and Cart buttons", async () => {
//         const { findByTestId } = renderWithRedux(<Navbar />);
//         expect(await findByTestId("wishlist-button")).toBeInTheDocument();
//         expect(await findByTestId("cart-button")).toBeInTheDocument();
//     });

//     it("should display the cart badge with item count", async () => {
//         const mockState = {
//             cart: [{ id: 1, title: "Item 1", quantity: 3 }]
//         };

//         const { findByTestId } = renderWithRedux(<Navbar />, {
//             initialState: mockState
//         });

//         await waitFor(() => {
//             expect(findByTestId("cart-badge")).toBeInTheDocument();
//         });
//     });


//     it("should have the Search and Profile buttons", async () => {
//         const { findByTestId } = renderWithRedux(<Navbar />);
//         expect(await findByTestId("search-button")).toBeInTheDocument();
//         expect(await findByTestId("profile-button")).toBeInTheDocument();
//     });

//     it("should open and close mobile menu", async () => {
//         const { getByTestId, queryByTestId } = renderWithRedux(<Navbar />);

//         const menuButton = getByTestId("menu-button");
//         expect(menuButton).toBeInTheDocument();
//         menuButton.click(); // Open menu

//         await waitFor(() => {
//             expect(getByTestId("navbar-mobile")).toBeInTheDocument();
//         });

//         const closeButton = getByTestId("close-button"); // Close button
//         closeButton.click();

//         await waitFor(() => {
//             expect(queryByTestId("navbar-mobile")).not.toBeInTheDocument();
//         });
//     });
// });
