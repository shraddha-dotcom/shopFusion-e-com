import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as actions from '../redux/action';
import * as actionTypes from '../redux/actionTypes';

// Mock fetch globally
global.fetch = vi.fn();

describe('Redux Actions', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        fetch.mockClear(); // Reset mock calls before each test
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should fetch men products and dispatch GET_MEN_PRODUCTS', async () => {
        const dispatch = vi.fn();

        // Debugging log to see if action executes
        console.log("Running getMenProducts test...");

        // Mock fetch responses in sequence
        fetch
            .mockResolvedValueOnce(Promise.resolve({ json: () => Promise.resolve({ products: [{ id: 1, name: 'Shirt' }] }) }))
            .mockResolvedValueOnce(Promise.resolve({ json: () => Promise.resolve({ products: [{ id: 2, name: 'Shoes' }] }) }))
            .mockResolvedValueOnce(Promise.resolve({ json: () => Promise.resolve({ products: [{ id: 3, name: 'Watch' }] }) }));

        await actions.getMenProducts()(dispatch);

        console.log("Dispatch Calls:", dispatch.mock.calls); // Debug if dispatch is being called

        expect(fetch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: actionTypes.GET_MEN_PRODUCTS,
            payload: [
                { id: 1, name: 'Shirt' },
                { id: 2, name: 'Shoes' },
                { id: 3, name: 'Watch' },
            ],
        });
    });

    it('should fetch women products and dispatch GET_WOMEN_PRODUCTS', async () => {
        const dispatch = vi.fn();

        console.log("Running getWomenProducts test...");

        fetch
            .mockResolvedValueOnce(Promise.resolve({ json: () => Promise.resolve({ products: [{ id: 4, name: 'Dress' }] }) }))
            .mockResolvedValueOnce(Promise.resolve({ json: () => Promise.resolve({ products: [{ id: 5, name: 'Bag' }] }) }));

        await actions.getWomenProducts()(dispatch);

        console.log("Dispatch Calls:", dispatch.mock.calls); // Debug if dispatch is being called

        expect(fetch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: actionTypes.GET_WOMEN_PRODUCTS,
            payload: [
                { id: 4, name: 'Dress' },
                { id: 5, name: 'Bag' },
            ],
        });
    });

    it('should add a product to cart', () => {
        const product = { id: 1, name: 'Shirt' };
        expect(actions.addToCart(product)).toEqual({
            type: actionTypes.ADD_TO_CART,
            payload: product,
        });
    });

    it('should remove a product from cart', () => {
        expect(actions.removeFromCart(1)).toEqual({
            type: actionTypes.REMOVE_FROM_CART,
            payload: 1,
        });
    });

    it('should update product quantity', () => {
        expect(actions.updateQuantity(1, 3)).toEqual({
            type: actionTypes.UPDATE_QUANTITY,
            payload: { productId: 1, quantity: 3 },
        });
    });

    it('should add a user', () => {
        const user = { id: 1, name: 'John Doe' };
        expect(actions.addUser(user)).toEqual({
            type: actionTypes.ADD_USER,
            payload: user,
        });
    });
});
