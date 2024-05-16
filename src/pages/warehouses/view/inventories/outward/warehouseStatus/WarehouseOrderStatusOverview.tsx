import React from 'react'

type Props = {}

type CardData = {
    id: number;
    title: string;
    details: string;
}

const cardData: CardData[] = [
    { id: 1, title: "Card 1", details: "Details of card 1" },
    { id: 2, title: "Card 2", details: "Details of card 2" },
    { id: 3, title: "Card 3", details: "Details of card 3" },
    { id: 4, title: "Card 4", details: "Details of card 4" }
    // Add more cards as needed
];

const WarehouseOrderStatusOverview = (props: Props) => {
    return (
        <div className="flex flex-wrap h-screen w-screen">
            {cardData.slice(0, 4).map((card) => (
                <div key={card.id} className="w-1/2 h-1/2 p-2">
                    <div className="h-full w-full flex flex-col justify-center items-center bg-white rounded overflow-hidden shadow-lg">
                        <div className="font-bold text-xl mb-2">{card.title}</div>
                        <p className="text-gray-700 text-base">
                            {card.details}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WarehouseOrderStatusOverview