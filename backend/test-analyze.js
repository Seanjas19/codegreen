require('dotenv').config();
const axios = require('axios');

const API_URL = 'http://localhost:5000';

// Sample test code
const testCode = `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 0; i < 100; i++) {
  console.log(fibonacci(i));
}
`;

async function testAnalyzeEndpoint() {
  try {
    console.log('Testing /api/analyze endpoint...');
    console.log('============================================\n');

    // First test: Try without token (should fail)
    console.log('Test 1: Without authentication token');
    try {
      const response = await axios.post(`${API_URL}/api/analyze`, {
        code: testCode,
        language: 'javascript',
      });
      console.log('✅ Unexpected: Request succeeded without token');
    } catch (error) {
      console.log('❌ Expected error:', error.response?.data?.error || error.message);
      console.log('Status:', error.response?.status);
    }

    console.log('\n============================================\n');
    console.log('Test 2: Checking backend health...');
    try {
      const health = await axios.get(`${API_URL}/api/health`);
      console.log('✅ Backend is running:', health.data);
    } catch (error) {
      console.log('❌ Backend not responding:', error.message);
      return;
    }

    console.log('\n============================================\n');
    console.log('Test 3: Direct Gemini API test...');
    const { optimizeCodeWithGemini } = require('./utils/geminiOptimizer');
    
    try {
      console.log('Calling optimizeCodeWithGemini directly...');
      const result = await optimizeCodeWithGemini(testCode, 'javascript');
      console.log('✅ Gemini API works!');
      console.log('Result:', {
        optimizedCode: result.optimizedCode.substring(0, 100) + '...',
        improvements: result.improvements,
        estimatedReduction: result.estimatedReduction,
      });
    } catch (error) {
      console.log('❌ Gemini API error:');
      console.log('Message:', error.message);
      console.log('Full error:', error);
    }

  } catch (error) {
    console.error('Test error:', error.message);
  }
}

testAnalyzeEndpoint();
