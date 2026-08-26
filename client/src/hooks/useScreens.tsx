import { Grid } from "antd";

const { useBreakpoint } = Grid;

export const useScreen = () => {
    const screens = useBreakpoint();

    return {
        screens,
        isMobile: !screens.md,
        isTablet: screens.md && !screens.lg,
        isDesktop: !!screens.lg,
    };
};
