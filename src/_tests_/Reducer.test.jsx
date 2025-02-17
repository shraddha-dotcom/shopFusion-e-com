import { describe, it, expect } from "vitest";
import reducer, { initialState } from "../redux/reducer";
import * as actions from "../redux/actionTypes";

describe("Redux Reducer Tests", () => {
    it("should return initial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("should add products to state", () => {
        const products = [{ id: 1, name: "Product 1" }];
        const action = { type: actions.GET_ALL_PRODUCTS, payload: products };
        const newState = reducer(initialState, action);

        expect(newState.products).toEqual(products);
    });

    it("should add product to cart", () => {
        const product = { id: 1, name: "Laptop", quantity: 1 };
        const action = { type: actions.ADD_TO_CART, payload: product };
        const newState = reducer(initialState, action);

        expect(newState.cart).toHaveLength(1);
        expect(newState.cart[0]).toEqual({ ...product, quantity: 1 });
    });

    it("should increase quantity if product already in cart", () => {
        const prevState = { ...initialState, cart: [{ id: 1, name: "Laptop", quantity: 1 }] };
        const action = { type: actions.ADD_TO_CART, payload: { id: 1, name: "Laptop" } };
        const newState = reducer(prevState, action);

        expect(newState.cart).toHaveLength(1);
        expect(newState.cart[0].quantity).toBe(2);
    });

    it("should remove a product from cart", () => {
        const prevState = { ...initialState, cart: [{ id: 1, name: "Laptop", quantity: 2 }] };
        const action = { type: actions.REMOVE_FROM_CART, payload: 1 };
        const newState = reducer(prevState, action);

        expect(newState.cart).toHaveLength(1);
        expect(newState.cart[0].quantity).toBe(1);
    });

    it("should remove a product from wishlist", () => {
        const prevState = { ...initialState, wishlist: [{ id: 1, name: "Phone" }] };
        const action = { type: actions.REMOVE_FROM_WISHLIST, payload: 1 };
        const newState = reducer(prevState, action);

        expect(newState.wishlist).toHaveLength(0);
    });

    it("should add user to state", () => {
        const user = { id: 1, name: "John Doe" };
        const action = { type: actions.ADD_USER, payload: user };
        const newState = reducer(initialState, action);

        expect(newState.user).toHaveLength(1);
        expect(newState.user[0]).toEqual(user);
    });
});
