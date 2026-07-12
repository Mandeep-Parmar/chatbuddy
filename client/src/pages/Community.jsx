import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { MdOutlineFileDownload } from "react-icons/md";

const Community = () => {
  const { axios, token } = useAppContext();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get("/api/community/images", {
        headers: { token },
      });

      if (data.success) {
        setImages(data.images);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <Loading />;

  const downloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `chatbuddy-image-${Date.now()}.png`;

      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download image.");
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto p-6 pt-12 xl:px-12 2xl:px-20">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        Community Images
      </h2>

      {images.length > 0 ? (
        <div className="flex flex-wrap max-sm:justify-center gap-5">
          {images.map((img, index) => (
            <a
              key={index}
              href={img.imageUrl}
              target="_blank"
              className="relative group block rounded-lg overflow-hidden border border-gray-200 dark:border-purple-700 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={img.imageUrl}
                alt="image"
                className="w-full h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />

              <button
                onClick={() => downloadImage(img.imageUrl)}
                className="absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-violet-600 hover:border-violet-500 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer"
                title="Download Image"
              >
                <MdOutlineFileDownload size={16} />
              </button>

              <p className="absolute bottom-0 right-0 text-xs bg-black/50 backdrop-blur-2xl text-white px-4 py-1 rounded-tl-xl">
                Created by {img.userName}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-purple-200 mt-10">
          No Images Available.
        </p>
      )}
    </div>
  );
};

export default Community;
