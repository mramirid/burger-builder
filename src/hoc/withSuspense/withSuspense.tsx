import { FC, Suspense } from "react";

/**
 * Wraps the provide component in a `Suspense`, with the provided FallbackComponent.
 * This should be used on components whose parent is not easy to control, such as
 * React Navigation screens to be able to lazy load them using `React.lazy`.
 * @param WrappedComponent The component to wrap.
 * @param FallbackComponent The component to render while loading.
 *
 * @example
 * const SomeScreen = withSuspense(React.lazy(() => import("path/to/some/screen")));
 */
export default function withSuspense<P>(
  WrappedComponent: FC<P>,
  FallbackComponent: FC
) {
  const ComponentWithSuspense: FC<P> = (props) => {
    return (
      <Suspense fallback={<FallbackComponent />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
  return ComponentWithSuspense;
}
