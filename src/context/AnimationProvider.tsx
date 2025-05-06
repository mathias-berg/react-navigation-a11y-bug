import { createContext, ReactNode, useState } from 'react';

export const AnimationContext = createContext({
    shouldAnimate: false,
    setShouldAnimate: (value: boolean) => {},
});

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const [shouldAnimate, setShouldAnimate] = useState(false);

    return (
        <AnimationContext.Provider
            value={{
                shouldAnimate,
                setShouldAnimate,
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};
