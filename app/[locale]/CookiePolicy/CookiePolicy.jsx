import React from "react";
import styles from "./CookiePolicy.module.css";

const CookiePolicy = () => {
  return (
    <div className={styles.container}>
      <h1>Política de Cookies</h1>

      <section>
        <h2>¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu
          dispositivo cuando visitas nuestro sitio web. Estas cookies permiten
          que el sitio recuerde tus acciones o preferencias durante un período
          de tiempo.
        </p>
      </section>

      <section>
        <h2>¿Qué tipos de cookies utilizamos?</h2>
        <p>
          Actualmente utilizamos cookies de terceros con fines de marketing:
        </p>
        <ul>
          <li>
            <strong>Cookies de marketing (YouTube)</strong>: Estas cookies se
            utilizan para rastrear a los visitantes a través de sitios web. El
            objetivo es mostrar anuncios relevantes y atractivos para el
            usuario.
          </li>
        </ul>
      </section>

      <section>
        <h2>Cookies específicas detectadas</h2>
        <ul>
          <li>
            <strong>YSC</strong> – Utilizada por YouTube para rastrear vistas de
            vídeos incrustados.
          </li>
          <li>
            <strong>__TOKEN_ROLLOUT_SEGURO</strong> – Cookie de autenticación y
            marketing de YouTube.
          </li>
          <li>
            <strong>VISITANTE_INFO1_EN_VIVO</strong> – Estima el ancho de banda
            en páginas con videos incrustados.
          </li>
          <li>
            <strong>COOKIES DE PRUEBA HABILITADAS</strong> – Pruebas internas de
            funcionalidades de cookies de YouTube.
          </li>
        </ul>
        <p>
          Estas cookies envían datos a servidores ubicados en Estados Unidos.
        </p>
      </section>

      <section>
        <h2>Gestión de cookies</h2>
        <p>
          Puedes aceptar o rechazar el uso de cookies de marketing a través del
          banner de consentimiento que aparece al ingresar al sitio. También
          puedes configurar tu navegador para bloquearlas completamente, aunque
          esto podría afectar la experiencia de usuario al interactuar con
          contenido como videos incrustados.
        </p>
      </section>

      <p className={styles.lastUpdated}>
        Última actualización: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default CookiePolicy;
