"use client";

import { useEffect, useState } from "react";

export const useDevice = () => {
    const [device, setDevice] = useState("desktop");

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setDevice("mobile");
            } else if (width < 1024) {
                setDevice("tablet");
            } else {
                setDevice("desktop");
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return device;
};
