import { User } from "firebase/auth";
import { useFetch } from "./use-fetch";
import { Routes } from "./routes";
import { plainToInstance } from "class-transformer";
import {
  DependentInputResource,
  DependentListResource,
  DependentResource,
  DependentUpdateResource,
} from "./resources/dependent.resource";
import { useAuthContext } from "../contexts/auth-context";

export const useDependent = () => {
  const { request } = useFetch();
  const { user } = useAuthContext();

  const listAll = async () => {
    if (!user) return;

    const data = {
      id: user.uid,
    };

    const body = plainToInstance(DependentListResource, data);
    const result = await request<DependentResource>({
      url: Routes.LIST_DEPENDENTS,
      method: "POST",
      isArray: true,
      body: JSON.stringify(body),
      responseType: DependentResource,
    });
    return result as DependentResource[];
  };

  const update = async (
    dependent: DependentResource,
    name: string,
    birthday: Date
  ) => {
    if (!user) return;

    const data = {
      name,
      birthday,
      id: dependent.id,
    };

    const body = plainToInstance(DependentUpdateResource, data);
    await request({
      url: Routes.UPDATE_DEPENDENT,
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const remove = async (dependent: DependentResource) => {
    if (!user) return;

    const data = {
      id: dependent.id,
    };

    const body = plainToInstance(DependentListResource, data);
    await request<DependentResource>({
      url: Routes.DELETE_DEPENDENT,
      method: "POST",
      isArray: true,
      body: JSON.stringify(body),
      responseType: DependentResource,
    });
  };

  const create = async (name: string, birthday: Date) => {
    if (!user) return;

    const data = {
      name,
      birthday,
      userId: user.uid,
    };
    const body = plainToInstance(DependentInputResource, data);
    await request({
      url: Routes.INSERT_DEPENDENT,
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  return { listAll, update, remove, create };
};
