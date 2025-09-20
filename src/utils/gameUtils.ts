export function generateRandomOrder(): number[] {
  return Array(4)
    .fill(0)
    .map((_, i) => i)
    .sort(() => Math.random() - 0.5);
}

export function generateRandomQuestionPosition(): number {
  return Math.floor(Math.random() * 250);
}

export function generateOptionsWithCorrectAnswer(correctAnswer: number, totalLength: number): number[] {
  const size = 4;
  const allValues = Array.from({ length: totalLength }, (_, i) => i);
  const possibleValues = allValues.filter((val) => val !== correctAnswer);
  const incorrectOptions: number[] = [];

  while (incorrectOptions.length < size - 1) {
    const randomIndex = Math.floor(Math.random() * possibleValues.length);
    const randomValue = possibleValues[randomIndex];
    if (!incorrectOptions.includes(randomValue)) {
      incorrectOptions.push(randomValue);
    }
  }

  const randomPosition = Math.floor(Math.random() * size);
  incorrectOptions.splice(randomPosition, 0, correctAnswer);

  return incorrectOptions;
}

export function formatArea(area: number): string {
  return `${Number(area).toLocaleString("pt")} Km²`;
}

export function formatPopulation(population: number): string {
  return Number(population).toLocaleString("pt");
}

export function numberRandom(): number {
  return Math.floor(Math.random() * 10);
}