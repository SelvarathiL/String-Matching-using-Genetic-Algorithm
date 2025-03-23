import random 
POPULATION_SIZE = 100
GENE = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890, ./;:!@$%=&{["]}'
TARGET = str(input("Enter target string : "))

class Individual(object):
    def __init__(self,chromosome) :
        self.chromosome = chromosome
        self.fitness = self.cal_fitness()

    @classmethod
    def mutated(self):
        global GENE
        gene = random.choice(GENE)
        return gene

    @classmethod
    def create_chromosome(self):
        global TARGET
        chromosome_len = len(TARGET)
        return [self.mutated() for i in range(chromosome_len)]
    
    def mate(self,parent2):
        children = []
        for g1,g2 in zip(self.chromosome,parent2.chromosome):
            prob = random.random()
            if prob<0.40:
                children.append(g1)
            elif prob<0.90:
                children.append(g2)
            else:
                children.append(self.mutated())
        return Individual(children)



    def cal_fitness(self):
        global TARGET
        fitness = 0

        for ge,gt in zip(TARGET,self.chromosome):
            if ge!=gt:
                fitness+=1
        return fitness


def main():
    global POPULATION_SIZE
    generation = 1
    population = []
    found = False

    for i in range(POPULATION_SIZE):
        chromosome = Individual.create_chromosome()
        population.append(Individual(chromosome))

    while not found:
        population = sorted(population,key=lambda x:x.fitness)

        if population[0].fitness<=0:
            found = True
            break

        new_generation = []

        s = int((10*POPULATION_SIZE)/100)
        new_generation.extend(population[:s])

        s = int((90*POPULATION_SIZE)/100)
        for i in range(s):
            parent1 = random.choice(population[:50])
            parent2 = random.choice(population[:50])
            children = parent1.mate(parent2)
            new_generation.append(children)
        
        population = new_generation

        print(f"Generation : {generation}\tString : {''.join(population[0].chromosome)}\tFitness : {population[0].fitness}")
        generation+=1

    print(f"Generation : {generation}\tString : {''.join(population[0].chromosome)}\tFitness : {population[0].fitness}")



if __name__=='__main__':
    main()