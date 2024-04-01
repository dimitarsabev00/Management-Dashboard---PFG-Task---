import React, { useEffect, useState } from "react";
import { Album, User } from "../Types";
import { Star } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
interface AlbumCardProps {
  album: Album;
  isFavorite: boolean;
  setFavoriteAlbums: React.Dispatch<React.SetStateAction<number[]>>;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  album,
  isFavorite,
  setFavoriteAlbums,
}) => {
  const [userData, setUserData] = useState<User>();
  const { users } = useAppContext();
  useEffect(() => {
    const data = users.find((user) => user.id === album.userId);
    setUserData(data);
  }, []);

  const favoriteAlbum = () => {
    setFavoriteAlbums((prev) => [...prev, album.id]);
  };
  const unFavoriteAlbum = () => {
    setFavoriteAlbums((prev) => prev.filter((el) => el !== album.id));
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md h-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{album.title}</h2>
        {isFavorite ? (
          <Star fill="yellow" onClick={unFavoriteAlbum} />
        ) : (
          <Star color="black" onClick={favoriteAlbum} />
        )}
      </div>
      <p className="text-gray-600">Author username: {userData?.username}</p>
    </div>
  );
};

export default AlbumCard;
