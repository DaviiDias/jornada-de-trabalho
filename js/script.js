const pageNames = {
    dashboard: 'Dashboard Principal',
    presenca: 'Controle de Presença',
    'historico-presenca': 'Histórico Mensal de Presença',
    justificativas: 'Minhas Justificativas',
    ferias: 'Solicitar Férias',
    'falta-justificada': 'Solicitar Falta Justificada',
    'equipe-gestor': 'Minha Equipe',
    'dashboard-gestor': 'Dashboard do Gestor',
    'dashboard-rh': 'Dashboard RH',
    conformidade: 'Conformidade',
    configuracoes: 'Configurações'
};

document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle (collapse/expand)
    const navToggle = document.querySelector('.nav-toggle');
    const navigation = document.querySelector('.navigation');

    if (navToggle && navigation) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            // Se tem a classe, remove; senão, adiciona
            if (navigation.classList.contains('collapsed')) {
                navigation.classList.remove('collapsed');
            } else {
                navigation.classList.add('collapsed');
            }
        });
    }

    // Navegação entre páginas
    const navLinks = document.querySelectorAll('.nav-link');
    const pageViews = document.querySelectorAll('.page-view');
    const currentPageElement = document.getElementById('currentPage');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetPage = link.getAttribute('data-page');
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            pageViews.forEach(page => page.classList.remove('active'));
            const targetPageElement = document.getElementById(targetPage);
            if (targetPageElement) {
                targetPageElement.classList.add('active');
                if (currentPageElement) {
                    currentPageElement.textContent = pageNames[targetPage] || targetPage;
                }
                
                // Gerar calendário quando entra na página de férias
                if (targetPage === 'ferias') {
                    generateCalendar();
                }
            }
        });
    });

    // Inicializar calendário se já estiver na página de férias
    if (document.getElementById('ferias').classList.contains('active')) {
        generateCalendar();
    }
});

// ===== CALENDÁRIO DE FÉRIAS =====
function generateCalendar() {
    const feriasMesInput = document.getElementById('feriasMes');
    const calendar = document.getElementById('calendar');
    
    if (!feriasMesInput || !calendar) return;

    // Se o input não tem valor, usar mês/ano atual
    if (!feriasMesInput.value) {
        const today = new Date();
        feriasMesInput.value = today.toISOString().slice(0, 7);
    }

    feriasMesInput.addEventListener('change', () => {
        renderCalendar();
    });

    renderCalendar();
}

function renderCalendar() {
    const feriasMesInput = document.getElementById('feriasMes');
    const calendar = document.getElementById('calendar');
    
    if (!feriasMesInput.value) return;

    const [ano, mes] = feriasMesInput.value.split('-');
    const data = new Date(ano, parseInt(mes) - 1, 1);
    
    // Limpar calendário
    calendar.innerHTML = '';

    // Cabeçalho com mês/ano
    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.innerHTML = `${data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;
    calendar.appendChild(header);

    // Nomes dos dias da semana
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    diasSemana.forEach(dia => {
        const dayName = document.createElement('div');
        dayName.className = 'calendar-day-name';
        dayName.textContent = dia;
        calendar.appendChild(dayName);
    });

    // Dias vazios antes do mês começar
    const primeiroDia = new Date(ano, parseInt(mes) - 1, 1).getDay();
    for (let i = 0; i < primeiroDia; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        calendar.appendChild(emptyDay);
    }

    // Dias do mês
    const ultimoDia = new Date(ano, parseInt(mes), 0).getDate();
    for (let dia = 1; dia <= ultimoDia; dia++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = dia;
        dayElement.dataset.day = dia;
        
        dayElement.addEventListener('click', () => {
            selectDateRange(dayElement, ano, mes);
        });
        
        calendar.appendChild(dayElement);
    }
}

function selectDateRange(dayElement, ano, mes) {
    const days = document.querySelectorAll('.calendar-day:not(.disabled)');
    const selectedDays = document.querySelectorAll('.calendar-day.selected');
    
    // Se já tem seleção, limpar e começar nova
    if (selectedDays.length >= 2) {
        days.forEach(d => d.classList.remove('selected'));
    }
    
    // Marcar dia clicado
    dayElement.classList.toggle('selected');
    
    // Atualizar datas
    const selecionados = Array.from(document.querySelectorAll('.calendar-day.selected'))
        .map(el => parseInt(el.dataset.day))
        .sort((a, b) => a - b);
    
    const dataInicial = document.getElementById('dataInicial');
    const dataFinal = document.getElementById('dataFinal');
    
    if (selecionados.length >= 1) {
        const dataIni = new Date(ano, parseInt(mes) - 1, selecionados[0]);
        dataInicial.textContent = dataIni.toLocaleDateString('pt-BR');
    }
    
    if (selecionados.length >= 2) {
        const dataFim = new Date(ano, parseInt(mes) - 1, selecionados[selecionados.length - 1]);
        dataFinal.textContent = dataFim.toLocaleDateString('pt-BR');
    } else {
        dataFinal.textContent = '-';
    }
}

// ===== HISTÓRICO MENSAL DE PRESENÇA =====

// Estrutura de dados para histórico (puxará da API futuramente)
const attendanceData = {
    // Formato: '01': { status: 'success|warning|alert', motivo: 'texto' }
    // Será preenchida dinamicamente pela API
};

function initHistoricoPresenca() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === 'historico-presenca') {
            link.addEventListener('click', () => {
                renderHistoricoCalendar();
            });
        }
    });
}

function renderHistoricoCalendar() {
    const calendar = document.getElementById('calendarHistorico');
    const mesAnoDisplay = document.getElementById('mesAnoDisplay');
    
    if (!calendar) return;

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const mesFormatado = hoje.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    
    mesAnoDisplay.textContent = mesFormatado.charAt(0).toUpperCase() + mesFormatado.slice(1);

    calendar.innerHTML = '';

    // Nomes dos dias da semana
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    diasSemana.forEach(dia => {
        const dayName = document.createElement('div');
        dayName.className = 'calendar-day-name';
        dayName.textContent = dia;
        calendar.appendChild(dayName);
    });

    const primeiroDia = new Date(ano, mes, 1).getDay();
    for (let i = 0; i < primeiroDia; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day-historico empty-day';
        calendar.appendChild(emptyDay);
    }

    // Dias do mês
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    for (let dia = 1; dia <= ultimoDia; dia++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day-historico';
        
        const diaFormatado = String(dia).padStart(2, '0');
        const statusData = attendanceData[diaFormatado] || {};
        
        // Verificar se é fim de semana
        const dataAtual = new Date(ano, mes, dia);
        const diaSemana = dataAtual.getDay();
        const ehFimDeSemana = diaSemana === 0 || diaSemana === 6;
        
        // Adicionar classe de status
        if (ehFimDeSemana) {
            dayElement.classList.add('fim-semana');
            dayElement.style.backgroundColor = '#6c757d';
        } else if (statusData.status === 'success') {
            dayElement.classList.add('success');
            dayElement.style.backgroundColor = '#28a745';
        } else if (statusData.status === 'warning') {
            dayElement.classList.add('warning');
            dayElement.style.backgroundColor = '#ffc107';
        } else if (statusData.status === 'alert') {
            dayElement.classList.add('alert');
            dayElement.style.backgroundColor = '#dc3545';
        } else {
            dayElement.style.backgroundColor = '#ffffff';
            dayElement.style.border = '1px solid var(--neutral-stroke-rest)';
        }
        
        // Texto do dia
        const diaText = document.createElement('span');
        diaText.textContent = dia;
        dayElement.appendChild(diaText);
        
        // Popover ao passar o mouse (se houver motivo)
        if (statusData.motivo && (statusData.status === 'warning' || statusData.status === 'alert')) {
            dayElement.style.cursor = 'pointer';
            dayElement.addEventListener('mouseenter', (e) => {
                showPopover(e, statusData.motivo);
            });
            dayElement.addEventListener('mouseleave', () => {
                hidePopover();
            });
        }
        
        calendar.appendChild(dayElement);
    }
}

function showPopover(event, motivo) {
    let popover = document.getElementById('historicoPopover');
    
    if (!popover) {
        popover = document.createElement('div');
        popover.id = 'historicoPopover';
        popover.className = 'historico-popover';
        document.body.appendChild(popover);
    }
    
    popover.textContent = motivo;
    popover.style.display = 'block';
    
    const rect = event.target.getBoundingClientRect();
    popover.style.top = (rect.top - 45) + 'px';
    popover.style.left = (rect.left + rect.width / 2 - popover.offsetWidth / 2) + 'px';
}

function hidePopover() {
    const popover = document.getElementById('historicoPopover');
    if (popover) {
        popover.style.display = 'none';
    }
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    initHistoricoPresenca();
    renderHistoricoCalendar();
});
