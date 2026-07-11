import { useState } from "react";
import styles from "./Biblioteca.module.css";

export default function BibliotecaVirtual() {
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeSubfolder, setActiveSubfolder] = useState(null);

  const folders = [
    {
      name: "Biología y Logica",
      path: "biologia y logica",
      resources: [
        {
          title: "Clase Biología y Logica - Parte 1",
          type: "video",
          src: "https://www.youtube.com/watch?v=VHs6OiJ1GsA",
        },
        {
          title: "Clase Biología y Logica - Parte 2",
          type: "video",
          src: "https://www.youtube.com/watch?v=ljXAaMfhtxI",
        },
      ],
    },
    {
      name: "Física",
      path: "fisica",
      subFolders: [
        {
          name: "Movimiento MRU",
          path: "MOVIMIENTO MRU",
          resources: [
            {
              title: "Movimiento parabólico",
              type: "video",
              src: "https://www.youtube.com/watch?v=Pa2WIQ4pJkE",
            },
            {
              title: "Movimiento rectilíneo uniforme",
              type: "video",
              src: "https://www.youtube.com/watch?v=ctcf8wnUnLc",
            },
            {
              title: "Movimiento rectilineo uniforme 2",
              type: "video",
              src: "https://www.youtube.com/watch?v=Y2GwFrltHF0",
            },
            {
              title: "Sistema de ecuaciones",
              type: "video",
              src: "https://www.youtube.com/watch?v=m5r3mv4WLqk",
            },
            {
              title: "Movimiento rectilíneo uniformemente acelerado",
              type: "video",
              src: "https://www.youtube.com/watch?v=gZyMdh6Ow2c",
            },
          ],
        },
        {
          name: "Movimiento circular",
          path: "MOVIMIENTO RU CIRCULAR",
          resources: [
            {
              title: "Movimiento circular uniforme",
              type: "video",
              src: "https://www.youtube.com/watch?v=lU-FJ0U9y94",
            },
            {
              title: "Movimiento rectilineo uniforme",
              type: "video",
              src: "https://www.youtube.com/watch?v=_cCCeAwMmbE",
            },
          ],
        },
      ],
    },
    {
      name: "Primaria Matemáticas",
      path: "primaria_matematicas",
      resources: [
        {
          title: "Simplificacion, números primos",
          type: "video",
          src: "https://www.youtube.com/watch?v=N9DV1bNJeUo",
        },
        {
          title: "Sumas y multiplicación - segundo grado",
          type: "video",
          src: "https://www.youtube.com/watch?v=-Q-Uu3IB1GU",
        },
        {
          title: "Sumas y restas - segundo grado",
          type: "video",
          src: "https://www.youtube.com/watch?v=etPNi-TLRVg",
        },
      ],
    },
    {
      name: "Secundaria Matemáticas",
      path: "secundaria_matematicas",
      resources: [
        {
          title: "Factorización, algebra, notación, conversión y ecuaciones",
          type: "video",
          src: "https://www.youtube.com/watch?v=ywslqrN3TXI",
        },
        {
          title: "Funciones",
          type: "video",
          src: "https://www.youtube.com/watch?v=g-wkFY7t7Nw",
        },
        {
          title: "Potenciación",
          type: "video",
          src: "https://www.youtube.com/watch?v=f5AAaQ0cbiQ",
        },
        {
          title: "Operadores de números enteros",
          type: "video",
          src: "https://www.youtube.com/watch?v=cam0NU25-KA",
        },
        {
          title: "Fracciones - video 1",
          type: "video",
          src: "https://www.youtube.com/watch?v=AnpavT4tImA",
        },
        {
          title: "Fracciones - video 2",
          type: "video",
          src: "https://www.youtube.com/watch?v=7ioAPV7re9k",
        },
        {
          title: "Semejanza de triángulos",
          type: "video",
          src: "https://www.youtube.com/watch?v=2I-u3-P_kNw",
        },
        {
          title: "Solución de sistema de ecuaciones de primer grado",
          type: "video",
          src: "https://www.youtube.com/watch?v=1764qnd4FVs",
        },
      ],
    },
  ];

  const handleClickFolder = (folderName) => {
    setActiveFolder(folderName === activeFolder ? null : folderName);
    setActiveSubfolder(null);
  };

  const handleClickSubfolder = (subfolderName) => {
    setActiveSubfolder(
      subfolderName === activeSubfolder ? null : subfolderName
    );
  };

  const isYouTubeLink = (url) =>
    url.includes("youtube.com") || url.includes("youtu.be");

  const convertToEmbedUrl = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  const renderVideo = (res) => {
    if (res.type !== "video" || !res.src) return null;

    return isYouTubeLink(res.src) ? (
      <div className={styles["video-wrapper"]}>
        <iframe
          src={convertToEmbedUrl(res.src)}
          title={res.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    ) : (
      <video controls className={styles["video-player"]} poster="/fcma.ico">
        <source src={res.src} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
    );
  };

  const currentFolder = folders.find((folder) => folder.name === activeFolder);
  const subFolders = currentFolder?.subFolders;
  const resources = currentFolder?.resources;

  return (
    <div className={styles["biblioteca-container"]}>
      <h2 className={styles["biblioteca-title"]}>Biblioteca Virtual</h2>
      <div className={styles["fondo-biblioteca"]}></div>

      <div className={styles["folders-list"]}>
        {folders.map((folder) => (
          <div
            key={folder.name}
            className={styles["folder-card"]}
            onClick={() => handleClickFolder(folder.name)}
          >
            <span className={styles["folder-icon"]}>📁</span>
            <span className={styles["folder-name"]}>{folder.name}</span>
          </div>
        ))}
      </div>

      {subFolders && (
        <div className={styles["subfolders-list"]}>
          <h3>Subcarpetas de {currentFolder.name}</h3>
          {subFolders.map((sub) => (
            <div
              key={sub.name}
              className={styles["folder-card"]}
              onClick={() => handleClickSubfolder(sub.name)}
            >
              <span className={styles["folder-icon"]}>📁</span>
              <span className={styles["folder-name"]}>{sub.name}</span>
            </div>
          ))}
        </div>
      )}

      {!subFolders && resources && (
        <div className={styles["recursos-container"]} key={activeFolder}>
          <h3>Recursos de {currentFolder.name}</h3>
          {resources.length === 0 ? (
            <p className={styles["no-resources"]}>
              No hay recursos disponibles.
            </p>
          ) : (
            <div className={styles["recurso-grid"]}>
              {resources.map((res, index) => (
                <div key={index} className={styles["recurso"]}>
                  <h4>{res.title}</h4>
                  {renderVideo(res)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSubfolder && (
        <div className={styles["recursos-container"]} key={activeSubfolder}>
          <h3>Recursos de {activeSubfolder}</h3>
          <div className={styles["recurso-grid"]}>
            {subFolders
              .find((sub) => sub.name === activeSubfolder)
              .resources.map((res, index) => (
                <div key={index} className={styles["recurso"]}>
                  <h4>{res.title}</h4>
                  {renderVideo(res)}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
