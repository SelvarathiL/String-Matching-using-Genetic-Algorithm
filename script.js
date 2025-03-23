const POPULATION_SIZE = 100;
const GENE = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890, ./;:!@$%=&{["]}';

class Individual {
    constructor(chromosome) {
        this.chromosome = chromosome;
        this.fitness = this.calculateFitness();
    }

    static mutatedGene() {
        return GENE.charAt(Math.floor(Math.random() * GENE.length));
    }

    
    static createChromosome(targetLength) {
        const chromosome = [];
        for (let i = 0; i < targetLength; i++) {
            chromosome.push(this.mutatedGene());
        }
        return chromosome;
    }

        
    mate(partner) {
        const childChromosome = [];
        for (let i = 0; i < this.chromosome.length; i++) {
            const probability = Math.random();
            if (probability < 0.40) {
                childChromosome.push(this.chromosome[i]);
            } 
            else if (probability < 0.90) {
                childChromosome.push(partner.chromosome[i]);
            } 
            else {
                childChromosome.push(Individual.mutatedGene());
            }
        }
        return new Individual(childChromosome);
    }

        
    calculateFitness() {
        let fitness = 0;
        for (let i = 0; i < this.chromosome.length; i++) {
            if (this.chromosome[i] !== targetString[i]) {
                fitness++;
            }
        }
        return fitness;
    }
}

let targetString = "";
let generation = 1;
let population = [];
let found = false;

function startAlgorithm() {
    targetString = document.getElementById('target-input').value.trim();
    if (!targetString) {
        alert("Please enter a valid target string!");
        return;
    }

    const outputBox = document.getElementById('output-box');
    outputBox.innerHTML = ""; 
    generation = 1;
    found = false;
    population = [];
    for (let i = 0; i < POPULATION_SIZE; i++) {
        const chromosome = Individual.createChromosome(targetString.length);
        population.push(new Individual(chromosome));
    }

    const interval = setInterval(() => {
        population.sort((a, b) => a.fitness - b.fitness);

        if (population[0].fitness === 0) {
            found = true;
        }

        const bestIndividual = population[0];
        const outputLine = document.createElement('div');
        outputLine.innerText = `Generation : ${generation}     String : ${bestIndividual.chromosome.join('')}     Fitness : ${bestIndividual.fitness}`;
        outputBox.appendChild(outputLine);

        outputBox.scrollTop = outputBox.scrollHeight;

        if (found) {
            clearInterval(interval);
            outputBox.appendChild(document.createElement('hr'));
            outputBox.appendChild(document.createTextNode(`Target found in Generation ${generation}!`));
            return;
        }

        const newGeneration = [];

        const eliteSize = Math.floor(POPULATION_SIZE * 0.10);
        newGeneration.push(...population.slice(0, eliteSize));

        const matingPool = population.slice(0, Math.floor(POPULATION_SIZE / 2));
        const remainingSize = POPULATION_SIZE - eliteSize;
        for (let i = 0; i < remainingSize; i++) {
            const parent1 = matingPool[Math.floor(Math.random() * matingPool.length)];
            const parent2 = matingPool[Math.floor(Math.random() * matingPool.length)];
            const child = parent1.mate(parent2);
            newGeneration.push(child);
        }

        population = newGeneration;
        generation++;
    }, 100); 
}