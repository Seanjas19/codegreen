const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const OPTIMIZATION_PROMPT = `You are an expert code optimizer focused on reducing carbon footprint by improving energy efficiency.

Analyze the provided code for:
1. Redundant loops and nested iterations (causes excessive CPU cycles)
2. Inefficient memory allocation and unused variables
3. Blocking I/O operations (should use async/await)
4. Database query optimization (N+1 problems, missing indexes)
5. Unnecessary computations and dead code
6. Algorithm efficiency (Big O complexity)

Provide your response in this exact format:

OPTIMIZED_CODE:
\`\`\`
[optimized code here]
\`\`\`

IMPROVEMENTS:
1. [specific improvement 1]
2. [specific improvement 2]
3. [specific improvement 3]

ESTIMATED_CARBON_REDUCTION: [X]%

EXPLANATION:
[Brief explanation of changes and their impact]`;

async function optimizeCodeWithGemini(userCode, language = 'javascript') {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    
    console.log('Attempting to call Gemini API with model: gemini-2.5-flash');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `${OPTIMIZATION_PROMPT}

Code Language: ${language}

Code to optimize:
\`\`\`${language}
${userCode}
\`\`\``;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini API response received successfully');

    // Parse the response
    const optimizedCode = extractSection(text, 'OPTIMIZED_CODE');
    const improvements = extractImprovements(text);
    const estimatedReduction = extractReduction(text);

    return {
      optimizedCode,
      improvements,
      estimatedReduction,
      rawResponse: text,
    };
  } catch (error) {
    console.error('Gemini API error:', error.message);
    console.error('Error details:', error);
    
    // Provide helpful error message
    if (error.message.includes('404') || error.message.includes('not found')) {
      throw new Error('Gemini API model not accessible. Please verify your API key has access to Generative AI API.');
    }
    if (error.message.includes('authentication') || error.message.includes('unauthorized')) {
      throw new Error('Gemini API authentication failed. Please check your API key.');
    }
    if (error.message.includes('quota')) {
      throw new Error('Gemini API quota exceeded. Please check your billing.');
    }
    
    throw new Error(`Code optimization failed: ${error.message}`);
  }
}

function extractSection(text, sectionName) {
  const regex = new RegExp(`${sectionName}:\\s*\`\`\`[\\s\\S]*?\\n([\\s\\S]*?)\\n\`\`\``, 'm');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}

function extractImprovements(text) {
  const improvements = [];
  const improvementsSection = text.match(/IMPROVEMENTS:\n([\s\S]*?)(?=\n\nESTIMATED|$)/);
  
  if (improvementsSection) {
    const lines = improvementsSection[1].split('\n');
    lines.forEach((line) => {
      const match = line.match(/^\d+\.\s*(.+)$/);
      if (match) {
        improvements.push(match[1].trim());
      }
    });
  }

  return improvements.length > 0 ? improvements : ['Code optimized for carbon efficiency'];
}

function extractReduction(text) {
  const match = text.match(/ESTIMATED_CARBON_REDUCTION:\s*(\d+)%/i);
  return match ? parseInt(match[1], 10) : 10;
}

function calculateEnergyScore(estimatedReduction, improvementsCount) {
  // Score = (reduction percentage / 10) + (# improvements / 2), capped at 10
  const baseScore = (estimatedReduction / 10) + (improvementsCount * 0.5);
  return Math.min(Math.round(baseScore * 10) / 10, 10);
}

module.exports = {
  optimizeCodeWithGemini,
  calculateEnergyScore,
};
