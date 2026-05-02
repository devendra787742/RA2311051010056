const { getDepots, getVehicles } = require("./api");
const knapsack = require("./scheduler");

//  PUT YOUR REAL TOKEN HERE
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaW5naGRldmVuZHJhODMxNThAZ21haWwuY29tIiwiZXhwIjoxNzc3NzA2MDE3LCJpYXQiOjE3Nzc3MDUxMTcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkM2MxMzIwNC0yZWYzLTQ0NWUtODZhZC04ZDgwYjk5NDI0YzYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJkZXZlbmRyYSBzaW5naCIsInN1YiI6IjRkOTg4MGQwLTk2NWYtNDI1Ny1hNzFmLWJhYWZiZTY0ZGI0NSJ9LCJlbWFpbCI6InNpbmdoZGV2ZW5kcmE4MzE1OEBnbWFpbC5jb20iLCJuYW1lIjoiZGV2ZW5kcmEgc2luZ2giLCJyb2xsTm8iOiJyYTIzMTEwNTEwMTAwNTZhIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiNGQ5ODgwZDAtOTY1Zi00MjU3LWE3MWYtYmFhZmJlNjRkYjQ1IiwiY2xpZW50U2VjcmV0IjoidGVoemVNVXJyV1NWUVZLQSJ9.EVXNS4XNEpJXNZqcfRSUyltjl3f0wc23BZTx1e1yhts";

(async () => {
  try {
    console.log("📡 Fetching depots...");
    const depotsData = await getDepots(TOKEN);
    console.log("Depots Response:", depotsData);

    console.log("📡 Fetching vehicles...");
    const vehiclesData = await getVehicles(TOKEN);
    console.log("Vehicles Response:", vehiclesData);

    //  Handle different API formats safely
    const depots = depotsData.depots || depotsData.data || depotsData;
    const vehicles = vehiclesData.vehicles || vehiclesData.data || vehiclesData;

    if (!depots || depots.length === 0) {
      throw new Error("No depots data received");
    }

    const capacity = depots[0].MechanicHours;

    const result = knapsack(capacity, vehicles);

    console.log("\n Max Impact:", result.maxImpact);
    console.log("\n Selected Vehicles:");

    result.selectedVehicles.forEach(v => {
      console.log(
        `TaskID: ${v.TaskID}, Duration: ${v.Duration}, Impact: ${v.Impact}`
      );
    });

  } catch (err) {
    console.error(" Error:", err.message);
  }
})();