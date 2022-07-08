import BaseBeenoCard from "../../../components/card/baseCard";
import { Era } from "../../../types";

type AllCardsViewProps = {
  era: Era;
};

export default function AllCardsView({ era }: AllCardsViewProps) {
  const cards = era.collections.flatMap((collection) => collection.sets);

  // TODO Sorting Logic
  return (
    <>
      <div className="p-4">
        <div> Header & Sort menu</div>
        <div className="flex flex-wrap gap-2">
          {cards.map((card) => {
            const collection = era.collections.find(
              (c) => c.id === card.collectionId
            )!;
            return (
              <BaseBeenoCard
                set={card}
                set={{ id: collection?.id, title: collection?.title }}
                group={{
                  id: era.group!.id,
                  name: era.group!.name,
                  memberCount: era.group!.members.length,
                }}
                era={{ id: era.id, title: era.title }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
