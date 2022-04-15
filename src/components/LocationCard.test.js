import { render, screen } from "@testing-library/react";
import LocationCard from "./LocationCard";

const baseLocation = {
    locationId: "ABBB0C49",
    locationName: "Airbnb - Mountains",
    locationDetails: "Restaurant 1",
    locationType: "Airbnb",
    numberofTasks: 10,
    numberofMyTasks: 10,
    numberofDevices: 0,
    address: {
        addressLine1: "5600 3rd Street",
        city: "San Francisco",
        state: "CA",
        zip: "94124",
    },
    active: true,
    subscriptionActive: true,
    locationUserRole: "Member",
};

test("LocationCard location is Active", () => {
    const location = {
        ...baseLocation,
        active: true,
    };

    render(<LocationCard location={location} />);
    const badgeEls = screen.getAllByText("Active");
    badgeEls.map((badgeEl) => {
        expect(badgeEl).toBeInTheDocument();
    });
});

test("LocationCard location is Inactive", () => {
    const location = {
        ...baseLocation,
        active: false,
    };
    render(<LocationCard location={location} />);
    const badgeEls = screen.getAllByText("Inactive");
    badgeEls.map((badgeEl) => {
        expect(badgeEl).toBeInTheDocument();
    });
});

test("LocationCard subscribed to location", () => {
    const location = {
        ...baseLocation,
        subscriptionActive: true,
    };

    render(<LocationCard location={location} />);
    const subscriptionBadges = screen.getAllByTestId("subscribed-badge");
    subscriptionBadges.map((subscriptionBadge) => {
        expect(subscriptionBadge).toBeInTheDocument();
    });
});
