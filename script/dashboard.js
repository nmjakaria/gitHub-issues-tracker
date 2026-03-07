const loadIssues = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();
    allIssues = data.data;
    displayIssues(allIssues);
}
let allIssues = [];

const displayIssues = (issues) => {
    const container = document.getElementById('issues-container');
    const totalCount = document.getElementById('total-issues');

    totalCount.innerText = `${issues.length} Issues`;
    container.innerHTML = "";

    issues.forEach(issue => {
        
        let borderColor = 'border-t-gray-300';
        let priorityBg = 'bg-gray-100 text-gray-500';

        if (issue.priority === 'high') {
            borderColor = 'border-t-green-500';
            priorityBg = 'bg-red-50 text-red-500';
        } else if (issue.priority === 'medium') {
            borderColor = 'border-t-yellow-400';
            priorityBg = 'bg-yellow-50 text-yellow-600';
        }

        const card = document.createElement('div');
        card.className = `card bg-white border border-gray-200 border-t-4 shadow-sm p-5 rounded-lg flex flex-col h-full hover:shadow-lg transition-shadow ${borderColor}`;

        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <span class="w-6 h-6 flex items-center justify-center rounded-full border-2 ${issue.status === 'open' ? 'border-green-400' : 'border-purple-400'} overflow-hidden">
                    <img src="${issue.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed-Status .png'}" alt="${issue.status}" class="w-4 h-4 object-contain"/>
                </span>
                <span class="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase ${priorityBg}">
                    ${issue.priority}
                </span>
            </div>

            <div class="flex-grow">
                <h3 class="font-bold text-gray-800 text-sm mb-2 line-clamp-2">${issue.title}</h3>
                <p class="text-xs text-gray-500 line-clamp-2 mb-4">${issue.description || 'No description'}</p>
            </div>

            <div class="flex flex-wrap gap-2 mb-4">
                ${issue.labels.map(label => {
                    let labelColor = 'bg-[#BBF7D0]/50 text-[#00A96E]';
                    if (label.toLowerCase().includes('bug')) labelColor = 'bg-red-50 text-red-400';
                    if (label.toLowerCase().includes('help')) labelColor = 'bg-orange-50 text-orange-400';
                    return `<span class="${labelColor} text-[10px] px-2 py-1 rounded font-bold uppercase">${label}</span>`;
                }).join('')}
            </div>

            <hr class="border-gray-100 mb-3">

            <div class="text-[11px] text-gray-400">
                <p>#${String(issue.id)} by <span class="text-gray-600 font-medium">${issue.author || 'user'}</span></p>
                <p>${new Date(issue.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
        `;
        container.appendChild(card);
    });
};


function filterIssues(status) {
    updateButtonStyles(status);

    if (status === 'all') {
        displayIssues(allIssues);
    } else {
        const filtered = allIssues.filter(issue => issue.status === status);
        displayIssues(filtered);
    }
}

function updateButtonStyles(activeStatus) {
    const buttons = {
        all: document.getElementById('btn-all'),
        open: document.getElementById('btn-open'),
        closed: document.getElementById('btn-closed')
    };

    Object.keys(buttons).forEach(key => {
        if (key === activeStatus) {
            buttons[key].className = "btn bg-[#4f11ff] text-white border-none px-8 rounded-lg font-bold h-11";
        } else {
            buttons[key].className = "btn bg-white text-gray-500 border border-gray-200 px-8 rounded-lg font-medium h-11 shadow-none";
        }
    });
}

loadIssues();