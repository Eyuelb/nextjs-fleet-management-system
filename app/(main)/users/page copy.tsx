"use client";
import { httpDelete, httpGet, httpPost, httpPut } from "@/lib/axios/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserTable from "./_components/table";
import { user } from "db/schema";
import SelectRole from "./_components/select-role";
type User = typeof user.$inferSelect;

const UserCreationForm: React.FC = () => {
  const [users, setUsers] = useState<any>([]);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => httpGet<User>("/auth/users"),
  });
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
    return () => {};
  }, [data]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: User) => httpPost(`/auth/users`, data),
    onSuccess: () => {
      reset(); // Clear form fields after successful creation
      refetch();
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please check the console for details.");
    },
  });
  const { mutate: updateUser } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: typeof user.$inferSelect;
    }) => httpPut(`/auth/users?id=${id}`, data),
    onSuccess: () => {
      reset(); // Clear form fields after successful creation
      refetch();
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please check the console for details.");
    },
  });
  const { mutate: deleteUser } = useMutation({
    mutationFn: (id: string) => httpDelete(`/auth/users/${id}`),
    onSuccess: () => {
      reset(); // Clear form fields after successful creation
      refetch();
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please check the console for details.");
    },
  });

  // Function to handle updating a user
  const handleUpdateUser = (
    id: string,
    updatedUser: typeof user.$inferSelect
  ) => {
    updateUser({ id, data: { ...updatedUser, id } });
  };

  // Function to handle deleting a user
  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };
  const onSubmit = (data: User) => {
    mutate(data);
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isPending && <div>Loading...</div>}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
          />
          <SelectRole
            onChange={(id) =>
              register("roleID", {
                value: id,
              })
            }
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <button type="submit">Create User</button>
      </form>
      <UserTable
        users={users}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default UserCreationForm;
