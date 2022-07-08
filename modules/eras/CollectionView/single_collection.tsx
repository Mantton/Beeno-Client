import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import BaseBeenoCard from "../../../components/card/baseCard";
import NewSetForm from "../../../components/forms/newSet";
import { Artist, Collection, Group } from "../../../types";

type SingleCollectionProps = {
  collection: Collection;
  group: Group;
  hasPrivileges: boolean;
  era: { id: number; title: string };
};

export default function SingleCollection({
  collection,
  group,
  hasPrivileges,
  era,
}: SingleCollectionProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <p className="font-bold text-2xl">
          Collection #{collection.id} - {collection.title}
        </p>
        {hasPrivileges && (
          <div>
            <div className=" flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setShowModal(true);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md bg-opacity-80 hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <FaPlus></FaPlus>
              </button>
            </div>
            <NewSetForm
              collectionId={collection.id}
              isOpen={showModal}
              setIsOpen={setShowModal}
              members={group.members}
            />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {collection.sets.map((set: any) => {
          return (
            <BaseBeenoCard
              set={set}
              era={{ id: era.id, title: era.title }}
              group={group}
              set={{
                id: collection.id,
                title: collection.title,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
