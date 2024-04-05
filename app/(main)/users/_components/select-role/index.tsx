import { httpGet } from "@/lib/axios/services";
import { useQuery } from "@tanstack/react-query";
import { roles } from "db/schema";
import React, { useState, useEffect } from "react";
type Role = typeof roles.$inferSelect;

function SelectRole({ onChange }: { onChange: (id: string) => void }) {
  const [selectedValue, setSelectedValue] = useState("");
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["roles"],
    queryFn: () => httpGet<Role[]>("/v1/roles"),
  });
  function handleSelectChange(event: any) {
    const value = event.target.value;
    setSelectedValue(value);
    // Call the onChange callback with the selected value
    onChange(value);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <select value={selectedValue} onChange={handleSelectChange}>
      <option value="">Select...</option>
      {data?.map((item) => (
        <option key={item.id} value={item.id}>
          {item.roleName}
        </option>
      ))}
    </select>
  );
}

export default SelectRole;
