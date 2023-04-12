import { useLocation } from "react-router-dom";
import ErrorBoundary from "error/ErrorBoundary";
import { useEffect, useState } from "react";

//This component is required to set the hasError state of the boundary to false on routing, so that we can navigate to login page
function ErrorBodyFunctional({children, fallback}) {
    const [hasError, setHasError] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (hasError) {
        setHasError(false);
        }
    }, [location.key]);
    return (
        <ErrorBoundary
        hasError={hasError}
        setHasError={setHasError}
        fallback={fallback}
        >
            {children}
        </ErrorBoundary>
    );
}

export default ErrorBodyFunctional;