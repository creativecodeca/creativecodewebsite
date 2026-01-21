import fs from 'fs';

const treeFile = fs.readFileSync('data/diagnosticTree.ts', 'utf8');
const explanationFile = fs.readFileSync('data/nodeExplanations.ts', 'utf8');

const idRegex = /id:\s*'([^']+)'/g;
const treeIds = new Set();
let match;
while ((match = idRegex.exec(treeFile)) !== null) {
  treeIds.add(match[1]);
}

const explanationRegex = /'([^']+)':\s*\{/g;
const explanationIds = new Set();
while ((match = explanationRegex.exec(explanationFile)) !== null) {
  explanationIds.add(match[1]);
}

const missingIds = [...treeIds].filter(id => !explanationIds.has(id));

console.log(`Total Tree IDs: ${treeIds.size}`);
console.log(`Total Explanation IDs: ${explanationIds.size}`);
console.log(`Missing IDs (${missingIds.length}):`);
console.log(JSON.stringify(missingIds, null, 2));

