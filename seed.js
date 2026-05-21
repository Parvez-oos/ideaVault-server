const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Idea = require('./models/Idea');

dotenv.config();

// Arrays for generating unique titles and categories
const categories = ["Technology", "Health", "Education", "AI", "FinTech", "Environment", "E-commerce", "SaaS"];
const prefixes = ["Quantum", "Neural", "Cyber", "Eco", "Smart", "Omni", "Aero", "Bio", "Agri", "Fin", "Med", "Edu", "Robo", "Data", "Cloud"];
const roots = ["Tech", "Health", "Learn", "Trade", "Grow", "Mind", "Life", "Space", "Code", "Flow", "Pay", "Care", "Build", "Shift", "Grid"];
const suffixes = ["Sync", "Hub", "Node", "Net", "Platform", "Sphere", "Forge", "Pulse", "Wave", "Link", "Vault", "Path", "Dynamics", "Matrix"];

// Arrays for generating unique founder names
const firstNames = ["Alex", "Sarah", "Jordan", "Priya", "Michael", "Emma", "David", "Jessica", "Daniel", "Lisa", "James", "Nina", "Omar", "Sophia", "Liam"];
const lastNames = ["Founder", "Innovator", "Smith", "Johnson", "Chen", "Williams", "Brown", "Garcia", "Miller", "Davis", "Patel", "Kim", "Lee"];

const generateUniqueIdeas = (amount) => {
    const uniqueTitles = new Set();
    const ideas = [];
    let imageCounter = 1;

    while (uniqueTitles.size < amount) {
        const title = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${roots[Math.floor(Math.random() * roots.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;

        if (!uniqueTitles.has(title)) {
            uniqueTitles.add(title);
            
            const category = categories[Math.floor(Math.random() * categories.length)];
            const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const authorName = `${fName} ${lName}`;
            
            // Random stats to guarantee unique text
            const efficiencyBoost = Math.floor(Math.random() * 80) + 20;
            const costLoss = Math.floor(Math.random() * 500) + 50;
            const timeSaved = Math.floor(Math.random() * 40) + 10;

            // 100% UNIQUE DYNAMIC TEXT GENERATION
            const detailedDescription = `Welcome to ${title}, a groundbreaking initiative tailored specifically for the ${category} market. It seamlessly bridges the gap between end-users and enterprise systems. By utilizing next-generation frameworks, ${title} guarantees a 99.9% uptime while reducing operational overhead by at least ${efficiencyBoost}%. We are currently in the prototyping phase and actively looking for collaborators who are passionate about ${category}.`;
            
            const problemStatement = `The primary challenge in the modern ${category} industry is the lack of integration. Businesses and users relying on traditional tools find themselves restricted by legacy bottlenecks, wasting up to ${timeSaved} hours a week. For ${title} specifically, our goal is to address the $${costLoss} million lost annually worldwide due to these exact inefficiencies.`;
            
            const proposedSolution = `Our solution is to deploy ${title} as a centralized, highly scalable hub. By integrating advanced analytics and automated workflows calibrated for ${category} use-cases, we empower users to eliminate manual data entry entirely. This completely removes the previously mentioned bottlenecks, resulting in a ${efficiencyBoost}% faster turnaround time.`;

            ideas.push({
                title: title,
                shortDescription: `${title} is a breakthrough ${category} platform designed to optimize efficiency by ${efficiencyBoost}%.`,
                detailedDescription: detailedDescription,
                problemStatement: problemStatement,
                proposedSolution: proposedSolution,
                category: category,
                tags: `${category}, Innovation, Startup, ${fName}Tech`,
                imageURL: `https://picsum.photos/seed/IdeaVaultGenAlpha${imageCounter}/800/500`, // Guaranteed unique image
                estimatedBudget: `$${Math.floor(Math.random() * 90) + 10},000`,
                targetAudience: "B2B, Enterprise, Global Consumers",
                authorEmail: `${fName.toLowerCase()}.${lName.toLowerCase()}@ideavault.com`,
                authorName: authorName,
                likes: Math.floor(Math.random() * 999),
                comments: Math.floor(Math.random() * 200),
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
            });
            imageCounter++;
        }
    }
    return ideas;
};

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Wiping old duplicate data...");
        await Idea.deleteMany({}); 
        
        console.log("Generating 340 fully unique ideas...");
        const ideasToInsert = generateUniqueIdeas(340);
        
        await Idea.insertMany(ideasToInsert);
        console.log(`✅ Success! Inserted exactly ${ideasToInsert.length} distinct startup ideas.`);
        
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();