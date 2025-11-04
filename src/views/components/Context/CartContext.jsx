import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext();

function load() {
    try {
        const raw = localStorage.getItem("sf_cart_v1");
        return raw ? JSON.parse(raw) : { items: [] };
    } catch {
        return { items: [] };
    }
}

function save(state) {
    try { localStorage.setItem("sf_cart_v1", JSON.stringify(state)); } catch { /* ignore */ }
}

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD": {
            const item = action.payload; // {id, name, price, imageUrl}
            const idx = state.items.findIndex((x) => x.id === item.id);
            const items = [...state.items];
            if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + 1 };
            else items.push({ ...item, qty: 1 });
            return { items };
        }
        case "INC": {
            const items = state.items.map((x) => (x.id === action.id ? { ...x, qty: x.qty + 1 } : x));
            return { items };
        }
        case "DEC": {
            const items = state.items
                .map((x) => (x.id === action.id ? { ...x, qty: x.qty - 1 } : x))
                .filter((x) => x.qty > 0);
            return { items };
        }
        case "REMOVE": {
            const items = state.items.filter((x) => x.id !== action.id);
            return { items };
        }
        case "CLEAR":
            return { items: [] };
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, undefined, load);

    useEffect(() => save(state), [state]);

    const value = useMemo(() => {
        const totalCount = state.items.reduce((s, x) => s + x.qty, 0);
        const subtotal = state.items.reduce((s, x) => s + x.qty * Number(x.price || 0), 0);
        return {
            items: state.items,
            totalCount,
            subtotal,
            addItem: (item) => dispatch({ type: "ADD", payload: item }),
            inc: (id) => dispatch({ type: "INC", id }),
            dec: (id) => dispatch({ type: "DEC", id }),
            remove: (id) => dispatch({ type: "REMOVE", id }),
            clear: () => dispatch({ type: "CLEAR" }),
        };
    }, [state]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
