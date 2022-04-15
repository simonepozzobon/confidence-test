import React from "react";
import { cleanup } from "@testing-library/react";
import App from "./App";
import response from "./Response";
import { act, renderHook } from "@testing-library/react-hooks";
import useFetchLocations from "./hooks/useFetchLocations";
import renderer from "react-test-renderer";
import LoadingMessage from "./components/LoadingMessage";
import ErrorMessage from "./components/ErrorMessage";

jest.mock("./hooks/useFetchLocations");

afterEach(cleanup);

test("Render locations", () => {
    const res = {
        error: false,
        loading: false,
        hasMore: false,
        locations: response.locations,
    };
    useFetchLocations.mockReturnValue(res);

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    const tree = renderer.create(<App />).toJSON();
    // screen.debug();
    expect(tree).toMatchSnapshot();
});

test("Render loading", () => {
    const res = {
        error: false,
        loading: true,
        hasMore: true,
        locations: response.locations,
    };
    useFetchLocations.mockReturnValue(res);

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    const test = renderer.create(<App />);
    const testInstance = test.root;

    expect(testInstance.findByType(LoadingMessage)).toBeTruthy();
});

test("Render error", () => {
    const res = {
        error: true,
        loading: false,
        hasMore: false,
        locations: response.locations,
    };
    useFetchLocations.mockReturnValue(res);

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    const tree = renderer.create(<App />);
    const treeInstance = tree.root;

    expect(treeInstance.findByType(ErrorMessage)).toBeTruthy();
});

test("Rendered all the locations available", () => {
    const res = {
        error: false,
        loading: false,
        hasMore: false,
        locations: response.locations,
    };
    useFetchLocations.mockReturnValue(res);

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    const tree = renderer.create(<App />);
    const treeInstance = tree.root;

    const statusMessages = treeInstance.findByProps({
        className: "status-messages",
    });

    expect(statusMessages.children.length).toBe(0);
});
