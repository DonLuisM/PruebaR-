import { useEffect, useState } from "react";
import { FaHeartbeat, FaArrowLeft, FaArrowRight, FaBan } from "react-icons/fa";

import AccordionGallery from "./Carrousel.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function ModalButton() {
  const isMobile = window.innerWidth <= 520;

  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [code, setCode] = useState("");
  const [token, setToken] = useState(sessionStorage.getItem("gallery_token"));
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const authenticate = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
        }),
      });

      if (!response.ok) {
        throw new Error("Código incorrecto");
      }

      const data = await response.json();

      setToken(data.token);
      sessionStorage.setItem("gallery_token", data.token);

      await getGallery(data.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("gallery_token");
    setModal(false);
    setToken(null);
    setGallery([]);
    setCode("");
    setError("");
  };

  const handleImageClick = (image) => {
    const selected = gallery.find((img) => img.url === image.image);

    setSelectedImage(selected);
  };

  const nextImage = () => {
    if (currentIndex < gallery.length - 1) {
      setSelectedImage(gallery[currentIndex + 1]);
    }
  };

  const previousImage = () => {
    if (currentIndex > 0) {
      setSelectedImage(gallery[currentIndex - 1]);
    }
  };

  const currentIndex = selectedImage
    ? gallery.findIndex((img) => img.url === selectedImage.url)
    : -1;

  const getGallery = async (authToken) => {
    const response = await fetch(`${API_URL}/gallery`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo cargar la galería");
    }

    const data = await response.json();

    setGallery(data.images);
  };

  useEffect(() => {
    const savedToken = sessionStorage.getItem("gallery_token");

    if (savedToken) {
      getGallery(savedToken);
    }
  }, []);

  const items = gallery.map((image) => ({
    image: image.url,
    label: image.label,
  }));

  return (
    <>
      <button
        className="relative mb-3 flex h-12 w-20 items-center justify-center overflow-hidden rounded-2xl border border-[rgba(249,197,213,0.5)] cursor-pointer hover:-translate-y-2 transition-transform duration-300 hover:scale-102"
        onClick={() => setModal(true)}
      >
        <FaHeartbeat className="text-[#fabdcf] text-2xl" />
      </button>

      {modal && (
        <div
          className="fixed inset-0 z-50 bg-[rgb(249,197,213)] flex items-center justify-center"
          onClick={() => setModal(false)}
        >
          <div
            className="w-[94%] max-w-325 h-[80vh] bg-[rgba(246,185,204,0.5)] rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {!token ? (
              <>
                <h2 className="mb-4 justify-center items-center text-3xl text-white font-bold italic gap-2">
                  Hasta ahora... ❤️
                </h2>

                <input
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Requieres un código secreto"
                  className="mb-5 w-[40vh] rounded-lg px-5 py-2 items-center justify-center outline-none hover:border focus:border text-center"
                />

                <button
                  onClick={authenticate}
                  disabled={loading}
                  className="rounded-lg bg-gray-700 px-4 py-2 text-white"
                >
                  {loading ? "Verificando..." : "Entrar"}
                </button>

                {error && (
                  <p className="mt-3 text-red-950 font-medium text-lg">
                    {error}
                  </p>
                )}
              </>
            ) : (
              <>
                <div
                  className={`w-full max-h-[calc(90vh-70px)] mb-2 ${isMobile ? "overflow-y-auto" : ""}`}
                >
                  <AccordionGallery
                    items={items}
                    onImageClick={handleImageClick}
                    defaultIndex={0}
                    expandRatio={0.52}
                    trigger="hover"
                    accentColor="#ffffff"
                    overlayColor="#060010"
                    textColor="#ffffff"
                    grayscale
                    showLabels
                    duration={0.6}
                    ease="power3.out"
                    parallax={0.5}
                    tilt={8}
                    stagger={0.06}
                    height={isMobile ? 800 : 600}
                    gap={10}
                    radius={16}
                    orientation="horizontal"
                  />
                </div>

                <button
                  className="mt-3 rounded-lg bg-gray-700 px-8 py-3 text-white"
                  onClick={handleLogout}
                >
                  Cerrar
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {selectedImage && (
        <div
          className="fixed inset-0 z-60 bg-[rgba(19,0,0,0.86)] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.label}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl drop-shadow-[0_2px_6px_rgba(255,255,255,0.35)]"
            />
            <p className="text-white font-semibold text-xl italic mt-3 text-center tracking-wide drop-shadow-lg transition-all duration-300 hover:scale-105">
              {selectedImage.label}
            </p>

            <div className="flex gap-3">
              <button
                onClick={previousImage}
                className={` ${currentIndex === 0 ? "hidden" : "bg-gray-700 mt-3 px-4 py-2 rounded-2xl text-white hover:text-gray-400"}`}
              >
                <FaArrowLeft className="text-xl" />
              </button>
              <button
                onClick={() => setSelectedImage(null)}
                className="bg-gray-700 mt-3 px-4 py-2 rounded-2xl text-white hover:text-gray-400"
              >
                <FaBan className="text-xl" />
              </button>
              <button
                onClick={nextImage}
                className={` ${currentIndex === gallery.length - 1 ? "hidden" : "bg-gray-700 mt-3 px-4 py-2 rounded-2xl text-white hover:text-gray-400"}`}
              >
                <FaArrowRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalButton;
