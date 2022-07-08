import { KeyedMutator } from "swr";
import BaseBeenoCard from "../../../components/card/baseCard";
import NewSetForm from "../../../components/forms/newSet";
import { useAuthContext } from "../../../hooks/auth";
import { Artist, Era, Group } from "../../../types";
import SingleCollection from "./single_collection";

type CollectionViewProps = {
  era: Era;
};
export default function CollectionView({ era }: CollectionViewProps) {
  const { account } = useAuthContext();
  const hasPrivileges = !!(
    account && account.privileges.some((p) => [0, 2].includes(p))
  );

  const group = era.group;
  const collections = era.collections;

  if (!group || !collections) return null;

  return (
    <>
      <div className="flex flex-col gap-6 justify-center  p-4">
        {collections.map((collection: any) => {
          return (
            <div key={collection.id}>
              <SingleCollection
                collection={collection}
                group={group}
                era={{ id: era.id, title: era.title }}
                hasPrivileges={hasPrivileges}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
