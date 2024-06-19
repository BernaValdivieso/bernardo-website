export const getRandomChuckNorrisJokeGateway = async (): Promise<{
  value: string;
}> => {
  const result = await fetch("/jokes/random", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return result.json();
};
