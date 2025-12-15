export async function fetchPath(hospitalId, startNodeId, endNodeId) {
  const res = await fetch(
    "https://YOUR_DOMAIN/api/navigation/shortest-path",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hospitalId,
        startNodeId,
        endNodeId,
      }),
    }
  );

  if (!res.ok) throw new Error("Failed to fetch path");
  return res.json();
}
