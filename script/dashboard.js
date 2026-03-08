const loadIssues = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();
    allIssues = data.data;
    displayIssues(allIssues);
}
let allIssues = [];

const loadIssueDetails = async (id) => {
    const modal = document.getElementById('issueDetailsModal');
    const modalContainer = document.getElementById('issueDetailsModalContainer');

    modalContainer.innerHTML = `<div class="p-20 flex justify-center"><span class="loading loading-spinner loading-lg text-primary"></span></div>`;
    modal.showModal();

    try {
        const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data && data.data) {
            displayIssueDetails(data.data);
        } else {
            throw new Error("Data not found");
        }
    } catch (error) {
        console.error(error);
        modalContainer.innerHTML = `<div class="p-10 text-center text-red-500">Error: Data could not be loaded!</div>`;
    }
}

const displayIssues = (issues) => {
    const container = document.getElementById('issues-container');
    const totalCount = document.getElementById('total-issues');

    totalCount.innerText = `${issues.length} Issues`;
    container.innerHTML = "";

    issues.forEach(issue => {

        let borderColor = 'border-t-gray-300';
        let priorityBg = 'bg-gray-100 text-gray-500';

        if (issue.status === 'open') {
            borderColor = 'border-t-green-500';
        } else if (issue.status === 'closed') {
            borderColor = 'border-t-purple-500';
        }

        const priority = issue.priority.toLowerCase();

        if (priority === 'high') {
            priorityBg = 'bg-red-50 text-red-500';
        } else if (priority === 'medium') {
            priorityBg = 'bg-yellow-50 text-yellow-600';
        } else if (priority === 'low') {
            priorityBg = 'bg-gray-100 text-gray-500';
        }

        const card = document.createElement('div');
        card.setAttribute('onclick', `loadIssueDetails(${issue.id})`);
        card.style.cursor = 'pointer';
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


const displayIssueDetails = (issue) => {
    const modalContainer = document.getElementById('issueDetailsModalContainer');

    modalContainer.innerHTML = `
        <div class="p-4 sm:p-8 md:p-10">
            <h2 class="text-xl md:text-2xl font-bold text-[#1a202c] mb-4 tracking-tight">${issue.title}</h2>
            
            <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <span class="px-4 py-1.5 rounded-full text-white text-sm font-bold shadow-sm ${issue.status === 'open' ? 'bg-[#00A96E]' : 'bg-purple-600'}">
                    ${issue.status === 'open' ? 'Opened' : 'Closed'}
                </span>
                <div class="flex items-center text-gray-500 text-sm md:text-base">
                    <span class="mx-2 text-xl text-gray-600">•</span>
                    <span>Opened by <span class="font-semibold text-gray-800">${issue.author || 'Fahim Ahmed'}</span></span>
                    <span class="mx-2 text-xl text-gray-600">•</span>
                    <span>${new Date(issue.createdAt).toLocaleDateString('en-GB')}</span>
                </div>
            </div>

            <div class="flex flex-wrap gap-3 mb-10">
                ${issue.labels.map(label => {

        let labelColor = 'bg-[#BBF7D0]/50 text-[#00A96E]';
        if (label.toLowerCase().includes('bug')) labelColor = 'bg-red-50 text-red-400';
        if (label.toLowerCase().includes('help')) labelColor = 'bg-orange-50 text-orange-400';
        return `<span class="${labelColor} text-[10px] px-2 py-1 rounded font-bold uppercase">${label}</span>`;
    }).join('')}
            </div>

            <div class="prose max-w-none mb-8">
                <p class="text-gray-600 text-lg leading-relaxed">${issue.description || 'No detailed description available.'}</p>
            </div>

            <div class="bg-[#f8fafc] p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-4">
                <div>
                    <p class="text-gray-400 font-semibold text-sm uppercase tracking-widest">Assignee:</p>
                    <p class="text-xl font-black text-gray-800">${issue.author || 'Unassigned'}</p>
                </div>
                <div class="sm:text-right">
                    <p class="text-gray-400 font-semibold text-sm uppercase tracking-widest">Priority:</p>
                    <span class="inline-block bg-[#f85252] text-white px-8 py-2 rounded-xl font-black text-sm uppercase shadow-lg shadow-red-100">${issue.priority}</span>
                </div>
            </div>

            <div class="flex justify-end pt-2">
                <form method="dialog" class="w-full sm:w-auto">
                    <button class="btn w-full sm:w-auto bg-[#4f11ff] hover:bg-[#3f0edb] text-white px-10 rounded-xl border-none font-bold text-sm sm:text-md h-12 transition-all hover:shadow-indigo-200 hover:shadow-lg active:scale-95">Close</button>
                </form>
            </div>
        </div>
    `;
}

function filterIssues(status) {
    const container = document.getElementById('issues-container');
    updateButtonStyles(status);
    container.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-24 gap-4">
            <span class="loading loading-spinner loading-lg text-[#4f11ff]"></span>
            <p class="text-gray-500 text-sm animate-pulse">
                Loading data, please wait...
            </p>
        </div>
    `;

    setTimeout(() => {
        if (status === 'all') {
            displayIssues(allIssues);
        } else {
            const filtered = allIssues.filter(issue => issue.status === status);
            displayIssues(filtered);
        }
    }, 300);
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


const searchInput = document.querySelectorAll('.search-field');
let searchTimeout;

searchInput.forEach(input => {
    input.addEventListener('input', (event) => {
        const searchText = event.target.value.toLowerCase();
        const container = document.getElementById('issues-container');
        clearTimeout(searchTimeout);
        container.innerHTML = `<div class="col-span-full flex justify-center py-20"><span class="loading loading-spinner loading-lg text-[#4f11ff]"></span></div>`;

    setTimeout(() => {
        const filteredIssues = allIssues.filter(issue => {
        const title = issue.title.toLowerCase();
        const description = (issue.description || "").toLowerCase();
        const labels = issue.labels.map(label => label.toLowerCase()).join(' ');

        return title.includes(searchText) || description.includes(searchText) || labels.includes(searchText);
    });

    displayIssues(filteredIssues);
    }, 300);
});
});


loadIssues();