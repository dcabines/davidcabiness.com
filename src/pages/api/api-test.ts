export async function GET({ params, request }) {
  return new Response(
    JSON.stringify({
      name: "David Cabiness",
      url: "google.com",
    }),
  );
}
