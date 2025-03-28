// TEST FILE - REPLACE YOUR ENTIRE script.js WITH THIS TEMPORARILY
document.addEventListener('DOMContentLoaded', () => {
    const testDiv = document.createElement('div');
    testDiv.id = 'server-indicator';
    testDiv.innerHTML = `
        <div><strong>TEST SERVER:</strong> Web01</div>
        <div>Last Servers: Web01 → Web02</div>
    `;
    testDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: red;
        color: white;
        padding: 20px;
        z-index: 999999;
        font-size: 24px;
        border: 3px solid yellow;
    `;
    document.body.appendChild(testDiv);
    console.log('TEST DIV CREATED - SHOULD SEE RED BOX');
});