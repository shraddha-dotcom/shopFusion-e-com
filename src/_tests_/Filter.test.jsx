import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import FilterProducts from "../pages/Products/FilterProducts";
import { legacy_createStore as createStore } from "redux"; // Correct store creation
import rootReducer from "../redux/reducer"; // Import your root reducer

// ✅ Function to create a new store for each test
const createTestStore = () => createStore(rootReducer);

const mockProducts = [
    { id: 1, name: "Shirt 1", category: "men-shirts", price: 50, rating: 4.5 },
    { id: 2, name: "Shirt 2", category: "men-shirts", price: 30, rating: 4.0 },
    { id: 3, name: "Jeans", category: "men-jeans", price: 70, rating: 4.2 },
    { id: 4, name: "Jacket", category: "men-jackets", price: 100, rating: 4.8 } // ✅ Ensure this exists!
];



// ✅ Modified render function to create a store instance per test
const renderWithProvider = (ui) => {
    const store = createTestStore(); // ✅ Fresh store for each test
    return render(
        <Provider store={store}>
            <BrowserRouter>{ui}</BrowserRouter>
        </Provider>
    );
};

describe("FilterProducts Component", () => {
    test("renders filter button and opens filter sidebar", () => {
        renderWithProvider(<FilterProducts allProducts={mockProducts} />);
        expect(screen.getByTestId("apply-filter-btn")).toBeInTheDocument();
    });

    test("filters products by category (men-shirts)", async () => {
        renderWithProvider(<FilterProducts allProducts={mockProducts} />); // ✅ Pass mock data

        // ✅ Open filter sidebar
        fireEvent.click(screen.getByTestId("apply-filter-btn"));

        // ✅ Ensure category filter exists and click it
        const categoryCheckbox = await screen.findByTestId("category-checkbox-men-shirts");
        fireEvent.click(categoryCheckbox);

        // ✅ Wait for the filtered product list to appear
        const filteredProductList = await screen.findByTestId("filtered-product-list");
        expect(filteredProductList).toBeInTheDocument();

        // ✅ Ensure filtered products exist
        const productItems = screen.getAllByTestId("product-item");
        expect(productItems.length).toBeGreaterThan(0); // Check if products are shown
    });


    test("sorts products by price (ascending)", () => {
        renderWithProvider(<FilterProducts allProducts={mockProducts} />);

        fireEvent.click(screen.getByTestId("apply-filter-btn"));
        fireEvent.click(screen.getByTestId("sort-price-asc"));

        const productPrices = screen
            .getAllByTestId("product-price")
            .map((el) => parseFloat(el.textContent.replace("$", ""))); // ✅ Ensure numbers

        console.log("🔍 Extracted Prices:", productPrices); // ✅ Debugging step

        expect(productPrices).toEqual([30, 50, 70, 100]); // ✅ Expected array
    });


    test("sorts products by rating", async () => {
        renderWithProvider(<FilterProducts allProducts={mockProducts} />);

        // 🛠 Debugging Step: Log the entire screen output
        screen.debug();

        fireEvent.click(screen.getByTestId("apply-filter-btn"));

        // 🔴 If this line fails, the button is missing in your component
        const sortByRatingButton = screen.getByTestId("sort-by-rating");
        fireEvent.click(sortByRatingButton);

        const filteredProductList = await screen.findByTestId("filtered-product-list");
        expect(filteredProductList).toBeInTheDocument();

        const productRatings = screen
            .getAllByTestId("product-rating")
            .map((el) => parseFloat(el.textContent.match(/\d+\.\d+/)[0]));

        expect(productRatings).toEqual([...productRatings].sort((a, b) => b - a));
    });

    test("clears all filters", () => {
        renderWithProvider(<FilterProducts allProducts={mockProducts} />);
        fireEvent.click(screen.getByTestId("apply-filter-btn"));
        fireEvent.click(screen.getByTestId("clear-filters"));

        const filteredProducts = screen.getAllByTestId("product-item").length; // ✅ Get actual count
        expect(filteredProducts).toBe(mockProducts.length); // ✅ Match the mock data
    });





})    
