import { User } from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDependent } from "../hooks/use-dependents";
import { DependentResource } from "../hooks/resources/dependent.resource";

interface DependentContextProps {
  dependents: DependentResource[] | undefined;
  selectedDependent: DependentResource | undefined;
  listLoading: boolean;
  handleCreate: (name: string, birthday: Date) => Promise<void>;
  handleDelete: () => Promise<void>;
  handleUpdate: (name: string, birthday: Date) => Promise<void>;
  handleSelectedDependent: (dependent: DependentResource) => void;
}
interface DependentContextProviderProps {
  children: JSX.Element;
}

export const DependentContext = createContext<DependentContextProps>(
  {} as DependentContextProps
);

export const useDependentContext = () => useContext(DependentContext);

export const DependentContextProvider = ({
  children,
}: DependentContextProviderProps) => {
  const { create, listAll: _listAll, remove, update } = useDependent();
  const [transactionalLoading, setTransactionalLoading] =
    useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(true);
  const [dependents, setDependents] = useState<DependentResource[]>();
  const [selectedDependent, setSelectedDependent] =
    useState<DependentResource>();

  const handleCreate = async (name: string, birthday: Date) => {
    setTransactionalLoading(true);
    await create(name, birthday).catch((err) => setTransactionalLoading(false));
    setTransactionalLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedDependent) return;
    setTransactionalLoading(true);

    await remove(selectedDependent)
      .catch((err) => setTransactionalLoading(false))
      .finally(() => {
        setDependents(
          dependents?.filter(
            (dependent) => selectedDependent.id === dependent.id
          )
        );
        setTransactionalLoading(false);
      });
  };

  const handleUpdate = async (name: string, birthday: Date) => {
    if (!selectedDependent) return;
    setTransactionalLoading(true);

    await update(selectedDependent, name, birthday).catch((err) =>
      setTransactionalLoading(false)
    );
    setTransactionalLoading(false);
  };

  const handleSelectedDependent = (dependent: DependentResource) => {
    setSelectedDependent(dependent);
  };

  useEffect(() => {
    if (transactionalLoading) return;
    setListLoading(true);
    _listAll()
      .then((dependents) => {
        console.log(dependents);
        setDependents(dependents);
        setListLoading(false);
      })
      .catch((err) => setListLoading(false));
  }, [transactionalLoading]);

  useEffect(() => {
    if (transactionalLoading) return;
    setListLoading(true);
    _listAll()
      .then((dependents) => {
        setDependents(dependents);
        setListLoading(false);
      })
      .catch((err) => setListLoading(false));
  }, []);

  return (
    <DependentContext.Provider
      value={{
        listLoading,
        dependents,
        selectedDependent,
        handleDelete,
        handleUpdate,
        handleSelectedDependent,
        handleCreate,
      }}
    >
      {children}
    </DependentContext.Provider>
  );
};
