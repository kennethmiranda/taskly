export async function fetchTest() {
  // delay response for testing
  console.log("Fetching test data...");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log("Data fetch completed after 3 seconds.");
}

export async function fetchTasks() {
  // delay response for testing
  console.log("Fetching task data...");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log("Data fetch completed after 3 seconds.");
}
