import animalModel from '../models/animal.js'

const resolvers = {
    Query: {
        animals: async (parent, args, context) => { 
            const result = await animalModel.find({});
            return result;
        }
    },
    Mutation: {
        addAnimal: async (parent, {name, age, color}, context) => {
            const result = await animalModel.create({name, age, color});
            return result;
        }
    }
}

export default resolvers