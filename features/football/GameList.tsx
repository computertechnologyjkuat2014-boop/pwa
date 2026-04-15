// features/football/GameList.tsx
import { Game } from "@/types/football";
import GameItem from "./GameItem";

interface GameListProps {
  games: Game[];
  onUpdateGame: (id: string, updates: Partial<Game>) => void;
}

export default function GameList({ games, onUpdateGame }: GameListProps) {
  if (games.length === 0) {
    return (
      <p className="text-gray-500">No games scheduled for this matchday.</p>
    );
  }

  return (
    // <ul className="space-y-2">
    //   {games.map((game) => (
    //     <GameItem key={game.id} game={game} onUpdate={onUpdateGame} />
    //   ))}
    // </ul>
    <div className="">
      {games.map((game) => (
        <GameItem key={game.id} game={game} onUpdate={onUpdateGame} />
      ))}
    </div>
  );
}
