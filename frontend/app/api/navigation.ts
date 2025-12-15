export async function getShortestPath(payload: {
  floorId: string;
  startNodeId: string;
  endNodeId: string;
}) {
  const res = await fetch("/api/navigation/shortest-path", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Navigation failed");
  return res.json();
}
