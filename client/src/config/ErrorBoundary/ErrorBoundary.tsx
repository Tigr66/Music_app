import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode } from "react";
import { ErrorFallback } from "@/components";

interface AppErrorBoundaryProps {
    children: ReactNode;
}

export const AppErrorBoundary = ({ children }: AppErrorBoundaryProps) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ErrorBoundary>
    );
};
