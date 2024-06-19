"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { getRandomChuckNorrisJokeGateway } from "@/gateways/chuck-norris-joke/get-random-chuck-norris-joke.gateway";

export const HeroSection = () => {
  const [joke, setJoke] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    try {
      setLoading(true);
      const joke = await getRandomChuckNorrisJokeGateway();
      setJoke(joke.value);
    } catch (error) {
      console.error("Error fetching Chuck Norris joke:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-7 place-self-center text-center sm:text-left">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Hello, I'm{" "}
            </span>
            <br />
            <div style={{ height: "120px" }}>
              {" "}
              {/* Altura fija del contenedor */}
              <TypeAnimation
                sequence={[
                  "Bernardo",
                  1000,
                  "a software engineer 💻",
                  1000,
                  "a constant learner 📚",
                  1000,
                  "a cooking enthusiast 🍳",
                  1000,
                  "a dog lover 🐶",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            Here you will be able to know a little more about me, see links of
            interest and some small implementation that I have created.
          </p>
          <div>
            {/* Modificamos el botón */}
            <button
              onClick={fetchJoke}
              className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500  hover:bg-slate-200 text-white"
            >
              {loading ? "Loading..." : "Tell me a joke"}
            </button>
            <button className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500  hover:bg-slate-800 text-white border mt-3">
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                <a href="/pdf/bernardo-cv.pdf" download="bernardo-cv">
                  Download CV
                </a>
              </span>
            </button>
          </div>
        </div>
        <div className="col-span-5 place-self-center mt-4 lg:mt-0">
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px]  lg:h-[400px] relative">
            <Image
              src="/images/software-engineer-working.png"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
              priority
            />
          </div>
        </div>
      </div>

      {/* Mostramos el chiste si está disponible */}
      {joke && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <p className="text-lg">{joke}</p>
            <button
              onClick={() => setJoke(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
