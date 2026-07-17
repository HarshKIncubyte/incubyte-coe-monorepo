# Red-Green-Refactor Cycle

## Key Notes

* **Red:** Start by writing a single test for the next behaviour. The test should fail because the feature doesn't exist yet.
* **Green:** Write only the minimum code required to make the failing test pass. Avoid adding extra functionality.
* **Refactor:** Improve the code by removing duplication, improving naming, or simplifying the design without changing the behaviour. All tests should continue to pass.
* Before writing tests, maintain a **Test List** of all the behaviours and edge cases to implement. Pick only one item at a time.
* Write **one test at a time**. Don't write multiple failing tests before making the current one pass.
* Choose the **smallest possible behaviour** for the next test. Small steps make the design evolve naturally and provide faster feedback.
* Run the tests frequently. Each Red → Green → Refactor cycle should be small and quick.
* Refactor only when all tests are passing to ensure behaviour remains unchanged.
