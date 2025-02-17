import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../components/Footer";

describe("Footer Component", () => {
    it("renders company information links", () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );


        expect(screen.getByText("About Us")).toBeInTheDocument();
        expect(screen.getByText("Careers")).toBeInTheDocument();
        expect(screen.getByText("Press")).toBeInTheDocument();
    });

    it("renders customer support links", () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );

        expect(screen.getByText("Contact Us")).toBeInTheDocument();
        expect(screen.getByText("FAQ")).toBeInTheDocument();
        expect(screen.getByText("Returns & Exchanges")).toBeInTheDocument();
    });

    it("renders social media links with correct hrefs", () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );
        // screen.debug();

        expect(screen.getByRole("link", { name: /facebook/i })).toHaveAttribute(
            "href",
            "https://facebook.com"
        );
        expect(screen.getByRole("link", { name: /twitter/i })).toHaveAttribute(
            "href",
            "https://twitter.com"
        );
        expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute(
            "href",
            "https://instagram.com"
        );
    });

    it("renders the correct copyright year", () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );

        const year = new Date().getFullYear();
        expect(
            screen.getByText(`© ${year} Your Company Name. All rights reserved.`)
        ).toBeInTheDocument();
    });
});
