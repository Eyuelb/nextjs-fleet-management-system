import { useMutation } from "@tanstack/react-query";
import React from "react";
import { httpDelete, httpPost, httpPut } from "../../../axios/services";
import getQueryClient from "../../queryClient";
import { LoadingOverlay } from "@mantine/core";

type QueryType = "Get" | "Post" | "Put" | "Delete";

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// This is the first reusable type utility we built
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// This is a new type utitlity with ref!
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// This is the type for the "ref" only
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

/**
 * This is the updated component props using PolymorphicComponentPropWithRef
 */
type ComponentProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      queryType: QueryType;
      url: string;
      body?: any;
      queryKey?: string;
    }
  >;

/**
 * This is the type used in the type annotation for the component
 */
type ComponentType = <C extends React.ElementType = "button">(
  props: ComponentProps<C>
) => React.ReactNode | null;

const QueryButton: ComponentType = React.forwardRef(
  <C extends React.ElementType = "button">(
    {
      as,
      children,
      queryType,
      queryKey,
      url,
      body,
      ...props
    }: ComponentProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const { mutate, isPending } = useMutation({
      mutationFn: (data: any) => {
        // Choose the appropriate HTTP method function based on the queryType
        switch (queryType) {
          case "Post":
            return httpPost(url, data); // Replace '' with the appropriate endpoint
          case "Put":
            return httpPut(url, data); // Replace '' with the appropriate endpoint
          case "Delete":
            return httpDelete(url); // Replace '' with the appropriate endpoint
          default:
            throw new Error(`Invalid queryType: ${queryType}`);
        }
      },
      onSuccess: () => {
        const queryClient = getQueryClient;
        queryKey && queryClient.invalidateQueries(queryKey as any);
      },
      onError: (error: any) =>
        alert({
          withBorder: true,
          type: "error",
          message: error.message ? error.message : "Error Updating Data",
        }),
    });
    const Component = as || "button";

    return (
      <Component {...props} onClick={() => mutate(body)} ref={ref}>
        <React.Fragment>
          <LoadingOverlay visible={isPending} />
          {children}
        </React.Fragment>
      </Component>
    );
  }
);
//@ts-ignore
QueryButton.displayName = "queryButton";
export default QueryButton;
