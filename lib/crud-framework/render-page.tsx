import NotFound from "@/app/not-found";
import { Container, Flex, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { useActivePath } from "utils/hooks/useActivePath";
import { capitalizeTxt } from "utils/string";
import RenderTable, { RenderTableProps } from "./render-table";
import { CreateButton } from "./components/action-button";
import RenderForm, { RenderFormProps } from "./render-form";
import { ActionQuery } from "./model";


type Props<T extends Record<string, any>> = {
  feat: string;
  params: { slug: string[] };
  table?: Partial<RenderTableProps<T>>;
  form?: Partial<RenderFormProps<T>>;
  queryBuilder?: {
    list?: ActionQuery<T>;
    view?: ActionQuery<T>;
    create?: ActionQuery<T>;
    update?: ActionQuery<T>;
    delete?: ActionQuery<T>;
  };
};

const RenderPage = <T extends Record<string, any>>({
  params,
  table,
  form,
  queryBuilder,
}: Props<T>) => {
  const { activePath: feat } = useActivePath();
  const operation = params.slug ? params.slug[0] : "list";
  const id = params.slug ? params.slug[1] : "";

  const renderComponent = (type: string) => {
    switch (type) {
      case "create":
        return (
          <RenderForm
            configs={form?.configs}
            defaultValues={form?.defaultValues}
            operation="create"
            feat={feat}
            actions={queryBuilder}
          />
        );
      case "update":
        return (
          <RenderForm
            configs={form?.configs}
            operation="update"
            feat={feat}
            actions={queryBuilder}
            id={id}
          />
        );
      case "view":
        return <div>View</div>;
      case "list":
        return table ? (
          <RenderTable
            feat={feat}
            columns={table.columns ?? []}
            queryBuilder={queryBuilder}
            actions={{
              accessorKey: table.actions?.accessorKey,
              handlers: Object.keys(queryBuilder ?? {}) as any,
            }}
          />
        ) : (
          <></>
        );
      default:
        return <NotFound />;
    }
  };
  return (
    <Container fluid className="min-h-screen" p={0}>
      <Flex fz={16} fw={600} justify={'space-between'} className="p-2 items-center">
        {operation !== "list" ? (
          <Flex className="flex items-center gap-2 justify-center">
            <Link href={`/${feat}`}>
              <IconArrowLeft size={20} />
            </Link>
            <Text fw={500}>{capitalizeTxt(operation)}</Text>
            <Text fw={500}>{capitalizeTxt(feat)}</Text>
          </Flex>
        ) : (
          <Text fw={500}>{capitalizeTxt(feat)}</Text>
        )}
        {operation === "list" &&
          Object.keys(queryBuilder ?? {}).includes("create") && (
            <CreateButton path={feat} />
          )}
      </Flex>
      {renderComponent(operation)}
    </Container>
  );
};

export default RenderPage;
