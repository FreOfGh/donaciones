"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function DonationPhoneForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("57");
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!accepted) {
      alert("Debes aceptar la política de privacidad.");
      return;
    }

    console.log({
      name,
      phone,
    });
  };

  return (
    <section className="bg-sky-500 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mx-auto mb-16 max-w-5xl text-center text-3xl font-bold text-white md:text-5xl">
          If you prefer to make your donation by phone, please leave your details and we will call you.
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-md flex-col gap-8"
        >
          {/* Nombre */}

          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              border-0
              border-b
              border-white
              bg-transparent
              pb-3
              text-lg
              text-white
              placeholder:text-white
              focus:border-white
              focus:outline-none
            "
          />

          {/* Teléfono */}

          <PhoneInput
            country="us"
            onlyCountries={["co", "us"]}
            preferredCountries={["co", "us"]}
            disableCountryCode={false}
            value={phone}
            onChange={(value) => setPhone(value)}
            inputStyle={{
              width: "100%",
              background: "transparent",
              color: "#fff",
              border: "none",
              borderBottom: "1px solid white",
              borderRadius: "0",
              height: "48px",
              fontSize: "18px",
              paddingLeft: "58px",
            }}
            buttonStyle={{
              background: "transparent",
              border: "none",
              borderBottom: "1px solid white",
            }}
            dropdownStyle={{
              color: "#000",
            }}
          />

          {/* Checkbox */}

          <label className="flex items-start gap-3 text-white">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 h-5 w-5"
            />
            {/*translate to english*/}
             <span className="text-sm leading-6">
              I have read and accept the{" "}
              <a
                href="/privacy-policy"
                className="font-semibold underline"
              >
                privacy notice and data protection policy.
              </a>
            </span>
          </label>

          {/* Botón */}

          <button
            type="submit"
            className="
              mt-4
              h-16
              rounded
              bg-white
              text-2xl
              font-bold
              text-black
              transition
              duration-300
              hover:scale-[1.02]
              hover:bg-gray-100
            "
          >
            Call me
          </button>
        </form>
      </div>
    </section>
  );
}