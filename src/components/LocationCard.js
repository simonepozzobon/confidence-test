import React from "react";
import PropTypes from "prop-types";
import {
    BellIcon,
    DesktopComputerIcon,
    LocationMarkerIcon,
    UserIcon,
    UsersIcon,
} from "@heroicons/react/outline";

function LocationCard(props) {
    const { location } = props;

    let badge = (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-red-600 bg-red-50 text-red-600">
            Inactive
        </span>
    );

    if (location.active) {
        badge = (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-600/30 bg-green-50 text-green-600">
                Active
            </span>
        );
    }

    let subscriptionBadge;
    if (location.subscriptionActive) {
        subscriptionBadge = (
            <div className="flex px-4 py-4 shadow-inner rounded-bl-md bg-green-100 items-center justify-center">
                <BellIcon className="w-5 text-green-600" />
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md overflow-hidden rounded-md border border-light-blue flex">
            <div className="flex flex-col items-center bg-white shadow-inner w-16 overflow-hidden">
                <div className="lg:hidden w-full">{subscriptionBadge}</div>
                <div className="flex-grow flex items-center gap-2 px-4 py-2 bg-orange-100 shadow-inner">
                    <UserIcon className="w-4 text-gray-600" />
                    <span className="text-gray-600">
                        {location.numberofMyTasks
                            ? location.numberofMyTasks
                            : 0}
                    </span>
                </div>
                <div className="flex-grow flex items-center gap-2 px-4 py-2 bg-blue-100 shadow-inner">
                    <UsersIcon className="w-4 text-gray-600" />
                    <span className="text-gray-600">
                        {location.numberofTasks ? location.numberofTasks : 0}
                    </span>
                </div>
                <div className="flex-grow flex items-center gap-2 px-4 py-2 bg-purple-100 shadow-inner">
                    <DesktopComputerIcon className="w-4 text-gray-600" />
                    <span className="text-gray-600">
                        {location.numberofDevices
                            ? location.numberofDevices
                            : 0}
                    </span>
                </div>
            </div>
            <div className="flex-grow py-4 border-l border-gray-100 px-4">
                <div className="block lg:hidden">{badge}</div>
                <div className="text-gray-500 font-light text-xs mt-1 lg:mt-0">
                    {location.locationUserRole}
                </div>
                <div className="text-base mt-1">
                    <span className="text-gray-500 font-light">
                        {location.locationType}&nbsp;
                    </span>
                    {location.locationDetails && (
                        <span>/ {location.locationDetails}</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <h2 className="font-extrabold text-2xl text-gray-900 leading-8">
                        {location.locationName}
                    </h2>
                    <div className="hidden lg:block">{badge}</div>
                </div>
                <div className="text-gray-500 mt-1">
                    <LocationMarkerIcon className="w-4 text-gray-400 hidden lg:inline-block mr-1" />
                    <span className="block lg:inline-block">
                        {location.address.addressLine1},&nbsp;
                    </span>
                    <span className="block lg:inline-block">
                        {location.address.addressLine2},&nbsp;
                    </span>
                    <span className="block lg:inline">
                        {location.address.city},&nbsp;
                    </span>
                    <span className="block lg:inline">
                        {location.address.zip}, {location.address.state}
                    </span>
                </div>
            </div>
            <div className="hidden lg:block">{subscriptionBadge}</div>
        </div>
    );
}

LocationCard.propTypes = {
    location: PropTypes.object,
};

export default LocationCard;
